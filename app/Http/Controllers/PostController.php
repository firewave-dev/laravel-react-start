<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Post::with('author');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        $posts = $query->latest('published_at')->latest('created_at')->paginate(15);

        return Inertia::render('posts/Index', [
            'posts' => $posts,
            'filters' => $request->only(['search', 'status', 'category']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'category' => ['required', 'in:news,announcement,reflection,saint_day,teaching'],
            'status' => ['required', 'in:published,draft'],
            'published_at' => ['nullable', 'date'],
            'is_featured' => ['boolean'],
        ]);

        // Generate slug
        $validated['slug'] = Str::slug($validated['title']);
        $validated['author_id'] = auth()->id();
        
        // Set published_at if publishing and not manually set
        if ($validated['status'] === 'published' && !$validated['published_at']) {
            $validated['published_at'] = now();
        }

        $post = Post::create($validated);

        // Save translations
        if (!empty($validated['translations'])) {
            $this->saveTranslations($post, $validated['translations']);
        }

        // Send email notifications if post is published immediately
        if ($validated['status'] === 'published' && (!$validated['published_at'] || $validated['published_at'] <= now())) {
            NotificationService::sendPostNotification($post);
        }

        return redirect()->route('posts.index')
            ->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->load('author');
        $post->incrementViews();

        return Inertia::render('posts/Show', [
            'post' => $post->load(['author', 'translations']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('posts/Edit', [
            'post' => $post->load('translations'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'category' => ['required', 'in:news,announcement,reflection,saint_day,teaching'],
            'status' => ['required', 'in:published,draft'],
            'published_at' => ['nullable', 'date'],
            'is_featured' => ['boolean'],
        ]);

        // Update slug if title changed
        if ($validated['title'] !== $post->title) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Check if this is a new publish (was draft, now published)
        $wasPublishing = $post->status !== 'published' && $validated['status'] === 'published';
        
        // Set published_at if publishing for first time and not manually set
        if ($validated['status'] === 'published' && !$post->published_at && !$validated['published_at']) {
            $validated['published_at'] = now();
        }

        $post->update($validated);

        // Save translations
        if (!empty($validated['translations'])) {
            $this->saveTranslations($post, $validated['translations']);
        }

        // Send email notifications if newly published immediately
        if ($wasPublishing && (!$validated['published_at'] || $validated['published_at'] <= now())) {
            NotificationService::sendPostNotification($post);
        }

        return redirect()->route('posts.index')
            ->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('posts.index')
            ->with('success', 'Post deleted successfully.');
    }


    /**
     * Save translations for a post.
     */
    protected function saveTranslations(Post $post, array $translations)
    {
        foreach ($translations as $locale => $data) {
            // Skip if no title provided (translation not wanted)
            if (empty($data['title'])) {
                // Delete existing translation if exists
                $post->translations()->where('locale', $locale)->delete();
                continue;
            }

            // Update or create translation
            $post->translations()->updateOrCreate(
                ['locale' => $locale],
                [
                    'title' => $data['title'],
                    'excerpt' => $data['excerpt'] ?? null,
                    'content' => $data['content'] ?? '',
                ]
            );
        }
    }
}
