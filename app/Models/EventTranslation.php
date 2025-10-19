<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class EventTranslation extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'event_id',
        'locale',
        'title',
        'slug',
        'description',
        'location',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Auto-generate slug from title and locale
        static::creating(function ($translation) {
            if (empty($translation->slug)) {
                $translation->slug = static::generateUniqueSlug($translation->title, $translation->locale);
            }
        });

        static::updating(function ($translation) {
            if ($translation->isDirty('title')) {
                $translation->slug = static::generateUniqueSlug($translation->title, $translation->locale);
            }
        });
    }

    /**
     * Generate a unique slug for the given title and locale.
     */
    protected static function generateUniqueSlug(string $title, string $locale): string
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $counter = 1;

        while (static::where('locale', $locale)->where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    /**
     * Get the event that owns this translation.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}