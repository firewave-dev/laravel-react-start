<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserPreference;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserPreferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = UserPreference::with('user');

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        $preferences = $query->latest()->paginate(15);

        return Inertia::render('preferences/Index', [
            'preferences' => $preferences,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Get users who don't have preferences yet
        $users = User::doesntHave('preference')->get();

        return Inertia::render('preferences/Create', [
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id', 'unique:user_preferences,user_id'],
            'phone' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:500'],
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:male,female,other'],
            'notes' => ['nullable', 'string'],
            'email_notifications' => ['boolean'],
            'sms_notifications' => ['boolean'],
        ]);

        UserPreference::create($validated);

        return redirect()->route('preferences.index')
            ->with('success', 'Preferences created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(UserPreference $preference)
    {
        $preference->load('user');

        return Inertia::render('preferences/Show', [
            'preference' => $preference,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserPreference $preference)
    {
        $preference->load('user');

        return Inertia::render('preferences/Edit', [
            'preference' => $preference,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserPreference $preference)
    {
        $validated = $request->validate([
            'phone' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:500'],
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:male,female,other'],
            'notes' => ['nullable', 'string'],
            'email_notifications' => ['boolean'],
            'sms_notifications' => ['boolean'],
        ]);

        $preference->update($validated);

        return redirect()->route('preferences.index')
            ->with('success', 'Preferences updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserPreference $preference)
    {
        $preference->delete();

        return redirect()->route('preferences.index')
            ->with('success', 'Preferences deleted successfully.');
    }
}
