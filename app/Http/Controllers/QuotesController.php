<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quote;
use Inertia\Inertia;

class QuotesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quotes = Quote::orderBy('display_order')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('admin/Quotes/Index', [
            'quotes' => $quotes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/Quotes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'quote_en' => 'required|string|max:2000',
            'author_en' => 'required|string|max:255',
            'quote_fr' => 'nullable|string|max:2000',
            'quote_sr' => 'nullable|string|max:2000',
            'author_fr' => 'nullable|string|max:255',
            'author_sr' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'title_fr' => 'nullable|string|max:255',
            'title_sr' => 'nullable|string|max:255',
            'source_en' => 'nullable|string|max:255',
            'source_fr' => 'nullable|string|max:255',
            'source_sr' => 'nullable|string|max:255',
            'century' => 'nullable|integer|min:1|max:21',
            'category' => 'required|string|in:general,prayer,theology,spiritual,pastoral',
            'is_active' => 'boolean',
            'display_order' => 'integer|min:0'
        ]);

        Quote::create($request->all());

        return redirect()->route('quotes.index')
            ->with('success', 'Quote created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Quote $quote)
    {
        return Inertia::render('admin/Quotes/Show', [
            'quote' => $quote
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quote $quote)
    {
        return Inertia::render('admin/Quotes/Edit', [
            'quote' => $quote
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quote $quote)
    {
        $request->validate([
            'quote_en' => 'required|string|max:2000',
            'author_en' => 'required|string|max:255',
            'quote_fr' => 'nullable|string|max:2000',
            'quote_sr' => 'nullable|string|max:2000',
            'author_fr' => 'nullable|string|max:255',
            'author_sr' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'title_fr' => 'nullable|string|max:255',
            'title_sr' => 'nullable|string|max:255',
            'source_en' => 'nullable|string|max:255',
            'source_fr' => 'nullable|string|max:255',
            'source_sr' => 'nullable|string|max:255',
            'century' => 'nullable|integer|min:1|max:21',
            'category' => 'required|string|in:general,prayer,theology,spiritual,pastoral',
            'is_active' => 'boolean',
            'display_order' => 'integer|min:0'
        ]);

        $quote->update($request->all());

        return redirect()->route('quotes.index')
            ->with('success', 'Quote updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quote $quote)
    {
        $quote->delete();

        return redirect()->route('quotes.index')
            ->with('success', 'Quote deleted successfully.');
    }

    /**
     * Get a random quote for the frontend
     */
    public function random(Request $request)
    {
        $locale = $request->get('lang', 'en');
        
        $quote = Quote::active()
            ->random()
            ->first();

        if (!$quote) {
            return response()->json(['error' => 'No quotes available'], 404);
        }

        return response()->json([
            'id' => $quote->id,
            'quote' => $quote->getLocalizedQuote($locale),
            'author' => $quote->getFullAuthorName($locale),
            'source' => $quote->getFormattedSource($locale),
            'category' => $quote->category,
            'century' => $quote->century
        ]);
    }

    /**
     * Get all quotes for browsing
     */
    public function browse(Request $request)
    {
        $locale = $request->get('lang', 'en');
        $category = $request->get('category');
        $century = $request->get('century');
        
        $query = Quote::active();
        
        if ($category) {
            $query->byCategory($category);
        }
        
        if ($century) {
            $query->byCentury($century);
        }
        
        $quotes = $query->orderBy('display_order')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        $quotes->getCollection()->transform(function ($quote) use ($locale) {
            return [
                'id' => $quote->id,
                'quote' => $quote->getLocalizedQuote($locale),
                'author' => $quote->getFullAuthorName($locale),
                'source' => $quote->getFormattedSource($locale),
                'category' => $quote->category,
                'century' => $quote->century,
                'created_at' => $quote->created_at
            ];
        });

        return response()->json($quotes);
    }
}
