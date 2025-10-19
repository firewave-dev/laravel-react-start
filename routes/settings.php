<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    // Redirect /settings to new Account page
    Route::redirect('settings', '/settings/account');

    // New consolidated Account Settings page
    Route::get('settings/account', function () {
        return Inertia::render('Settings/Account', [
            'user' => auth()->user(),
            'twoFactorEnabled' => auth()->user()->two_factor_secret !== null,
        ]);
    })->name('settings.account');

    // Profile update (POST from Account page)
    Route::put('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Password update (POST from Account page)
    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('password.update');

    // Appearance (separate page)
    Route::get('settings/appearance', function () {
        return Inertia::render('Settings/Appearance');
    })->name('appearance.edit');

    // Two-Factor (can be accessed from Account page)
    Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
        ->name('two-factor.show');
});
