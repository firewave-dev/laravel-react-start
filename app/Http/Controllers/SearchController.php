<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Event;
use App\Models\Bulletin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SearchController extends Controller
{
    /**
     * Perform advanced search across all content types
     */
    public function search(Request $request)
    {
        $query = $request->get('q', '');
        $language = $request->get('lang', 'en');
        $contentTypes = $request->get('contentTypes', ['posts', 'events', 'bulletins']);
        if (is_string($contentTypes)) {
            $contentTypes = explode(',', $contentTypes);
        }
        $dateFrom = $request->get('dateFrom');
        $dateTo = $request->get('dateTo');
        $category = $request->get('category');
        $eventType = $request->get('eventType');
        $priority = $request->get('priority');
        $status = $request->get('status', 'published');

        if (empty($query) && empty($dateFrom) && empty($dateTo) && empty($category) && empty($eventType) && empty($priority)) {
            return Inertia::render('Search/Index');
        }

        $results = [
            'posts' => [],
            'events' => [],
            'bulletins' => []
        ];

        // Search posts
        if (in_array('posts', $contentTypes)) {
            $results['posts'] = $this->searchPosts($query, $language, $category, $dateFrom, $dateTo, $status);
        }

        // Search events
        if (in_array('events', $contentTypes)) {
            $results['events'] = $this->searchEvents($query, $language, $eventType, $dateFrom, $dateTo, $status);
        }

        // Search bulletins
        if (in_array('bulletins', $contentTypes)) {
            $results['bulletins'] = $this->searchBulletins($query, $language, $priority, $dateFrom, $dateTo, $status);
        }

        return Inertia::render('Search/Results', [
            'query' => $query,
            'language' => $language,
            'results' => $results,
            'filters' => [
                'contentTypes' => $contentTypes,
                'dateFrom' => $dateFrom,
                'dateTo' => $dateTo,
                'category' => $category,
                'eventType' => $eventType,
                'priority' => $priority,
                'status' => $status
            ]
        ]);
    }

    /**
     * Search posts
     */
    private function searchPosts(string $query, string $language, ?string $category, ?string $dateFrom, ?string $dateTo, string $status)
    {
        $posts = Post::query();

        // Apply status filter
        if ($status === 'published') {
            $posts->published();
        } elseif ($status === 'draft') {
            $posts->draft();
        }

        // Apply language filter
        $posts->forLocale($language);

        // Apply category filter
        if ($category) {
            $posts->where('category', $category);
        }

        // Apply date filters
        if ($dateFrom) {
            $posts->whereDate('created_at', '>=', $dateFrom);
        }
        if ($dateTo) {
            $posts->whereDate('created_at', '<=', $dateTo);
        }

        // Apply text search
        if (!empty($query)) {
            if ($language === 'en') {
                // Search in main table for English
                $posts->where(function ($q) use ($query) {
                    $q->where('title', 'LIKE', "%{$query}%")
                      ->orWhere('excerpt', 'LIKE', "%{$query}%")
                      ->orWhere('content', 'LIKE', "%{$query}%");
                });
            } else {
                // Search in translations for other languages
                $posts->whereHas('translations', function ($q) use ($query, $language) {
                    $q->where('locale', $language)
                      ->where(function ($subQ) use ($query) {
                          $subQ->where('title', 'LIKE', "%{$query}%")
                               ->orWhere('excerpt', 'LIKE', "%{$query}%")
                               ->orWhere('content', 'LIKE', "%{$query}%");
                      });
                });
            }
        }

        return $posts->with(['author', 'translations'])
                    ->orderBy('created_at', 'desc')
                    ->paginate(10);
    }

    /**
     * Search events
     */
    private function searchEvents(string $query, string $language, ?string $eventType, ?string $dateFrom, ?string $dateTo, string $status)
    {
        $events = Event::query();

        // Apply status filter
        if ($status === 'published') {
            $events->published();
        } elseif ($status === 'draft') {
            $events->draft();
        }

        // Apply language filter
        $events->forLocale($language);

        // Apply event type filter
        if ($eventType) {
            $events->where('event_type', $eventType);
        }

        // Apply date filters
        if ($dateFrom) {
            $events->whereDate('event_date', '>=', $dateFrom);
        }
        if ($dateTo) {
            $events->whereDate('event_date', '<=', $dateTo);
        }

        // Apply text search
        if (!empty($query)) {
            if ($language === 'en') {
                // Search in main table for English
                $events->where(function ($q) use ($query) {
                    $q->where('title', 'LIKE', "%{$query}%")
                      ->orWhere('description', 'LIKE', "%{$query}%")
                      ->orWhere('location', 'LIKE', "%{$query}%");
                });
            } else {
                // Search in translations for other languages
                $events->whereHas('translations', function ($q) use ($query, $language) {
                    $q->where('locale', $language)
                      ->where(function ($subQ) use ($query) {
                          $subQ->where('title', 'LIKE', "%{$query}%")
                               ->orWhere('description', 'LIKE', "%{$query}%")
                               ->orWhere('location', 'LIKE', "%{$query}%");
                      });
                });
            }
        }

        return $events->with(['creator', 'translations'])
                     ->orderBy('event_date', 'asc')
                     ->paginate(10);
    }

    /**
     * Search bulletins
     */
    private function searchBulletins(string $query, string $language, ?string $priority, ?string $dateFrom, ?string $dateTo, string $status)
    {
        $bulletins = Bulletin::query();

        // Apply status filter
        if ($status === 'published') {
            $bulletins->active();
        } elseif ($status === 'draft') {
            $bulletins->where('status', 'draft');
        }

        // Apply language filter
        $bulletins->forLocale($language);

        // Apply priority filter
        if ($priority) {
            $bulletins->where('priority', $priority);
        }

        // Apply date filters
        if ($dateFrom) {
            $bulletins->whereDate('created_at', '>=', $dateFrom);
        }
        if ($dateTo) {
            $bulletins->whereDate('created_at', '<=', $dateTo);
        }

        // Apply text search
        if (!empty($query)) {
            if ($language === 'en') {
                // Search in main table for English
                $bulletins->where(function ($q) use ($query) {
                    $q->where('title', 'LIKE', "%{$query}%")
                      ->orWhere('message', 'LIKE', "%{$query}%");
                });
            } else {
                // Search in translations for other languages
                $bulletins->whereHas('translations', function ($q) use ($query, $language) {
                    $q->where('locale', $language)
                      ->where(function ($subQ) use ($query) {
                          $subQ->where('title', 'LIKE', "%{$query}%")
                               ->orWhere('message', 'LIKE', "%{$query}%");
                      });
                });
            }
        }

        return $bulletins->with(['poster', 'translations'])
                        ->orderBy('created_at', 'desc')
                        ->paginate(10);
    }

    /**
     * Get search suggestions
     */
    public function suggestions(Request $request)
    {
        $query = $request->get('q', '');
        $language = $request->get('lang', 'en');

        if (strlen($query) < 2) {
            return response()->json([]);
        }

        $suggestions = collect();

        // Get post suggestions
        $postSuggestions = Post::where('title', 'LIKE', "%{$query}%")
            ->published()
            ->limit(5)
            ->pluck('title')
            ->map(fn($title) => ['text' => $title, 'type' => 'post']);

        // Get event suggestions
        $eventSuggestions = Event::where('title', 'LIKE', "%{$query}%")
            ->published()
            ->limit(5)
            ->pluck('title')
            ->map(fn($title) => ['text' => $title, 'type' => 'event']);

        $suggestions = $suggestions->merge($postSuggestions)->merge($eventSuggestions);

        return response()->json($suggestions->take(10)->values());
    }
}