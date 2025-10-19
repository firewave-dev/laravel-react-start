<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PrayerRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PrayerRequestController extends Controller
{
    /**
     * Display a listing of prayer requests (public view)
     */
    public function index(Request $request)
    {
        $category = $request->get('category');
        $status = $request->get('status', 'active');
        
        $query = PrayerRequest::query();
        
        // Filter by visibility - only show public and anonymous requests
        $query->where(function($q) {
            $q->where('visibility', 'public')
              ->orWhere('visibility', 'anonymous');
        });
        
        // Filter by status
        if ($status === 'active') {
            $query->active();
        } elseif ($status === 'answered') {
            $query->answered();
        }
        
        // Filter by category
        if ($category && $category !== 'all') {
            $query->byCategory($category);
        }
        
        $prayerRequests = $query->orderBy('is_urgent', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        // Transform the data for frontend
        $prayerRequests->getCollection()->transform(function ($request) {
            return [
                'id' => $request->id,
                'title' => $request->title,
                'request' => $request->getPrayerRequestText(),
                'display_name' => $request->display_name,
                'category' => $request->category,
                'category_label' => $request->category_label,
                'status' => $request->status,
                'status_label' => $request->status_label,
                'prayer_count' => $request->prayer_count,
                'is_urgent' => $request->is_urgent,
                'is_anonymous' => $request->is_anonymous,
                'created_at' => $request->formatted_created_at,
                'answered_at' => $request->formatted_answered_at,
                'answer_notes' => $request->answer_notes,
            ];
        });

        return Inertia::render('front/PrayerRequests', [
            'prayerRequests' => $prayerRequests,
            'currentCategory' => $category,
            'currentStatus' => $status,
        ]);
    }

    /**
     * Show the form for creating a new prayer request
     */
    public function create()
    {
        return Inertia::render('front/PrayerRequestCreate');
    }

    /**
     * Store a newly created prayer request
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'request' => 'required|string|max:2000',
            'requester_name' => 'nullable|string|max:255',
            'requester_email' => 'nullable|email|max:255',
            'visibility' => 'required|in:public,private,anonymous',
            'category' => 'required|in:health,family,spiritual,work,travel,other',
            'is_urgent' => 'boolean',
            'is_anonymous' => 'boolean',
        ]);

        $data = $request->all();
        
        // If user is logged in, associate with user account
        if (Auth::check()) {
            $data['user_id'] = Auth::id();
        }

        PrayerRequest::create($data);

        return redirect()->route('prayer-requests.index')
            ->with('success', 'Prayer request submitted successfully. Thank you for sharing your request with our community.');
    }

    /**
     * Display the specified prayer request
     */
    public function show(PrayerRequest $prayerRequest)
    {
        // Check if user can view this request
        if (!$prayerRequest->isVisibleToUser(Auth::user())) {
            abort(403, 'You are not authorized to view this prayer request.');
        }

        return Inertia::render('front/PrayerRequestShow', [
            'prayerRequest' => [
                'id' => $prayerRequest->id,
                'title' => $prayerRequest->title,
                'request' => $prayerRequest->getPrayerRequestText(),
                'display_name' => $prayerRequest->display_name,
                'category' => $prayerRequest->category,
                'category_label' => $prayerRequest->category_label,
                'status' => $prayerRequest->status,
                'status_label' => $prayerRequest->status_label,
                'prayer_count' => $prayerRequest->prayer_count,
                'is_urgent' => $prayerRequest->is_urgent,
                'is_anonymous' => $prayerRequest->is_anonymous,
                'created_at' => $prayerRequest->formatted_created_at,
                'answered_at' => $prayerRequest->formatted_answered_at,
                'answer_notes' => $prayerRequest->answer_notes,
            ]
        ]);
    }

    /**
     * Increment prayer count for a request
     */
    public function pray(PrayerRequest $prayerRequest)
    {
        if (!$prayerRequest->canBePrayedFor()) {
            return response()->json(['error' => 'This prayer request cannot be prayed for.'], 403);
        }

        $prayerRequest->incrementPrayerCount();

        return response()->json([
            'success' => true,
            'prayer_count' => $prayerRequest->fresh()->prayer_count
        ]);
    }

    // Admin methods
    /**
     * Display admin listing of prayer requests
     */
    public function adminIndex(Request $request)
    {
        $category = $request->get('category');
        $status = $request->get('status');
        $visibility = $request->get('visibility');
        
        $query = PrayerRequest::with('user');
        
        // Apply filters
        if ($status) {
            $query->where('status', $status);
        }
        
        if ($visibility) {
            $query->where('visibility', $visibility);
        }
        
        if ($category) {
            $query->byCategory($category);
        }
        
        $prayerRequests = $query->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('admin/PrayerRequests/Index', [
            'prayerRequests' => $prayerRequests,
            'filters' => [
                'category' => $category,
                'status' => $status,
                'visibility' => $visibility,
            ]
        ]);
    }

    /**
     * Show admin form for editing prayer request
     */
    public function adminEdit(PrayerRequest $prayerRequest)
    {
        return Inertia::render('admin/PrayerRequests/Edit', [
            'prayerRequest' => $prayerRequest
        ]);
    }

    /**
     * Update prayer request (admin)
     */
    public function adminUpdate(Request $request, PrayerRequest $prayerRequest)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'request' => 'required|string|max:2000',
            'requester_name' => 'nullable|string|max:255',
            'requester_email' => 'nullable|email|max:255',
            'visibility' => 'required|in:public,private,anonymous',
            'category' => 'required|in:health,family,spiritual,work,travel,other',
            'status' => 'required|in:active,answered,archived',
            'is_urgent' => 'boolean',
            'is_anonymous' => 'boolean',
            'answer_notes' => 'nullable|string|max:1000',
        ]);

        $data = $request->all();
        
        // If marking as answered, set answered_at
        if ($data['status'] === 'answered' && $prayerRequest->status !== 'answered') {
            $data['answered_at'] = now();
        }

        $prayerRequest->update($data);

        return redirect()->route('admin.prayer-requests.index')
            ->with('success', 'Prayer request updated successfully.');
    }

    /**
     * Delete prayer request (admin)
     */
    public function adminDestroy(PrayerRequest $prayerRequest)
    {
        $prayerRequest->delete();

        return redirect()->route('admin.prayer-requests.index')
            ->with('success', 'Prayer request deleted successfully.');
    }
}
