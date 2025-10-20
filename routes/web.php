<?php

use App\Http\Controllers\SearchController;
use App\Http\Controllers\ModerationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    $locale = request('lang', 'en');
    
    // Get a random quote for the Daily Inspiration section
    $randomQuote = \App\Models\Quote::active()
        ->random()
        ->first();

    // Format the quote data for the Home component with language support
    $quote = null;
    if ($randomQuote) {
        $quote = [
            'message' => $randomQuote->getLocalizedQuote($locale),
            'author' => $randomQuote->getFullAuthorName($locale),
            'source' => $randomQuote->getLocalizedSource($locale),
            'category' => $randomQuote->category,
            'century' => $randomQuote->century
        ];
    }

    return Inertia::render('front/Home', [
        'quote' => $quote,
        'currentLocale' => $locale
    ]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('front/About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('front/Contact');
})->name('contact');

Route::get('/bulletin', function () {
    $locale = request('lang', 'en');
    
    $bulletins = \App\Models\Bulletin::active()
        ->with(['poster', 'translations'])
        ->orderBy('is_pinned', 'desc')
        ->orderBy('priority', 'asc')
        ->latest()
        ->get();
        
    return Inertia::render('front/Bulletin', [
        'bulletins' => $bulletins,
        'currentLocale' => $locale,
    ]);
})->name('bulletin');

Route::get('/calendar', function () {
    $locale = request('lang', 'en');
    
    // Get upcoming published events with registration data
    $events = \App\Models\Event::published()
        ->with(['translations', 'registrations'])
        ->upcoming()
        ->orderBy('event_date')
        ->orderBy('start_time')
        ->get();

    return Inertia::render('front/Calendar', [
        'events' => $events,
        'currentLocale' => $locale,
    ]);
})->name('calendar');

Route::get('/blog', function () {
    $locale = request('lang', 'en'); // Get language from query param
    
    $posts = \App\Models\Post::published()
        ->with(['author', 'translations'])
        ->latest('published_at')
        ->paginate(10);

    return Inertia::render('front/Blog', [
        'posts' => $posts,
        'currentLocale' => $locale,
    ]);
})->name('blog');

Route::get('/blog/{slug}', function ($slug) {
    $locale = request('lang', 'en');
    
    $post = \App\Models\Post::published()
        ->with(['author', 'translations'])
        ->where('slug', $slug)
        ->firstOrFail();

    return Inertia::render('front/Post', [
        'post' => $post,
        'currentLocale' => $locale,
    ]);
})->name('post.show');

// Search routes
Route::get('/search', [SearchController::class, 'search'])->name('search');
Route::get('/search/suggestions', [SearchController::class, 'suggestions'])->name('search.suggestions');

// Public quotes API routes
Route::get('/api/quotes/random', [App\Http\Controllers\QuotesController::class, 'random'])->name('quotes.random');
Route::get('/api/quotes/browse', [App\Http\Controllers\QuotesController::class, 'browse'])->name('quotes.browse');

// File upload routes
Route::post('/upload/avatar', [App\Http\Controllers\FileUploadController::class, 'uploadAvatar'])->name('upload.avatar');
Route::post('/upload/post-image', [App\Http\Controllers\FileUploadController::class, 'uploadPostImage'])->name('upload.post-image');
Route::post('/upload/event-image', [App\Http\Controllers\FileUploadController::class, 'uploadEventImage'])->name('upload.event-image');

// Prayer Requests Routes
Route::get('/prayer-requests', [App\Http\Controllers\PrayerRequestController::class, 'index'])->name('prayer-requests.index');
Route::get('/prayer-requests/create', [App\Http\Controllers\PrayerRequestController::class, 'create'])->name('prayer-requests.create');
Route::post('/prayer-requests', [App\Http\Controllers\PrayerRequestController::class, 'store'])->name('prayer-requests.store');
Route::get('/prayer-requests/{prayerRequest}', [App\Http\Controllers\PrayerRequestController::class, 'show'])->name('prayer-requests.show');
Route::post('/prayer-requests/{prayerRequest}/pray', [App\Http\Controllers\PrayerRequestController::class, 'pray'])->name('prayer-requests.pray');

// Event Registration Routes
Route::get('/events/{event}/register', [App\Http\Controllers\EventRegistrationController::class, 'create'])->name('event-registrations.create');
Route::post('/events/{event}/register', [App\Http\Controllers\EventRegistrationController::class, 'store'])->name('event-registrations.store');
Route::get('/registrations/{registration}', [App\Http\Controllers\EventRegistrationController::class, 'show'])->name('event-registrations.show');
Route::get('/registrations/{registration}/edit', [App\Http\Controllers\EventRegistrationController::class, 'edit'])->name('event-registrations.edit');
Route::put('/registrations/{registration}', [App\Http\Controllers\EventRegistrationController::class, 'update'])->name('event-registrations.update');
Route::delete('/registrations/{registration}', [App\Http\Controllers\EventRegistrationController::class, 'destroy'])->name('event-registrations.destroy');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $locale = request('lang', 'en'); // Get language from query param
        
        // Get real statistics
        $stats = [
            'posts' => [
                'total' => \App\Models\Post::count(),
                'published' => \App\Models\Post::published()->count(),
                'draft' => \App\Models\Post::where('status', 'draft')->count(),
            ],
            'events' => [
                'total' => \App\Models\Event::count(),
                'upcoming' => \App\Models\Event::where('event_date', '>=', now())->count(),
                'past' => \App\Models\Event::where('event_date', '<', now())->count(),
            ],
            'bulletins' => [
                'total' => \App\Models\Bulletin::count(),
                'active' => \App\Models\Bulletin::active()->count(),
                'pinned' => \App\Models\Bulletin::where('is_pinned', true)->count(),
            ],
            'users' => [
                'total' => \App\Models\User::count(),
                'active' => \App\Models\User::whereNotNull('email_verified_at')->count(),
                'admin' => \App\Models\User::where('is_admin', true)->count(),
            ]
        ];

        // Get recent content (all posts, but display in selected language)
        $recentPosts = \App\Models\Post::with(['author', 'translations'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($post) use ($locale) {
                // Get translated title if available
                $title = $post->title;
                if ($locale !== 'en' && $post->translations) {
                    $translation = $post->translations->where('locale', $locale)->first();
                    $title = $translation?->title ?? $post->title;
                }
                
                return [
                    'id' => $post->id,
                    'title' => $title,
                    'status' => $post->status,
                    'created_at' => $post->created_at,
                    'author_name' => $post->author?->name ?? 'Unknown',
                ];
            });

        $recentEvents = \App\Models\Event::with('translations')
            ->where('event_date', '>=', now())
            ->orderBy('event_date')
            ->limit(5)
            ->get()
            ->map(function ($event) use ($locale) {
                // Get translated title if available
                $title = $event->title;
                if ($locale !== 'en' && $event->translations) {
                    $translation = $event->translations->where('locale', $locale)->first();
                    $title = $translation?->title ?? $event->title;
                }
                
                return [
                    'id' => $event->id,
                    'title' => $title,
                    'event_date' => $event->event_date,
                    'status' => $event->status,
                    'location' => $event->location,
                ];
            });

        $recentBulletins = \App\Models\Bulletin::with(['poster', 'translations'])
            ->active()
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($bulletin) use ($locale) {
                // Get translated title if available
                $title = $bulletin->title;
                if ($locale !== 'en' && $bulletin->translations) {
                    $translation = $bulletin->translations->where('locale', $locale)->first();
                    $title = $translation?->title ?? $bulletin->title;
                }
                
                return [
                    'id' => $bulletin->id,
                    'title' => $title,
                    'priority' => $bulletin->priority,
                    'created_at' => $bulletin->created_at,
                    'is_pinned' => $bulletin->is_pinned,
                    'poster_name' => $bulletin->poster?->name ?? 'Unknown',
                ];
            });

        // Get pending moderations (posts/events/bulletins with pending status)
        $pendingModerations = collect();
        
        // Pending posts
        $pendingPosts = \App\Models\Post::where('status', 'pending')
            ->with(['author', 'translations'])
            ->latest()
            ->limit(3)
            ->get()
            ->map(function ($post) use ($locale) {
                // Get translated title if available
                $title = $post->title;
                if ($locale !== 'en' && $post->translations) {
                    $translation = $post->translations->where('locale', $locale)->first();
                    $title = $translation?->title ?? $post->title;
                }
                
                return [
                    'id' => $post->id,
                    'content_type' => 'Post',
                    'title' => $title,
                    'created_at' => $post->created_at,
                    'author_name' => $post->author?->name ?? 'Unknown',
                ];
            });

        // Pending events
        $pendingEvents = \App\Models\Event::where('status', 'pending')
            ->with('translations')
            ->latest()
            ->limit(3)
            ->get()
            ->map(function ($event) use ($locale) {
                // Get translated title if available
                $title = $event->title;
                if ($locale !== 'en' && $event->translations) {
                    $translation = $event->translations->where('locale', $locale)->first();
                    $title = $translation?->title ?? $event->title;
                }
                
                return [
                    'id' => $event->id,
                    'content_type' => 'Event',
                    'title' => $title,
                    'created_at' => $event->created_at,
                ];
            });

        // Pending bulletins
        $pendingBulletins = \App\Models\Bulletin::where('status', 'pending')
            ->with(['poster', 'translations'])
            ->latest()
            ->limit(3)
            ->get()
            ->map(function ($bulletin) use ($locale) {
                // Get translated title if available
                $title = $bulletin->title;
                if ($locale !== 'en' && $bulletin->translations) {
                    $translation = $bulletin->translations->where('locale', $locale)->first();
                    $title = $translation?->title ?? $bulletin->title;
                }
                
                return [
                    'id' => $bulletin->id,
                    'content_type' => 'Bulletin',
                    'title' => $title,
                    'created_at' => $bulletin->created_at,
                    'poster_name' => $bulletin->poster?->name ?? 'Unknown',
                ];
            });

        $pendingModerations = $pendingPosts
            ->concat($pendingEvents)
            ->concat($pendingBulletins)
            ->sortByDesc('created_at')
            ->take(6);

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentPosts' => $recentPosts,
            'recentEvents' => $recentEvents,
            'recentBulletins' => $recentBulletins,
            'pendingModerations' => $pendingModerations,
            'currentLocale' => $locale,
        ]);
    })->name('dashboard');

    // User management routes
    Route::resource('users', App\Http\Controllers\UserController::class);
    // Route::resource('preferences', App\Http\Controllers\PreferenceController::class);
    
    // Quotes management routes
    Route::resource('quotes', App\Http\Controllers\QuotesController::class);
    
    // Admin Prayer Requests Routes
    Route::get('/admin/prayer-requests', [App\Http\Controllers\PrayerRequestController::class, 'adminIndex'])->name('admin.prayer-requests.index');
    Route::get('/admin/prayer-requests/{prayerRequest}/edit', [App\Http\Controllers\PrayerRequestController::class, 'adminEdit'])->name('admin.prayer-requests.edit');
    Route::put('/admin/prayer-requests/{prayerRequest}', [App\Http\Controllers\PrayerRequestController::class, 'adminUpdate'])->name('admin.prayer-requests.update');
    Route::delete('/admin/prayer-requests/{prayerRequest}', [App\Http\Controllers\PrayerRequestController::class, 'adminDestroy'])->name('admin.prayer-requests.destroy');

    // Admin Event Registration Routes
    Route::get('/admin/event-registrations', [App\Http\Controllers\EventRegistrationController::class, 'adminIndex'])->name('admin.event-registrations.index');
    Route::get('/admin/events/{event}/registrations', [App\Http\Controllers\EventRegistrationController::class, 'eventRegistrations'])->name('admin.event-registrations.event');
    Route::get('/admin/event-registrations/{registration}', [App\Http\Controllers\EventRegistrationController::class, 'adminShow'])->name('admin.event-registrations.show');
    Route::get('/admin/event-registrations/{registration}/edit', [App\Http\Controllers\EventRegistrationController::class, 'adminEdit'])->name('admin.event-registrations.edit');
    Route::put('/admin/event-registrations/{registration}', [App\Http\Controllers\EventRegistrationController::class, 'adminUpdate'])->name('admin.event-registrations.update');
    Route::delete('/admin/event-registrations/{registration}', [App\Http\Controllers\EventRegistrationController::class, 'adminDestroy'])->name('admin.event-registrations.destroy');
    Route::post('/admin/event-registrations/{registration}/check-in', [App\Http\Controllers\EventRegistrationController::class, 'checkIn'])->name('admin.event-registrations.check-in');
    Route::post('/admin/event-registrations/{registration}/confirm', [App\Http\Controllers\EventRegistrationController::class, 'confirm'])->name('admin.event-registrations.confirm');
    Route::post('/admin/event-registrations/{registration}/cancel', [App\Http\Controllers\EventRegistrationController::class, 'cancel'])->name('admin.event-registrations.cancel');
    Route::post('/admin/event-registrations/{registration}/waitlist', [App\Http\Controllers\EventRegistrationController::class, 'waitlist'])->name('admin.event-registrations.waitlist');

    // Content management routes
    Route::resource('posts', App\Http\Controllers\PostController::class);
    Route::resource('events', App\Http\Controllers\EventController::class);
    Route::resource('bulletins', App\Http\Controllers\BulletinController::class);

    // Moderation routes
    Route::prefix('moderation')->name('moderation.')->group(function () {
        Route::get('/', [ModerationController::class, 'index'])->name('index');
        Route::get('/{moderation}', [ModerationController::class, 'show'])->name('show');
        Route::post('/{moderation}/submit', [ModerationController::class, 'submit'])->name('submit');
        Route::post('/{moderation}/approve', [ModerationController::class, 'approve'])->name('approve');
        Route::post('/{moderation}/reject', [ModerationController::class, 'reject'])->name('reject');
        Route::post('/{moderation}/request-revision', [ModerationController::class, 'requestRevision'])->name('requestRevision');
    });
});

// Include other route files
require __DIR__.'/auth.php';
require __DIR__.'/settings.php';