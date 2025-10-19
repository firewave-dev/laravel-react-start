<?php

namespace App\Http\Controllers;

use App\Models\Bulletin;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class BulletinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Bulletin::with('poster');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Filter by priority
        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $bulletins = $query->orderBy('is_pinned', 'desc')
                           ->orderBy('priority', 'asc')
                           ->latest()
                           ->paginate(15);

        return Inertia::render('bulletins/Index', [
            'bulletins' => $bulletins,
            'filters' => $request->only(['search', 'status', 'type', 'priority']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('bulletins/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'priority' => ['required', 'in:high,normal,low'],
            'type' => ['required', 'in:announcement,prayer_request,event_notice,urgent,general'],
            'expires_at' => ['nullable', 'date', 'after:now'],
            'is_pinned' => ['boolean'],
            'status' => ['required', 'in:active,expired,archived'],
            // Translation fields
            'translations' => ['nullable', 'array'],
            'translations.*' => ['array'],
            'translations.*.title' => ['nullable', 'string', 'max:255'],
            'translations.*.message' => ['nullable', 'string'],
        ]);

        $validated['posted_by'] = auth()->id();

        $bulletin = Bulletin::create($validated);

        // Save translations
        if (!empty($validated['translations'])) {
            $this->saveTranslations($bulletin, $validated['translations']);
        }

        // Send email notifications if bulletin is active
        if ($validated['status'] === 'active') {
            NotificationService::sendBulletinNotification($bulletin);
        }

        return redirect()->route('bulletins.index')
            ->with('success', 'Bulletin posted successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Bulletin $bulletin)
    {
        $bulletin->load('poster');

        return Inertia::render('bulletins/Show', [
            'bulletin' => $bulletin,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bulletin $bulletin)
    {
        return Inertia::render('bulletins/Edit', [
            'bulletin' => $bulletin->load('translations'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bulletin $bulletin)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'priority' => ['required', 'in:high,normal,low'],
            'type' => ['required', 'in:announcement,prayer_request,event_notice,urgent,general'],
            'expires_at' => ['nullable', 'date'],
            'is_pinned' => ['boolean'],
            'status' => ['required', 'in:active,expired,archived'],
        ]);

        // Check if this is a new publish (was inactive, now active)
        $wasActivating = $bulletin->status !== 'active' && $validated['status'] === 'active';
        
        $bulletin->update($validated);

        // Save translations
        if (!empty($validated['translations'])) {
            $this->saveTranslations($bulletin, $validated['translations']);
        }

        // Send email notifications if newly activated
        if ($wasActivating) {
            NotificationService::sendBulletinNotification($bulletin);
        }

        return redirect()->route('bulletins.index')
            ->with('success', 'Bulletin updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bulletin $bulletin)
    {
        $bulletin->delete();

        return redirect()->route('bulletins.index')
            ->with('success', 'Bulletin deleted successfully.');
    }


    /**
     * Save translations for a bulletin.
     */
    protected function saveTranslations(Bulletin $bulletin, array $translations)
    {
        foreach ($translations as $locale => $data) {
            // Skip if no title provided (translation not wanted)
            if (empty($data['title'])) {
                // Delete existing translation if exists
                $bulletin->translations()->where('locale', $locale)->delete();
                continue;
            }

            // Update or create translation
            $bulletin->translations()->updateOrCreate(
                ['locale' => $locale],
                [
                    'title' => $data['title'],
                    'message' => $data['message'] ?? '',
                ]
            );
        }
    }
}
