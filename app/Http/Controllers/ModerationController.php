<?php

namespace App\Http\Controllers;

use App\Models\ContentModeration;
use App\Models\Post;
use App\Models\Event;
use App\Models\Bulletin;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ModerationController extends Controller
{
    use AuthorizesRequests, ValidatesRequests;
    public function __construct()
    {
        // Middleware is applied at route level
    }

    /**
     * Display moderation queue
     */
    public function index(Request $request)
    {
        $status = $request->get('status', 'pending');
        $type = $request->get('type', 'all');
        $search = $request->get('search', '');

        $query = ContentModeration::with(['moderatable', 'submitter', 'moderator']);

        // Filter by status
        if ($status !== 'all') {
            $query->where('status', $status);
        }

        // Filter by content type
        if ($type !== 'all') {
            $query->where('moderatable_type', $type);
        }

        // Search functionality
        if (!empty($search)) {
            $query->whereHas('moderatable', function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%");
            });
        }

        $moderations = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Moderation/Index', [
            'moderations' => $moderations,
            'filters' => [
                'status' => $status,
                'type' => $type,
                'search' => $search
            ],
            'stats' => [
                'pending' => ContentModeration::pending()->count(),
                'approved' => ContentModeration::approved()->count(),
                'rejected' => ContentModeration::rejected()->count(),
                'needs_revision' => ContentModeration::needingRevision()->count(),
            ]
        ]);
    }

    /**
     * Show moderation details
     */
    public function show(ContentModeration $moderation)
    {
        $moderation->load(['moderatable', 'submitter', 'moderator']);

        return Inertia::render('Moderation/Show', [
            'moderation' => $moderation
        ]);
    }

    /**
     * Submit content for moderation
     */
    public function submit(Request $request)
    {
        $request->validate([
            'content_type' => 'required|in:post,event,bulletin',
            'content_id' => 'required|integer',
            'notes' => 'nullable|string|max:1000'
        ]);

        $contentType = match($request->content_type) {
            'post' => Post::class,
            'event' => Event::class,
            'bulletin' => Bulletin::class,
        };

        $content = $contentType::findOrFail($request->content_id);

        // Check if user can submit this content for moderation
        if (!$this->canSubmitForModeration($content, $request->user())) {
            return back()->with('error', 'You do not have permission to submit this content for moderation.');
        }

        // Check if already submitted
        $existingModeration = ContentModeration::where('moderatable_type', $contentType)
            ->where('moderatable_id', $content->id)
            ->where('status', 'pending')
            ->first();

        if ($existingModeration) {
            return back()->with('error', 'This content is already submitted for moderation.');
        }

        // Create moderation record
        $moderation = ContentModeration::create([
            'moderatable_type' => $contentType,
            'moderatable_id' => $content->id,
            'status' => 'pending',
            'notes' => $request->notes,
            'submitted_by' => $request->user()->id,
            'version' => 1
        ]);

        return back()->with('success', 'Content submitted for moderation successfully.');
    }

    /**
     * Approve content
     */
    public function approve(Request $request, ContentModeration $moderation)
    {
        $request->validate([
            'notes' => 'nullable|string|max:1000'
        ]);

        DB::transaction(function () use ($moderation, $request) {
            // Update moderation record
            $moderation->update([
                'status' => 'approved',
                'moderated_by' => $request->user()->id,
                'moderated_at' => now(),
                'notes' => $request->notes
            ]);

            // Update content status to published
            $content = $moderation->moderatable;
            if ($content) {
                $content->update(['status' => 'published']);
            }
        });

        return back()->with('success', 'Content approved successfully.');
    }

    /**
     * Reject content
     */
    public function reject(Request $request, ContentModeration $moderation)
    {
        $request->validate([
            'rejection_reason' => 'required|string|max:1000',
            'notes' => 'nullable|string|max:1000'
        ]);

        DB::transaction(function () use ($moderation, $request) {
            // Update moderation record
            $moderation->update([
                'status' => 'rejected',
                'moderated_by' => $request->user()->id,
                'moderated_at' => now(),
                'rejection_reason' => $request->rejection_reason,
                'notes' => $request->notes
            ]);

            // Update content status to draft
            $content = $moderation->moderatable;
            if ($content) {
                $content->update(['status' => 'draft']);
            }
        });

        return back()->with('success', 'Content rejected successfully.');
    }

    /**
     * Request revision
     */
    public function requestRevision(Request $request, ContentModeration $moderation)
    {
        $request->validate([
            'notes' => 'required|string|max:1000'
        ]);

        $moderation->update([
            'status' => 'needs_revision',
            'moderated_by' => $request->user()->id,
            'moderated_at' => now(),
            'notes' => $request->notes
        ]);

        return back()->with('success', 'Revision requested successfully.');
    }

    /**
     * Check if user can submit content for moderation
     */
    private function canSubmitForModeration($content, $user): bool
    {
        // Content creators can submit their own content
        if ($content->author_id === $user->id || $content->created_by === $user->id || $content->posted_by === $user->id) {
            return true;
        }

        // Admins can submit any content
        if ($user->role->value === 'admin') {
            return true;
        }

        return false;
    }
}