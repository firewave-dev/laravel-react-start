<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bulletin extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'message',
        'priority',
        'type',
        'posted_by',
        'expires_at',
        'is_pinned',
        'status',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'is_pinned' => 'boolean',
    ];

    /**
     * Get the user who posted this bulletin.
     */
    public function poster(): BelongsTo
    {
        return $this->belongsTo(User::class, 'posted_by');
    }

    /**
     * Get the translations for this bulletin.
     */
    public function translations(): HasMany
    {
        return $this->hasMany(BulletinTranslation::class);
    }

    /**
     * Scope to get active bulletins.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active')
            ->where(function ($q) {
                $q->whereNull('expires_at')
                  ->orWhere('expires_at', '>', now());
            });
    }

    /**
     * Scope to filter bulletins by locale.
     */
    public function scopeForLocale($query, $locale = 'en')
    {
        if ($locale === 'en') {
            // For English, show bulletins that either have no translations (English content) 
            // or have English translations
            return $query->where(function($q) {
                $q->whereDoesntHave('translations') // Original English content
                  ->orWhereHas('translations', function($subQ) {
                      $subQ->where('locale', 'en');
                  });
            });
        } else {
            // For other languages, ONLY show bulletins that have translations in that language
            // Do NOT fallback to English content
            return $query->whereHas('translations', function($subQ) use ($locale) {
                $subQ->where('locale', $locale);
            });
        }
    }
}