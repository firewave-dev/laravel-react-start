<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class EventRegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }

        $registrations = EventRegistration::where('user_id', $user->id)
            ->with(['event' => function($query) {
                $query->with('translations');
            }])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('front/MyRegistrations', [
            'registrations' => $registrations
        ]);
    }

    /**
     * Show the form for creating a new registration.
     */
    public function create($eventId)
    {
        $event = Event::with('translations')->findOrFail($eventId);
        
        if (!$event->requiresRegistration()) {
            abort(404, 'This event does not require registration.');
        }

        if (!$event->isRegistrationOpen()) {
            abort(404, 'Registration is not open for this event.');
        }

        $user = Auth::user();
        
        // Check if user is already registered
        if ($user && $event->isUserRegistered($user->id)) {
            return redirect()->route('events.show', $event->slug)
                ->with('message', 'You are already registered for this event.');
        }

        return Inertia::render('front/EventRegistration', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'slug' => $event->slug,
                'description' => $event->description,
                'event_date' => $event->event_date,
                'start_time' => $event->start_time,
                'location' => $event->location,
                'registration_capacity' => $event->registration_capacity,
                'registration_deadline' => $event->registration_deadline,
                'registration_instructions' => $event->registration_instructions,
                'registration_fee' => $event->registration_fee,
                'fee_required' => $event->fee_required,
                'available_spots' => $event->getAvailableSpots(),
                'is_full' => $event->isFull(),
                'allow_waitlist' => $event->allow_waitlist,
            ],
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ] : null
        ]);
    }

    /**
     * Store a newly created registration.
     */
    public function store(Request $request, $eventId)
    {
        $event = Event::findOrFail($eventId);
        
        if (!$event->requiresRegistration()) {
            return response()->json(['error' => 'This event does not require registration.'], 400);
        }

        if (!$event->isRegistrationOpen()) {
            return response()->json(['error' => 'Registration is not open for this event.'], 400);
        }

        $user = Auth::user();
        
        // Check if user is already registered
        if ($user && $event->isUserRegistered($user->id)) {
            return response()->json(['error' => 'You are already registered for this event.'], 400);
        }

        // Check if email is already registered
        if ($event->isEmailRegistered($request->registrant_email)) {
            return response()->json(['error' => 'This email is already registered for this event.'], 400);
        }

        $validator = Validator::make($request->all(), [
            'registrant_name' => 'required|string|max:255',
            'registrant_email' => 'required|email|max:255',
            'registrant_phone' => 'nullable|string|max:20',
            'total_attendees' => 'required|integer|min:1|max:10',
            'additional_attendees' => 'nullable|array|max:9',
            'additional_attendees.*.name' => 'required|string|max:255',
            'additional_attendees.*.age' => 'nullable|integer|min:0|max:120',
            'special_requirements' => 'nullable|string|max:1000',
            'notes' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if event is full
        $totalAttendees = $request->total_attendees + count($request->additional_attendees ?? []);
        if ($event->isFull() && !$event->allow_waitlist) {
            return response()->json(['error' => 'This event is full and waitlist is not available.'], 400);
        }

        // Determine registration status
        $status = 'registered';
        if ($event->isFull()) {
            $status = 'waitlisted';
        }

        $registration = EventRegistration::create([
            'event_id' => $event->id,
            'user_id' => $user ? $user->id : null,
            'registrant_name' => $request->registrant_name,
            'registrant_email' => $request->registrant_email,
            'registrant_phone' => $request->registrant_phone,
            'additional_attendees' => $request->additional_attendees,
            'total_attendees' => $totalAttendees,
            'status' => $status,
            'registration_type' => $user ? 'member' : 'guest',
            'special_requirements' => $request->special_requirements,
            'notes' => $request->notes,
        ]);

        // TODO: Send confirmation email
        // Mail::to($registration->registrant_email)->send(new EventRegistrationConfirmation($registration));

        return response()->json([
            'success' => true,
            'message' => $status === 'waitlisted' 
                ? 'You have been added to the waitlist. You will be notified if a spot becomes available.'
                : 'Registration successful! You will receive a confirmation email shortly.',
            'registration' => $registration->load('event')
        ]);
    }

    /**
     * Display the specified registration.
     */
    public function show($id)
    {
        $registration = EventRegistration::with(['event', 'user'])->findOrFail($id);
        
        $user = Auth::user();
        
        // Check if user can view this registration
        if (!$user || ($registration->user_id !== $user->id && !$user->hasRole('admin'))) {
            abort(403);
        }

        return Inertia::render('front/RegistrationDetails', [
            'registration' => $registration
        ]);
    }

    /**
     * Cancel a registration.
     */
    public function cancel($id)
    {
        $registration = EventRegistration::findOrFail($id);
        
        $user = Auth::user();
        
        // Check if user can cancel this registration
        if (!$user || ($registration->user_id !== $user->id && !$user->hasRole('admin'))) {
            abort(403);
        }

        if ($registration->isCancelled()) {
            return response()->json(['error' => 'Registration is already cancelled.'], 400);
        }

        $registration->cancel();

        // TODO: Send cancellation email
        // Mail::to($registration->registrant_email)->send(new EventRegistrationCancelled($registration));

        return response()->json([
            'success' => true,
            'message' => 'Registration cancelled successfully.'
        ]);
    }

    /**
     * Admin: Display all registrations across all events.
     */
    public function adminIndex(Request $request)
    {
        if (!auth()->user() || !auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }
        
        $query = EventRegistration::with(['event', 'user'])
            ->orderBy('created_at', 'desc');

        // Apply filters
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('registrant_name', 'like', "%{$search}%")
                  ->orWhere('registrant_email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('event_id')) {
            $query->where('event_id', $request->event_id);
        }

        $registrations = $query->paginate(20);
        
        // Get all events for filter dropdown
        $events = Event::select('id', 'title', 'event_date')
            ->orderBy('event_date', 'desc')
            ->get();

        // Calculate stats
        $stats = [
            'total' => EventRegistration::count(),
            'confirmed' => EventRegistration::where('status', 'confirmed')->count(),
            'pending' => EventRegistration::where('status', 'pending')->count(),
            'waitlisted' => EventRegistration::where('status', 'waitlisted')->count(),
            'cancelled' => EventRegistration::where('status', 'cancelled')->count(),
            'checked_in' => EventRegistration::whereNotNull('checked_in_at')->count(),
        ];

        return Inertia::render('admin/EventRegistrations/Index', [
            'registrations' => $registrations,
            'events' => $events,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status', 'event_id']),
        ]);
    }

    /**
     * Admin: Display all registrations for a specific event.
     */
    public function eventRegistrations(Request $request, $eventId)
    {
        if (!auth()->user() || !auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }
        
        $event = Event::with('translations')->findOrFail($eventId);
        
        $registrations = EventRegistration::where('event_id', $eventId)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        $stats = [
            'total_registrations' => $registrations->total(),
            'confirmed_count' => $event->getConfirmedRegistrationsCount(),
            'waitlisted_count' => $event->getWaitlistedRegistrationsCount(),
            'available_spots' => $event->getAvailableSpots(),
            'capacity' => $event->registration_capacity,
        ];

        return Inertia::render('admin/EventRegistrations/Event', [
            'event' => $event,
            'registrations' => $registrations,
            'stats' => $stats,
        ]);
    }

    /**
     * Admin: Update registration status.
     */
    public function adminUpdate(Request $request, $id)
    {
        if (!auth()->user() || !auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }
        
        $registration = EventRegistration::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:registered,confirmed,cancelled,waitlisted',
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $registration->update([
            'status' => $request->status,
            'admin_notes' => $request->admin_notes,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registration updated successfully.'
        ]);
    }

    /**
     * Admin: Check in attendee.
     */
    public function adminCheckIn($id)
    {
        if (!auth()->user() || !auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }
        
        $registration = EventRegistration::findOrFail($id);
        
        if ($registration->hasCheckedIn()) {
            return response()->json(['error' => 'Attendee is already checked in.'], 400);
        }

        $registration->checkIn();

        return response()->json([
            'success' => true,
            'message' => 'Attendee checked in successfully.',
            'check_in_time' => $registration->checked_in_at->format('M j, Y g:i A')
        ]);
    }

    /**
     * Admin: Delete registration.
     */
    public function adminDestroy($id)
    {
        if (!auth()->user() || !auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }
        
        $registration = EventRegistration::findOrFail($id);
        $registration->delete();

        return response()->json([
            'success' => true,
            'message' => 'Registration deleted successfully.'
        ]);
    }

    /**
     * Get events with open registration.
     */
    public function eventsWithRegistration(Request $request)
    {
        $locale = $request->get('lang', 'en');
        
        $events = Event::published()
            ->forLocale($locale)
            ->withOpenRegistration()
            ->with('translations')
            ->orderBy('event_date')
            ->paginate(12);

        return Inertia::render('front/EventsWithRegistration', [
            'events' => $events,
            'currentLocale' => $locale
        ]);
    }
}