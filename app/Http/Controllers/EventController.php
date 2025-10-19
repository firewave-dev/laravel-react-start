<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Event::with('creator');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by event type
        if ($request->filled('type')) {
            $query->where('event_type', $request->type);
        }

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        $events = $query->latest('event_date')->paginate(15);

        return Inertia::render('events/Index', [
            'events' => $events,
            'filters' => $request->only(['search', 'status', 'type']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('events/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'event_date' => ['required', 'date'],
            'start_time' => ['nullable', 'date_format:H:i'],
            'end_time' => ['nullable', 'date_format:H:i', 'after:start_time'],
            'location' => ['nullable', 'string', 'max:255'],
            'event_type' => ['required', 'in:liturgy,feast,social,study,service,other'],
            'is_recurring' => ['boolean'],
            'recurrence_pattern' => ['nullable', 'string', 'max:50'],
            'status' => ['required', 'in:published,draft,cancelled'],
            'published_at' => ['nullable', 'date'],
            'is_featured' => ['boolean'],
            'max_attendees' => ['nullable', 'integer', 'min:1'],
        ]);

        // Generate slug
        $validated['slug'] = Str::slug($validated['title']);
        $validated['created_by'] = auth()->id();
        
        // Set published_at if publishing and not manually set
        if ($validated['status'] === 'published' && !$validated['published_at']) {
            $validated['published_at'] = now();
        }

        $event = Event::create($validated);

        // Save translations
        if (!empty($validated['translations'])) {
            $this->saveTranslations($event, $validated['translations']);
        }

        // Send email notifications if event is published immediately
        if ($validated['status'] === 'published' && (!$validated['published_at'] || $validated['published_at'] <= now())) {
            NotificationService::sendEventNotification($event);
        }

        return redirect()->route('events.index')
            ->with('success', 'Event created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        $event->load('creator');

        return Inertia::render('events/Show', [
            'event' => $event,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        return Inertia::render('events/Edit', [
            'event' => $event->load('translations'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'event_date' => ['required', 'date'],
            'start_time' => ['nullable', 'date_format:H:i'],
            'end_time' => ['nullable', 'date_format:H:i', 'after:start_time'],
            'location' => ['nullable', 'string', 'max:255'],
            'event_type' => ['required', 'in:liturgy,feast,social,study,service,other'],
            'is_recurring' => ['boolean'],
            'recurrence_pattern' => ['nullable', 'string', 'max:50'],
            'status' => ['required', 'in:published,draft,cancelled'],
            'published_at' => ['nullable', 'date'],
            'is_featured' => ['boolean'],
            'max_attendees' => ['nullable', 'integer', 'min:1'],
            // Registration fields
            'registration_required' => ['boolean'],
            'registration_enabled' => ['boolean'],
            'registration_capacity' => ['nullable', 'integer', 'min:1'],
            'allow_waitlist' => ['boolean'],
            'registration_deadline' => ['nullable', 'date'],
            'registration_opens_at' => ['nullable', 'date'],
            'registration_instructions' => ['nullable', 'string'],
            'registration_fee' => ['nullable', 'numeric', 'min:0'],
            'fee_required' => ['boolean'],
            'send_reminders' => ['boolean'],
            'reminder_days_before' => ['nullable', 'integer', 'min:1', 'max:30'],
        ]);

        // Update slug if title changed
        if ($validated['title'] !== $event->title) {
            $validated['slug'] = Str::slug($validated['title']);
        }
        
        // Check if this is a new publish (was draft, now published)
        $wasPublishing = $event->status !== 'published' && $validated['status'] === 'published';
        
        // Set published_at if publishing for first time and not manually set
        if ($validated['status'] === 'published' && !$event->published_at && !$validated['published_at']) {
            $validated['published_at'] = now();
        }

        $event->update($validated);

        // Save translations
        if (!empty($validated['translations'])) {
            $this->saveTranslations($event, $validated['translations']);
        }

        // Send email notifications if newly published immediately
        if ($wasPublishing && (!$validated['published_at'] || $validated['published_at'] <= now())) {
            NotificationService::sendEventNotification($event);
        }

        return redirect()->route('events.index')
            ->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return redirect()->route('events.index')
            ->with('success', 'Event deleted successfully.');
    }


    /**
     * Save translations for an event.
     */
    protected function saveTranslations(Event $event, array $translations)
    {
        foreach ($translations as $locale => $data) {
            // Skip if no title provided (translation not wanted)
            if (empty($data['title'])) {
                // Delete existing translation if exists
                $event->translations()->where('locale', $locale)->delete();
                continue;
            }

            // Update or create translation
            $event->translations()->updateOrCreate(
                ['locale' => $locale],
                [
                    'title' => $data['title'],
                    'description' => $data['description'] ?? null,
                    'location' => $data['location'] ?? null,
                ]
            );
        }
    }
}

