<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'author_id',
        'category',
        'status',
        'published_at',
        'is_featured',
        'views_count',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'is_featured' => 'boolean',
            'views_count' => 'integer',
        ];
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Auto-generate slug from title
        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
        });

        // Auto-set published_at when status changes to published
        static::saving(function ($post) {
            if ($post->status === 'published' && !$post->published_at) {
                $post->published_at = now();
            }
        });
    }

    /**
     * Get the author of the post.
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Scope a query to only include published posts.
     * Posts must be marked as published AND published_at must be in the past.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                     ->where(function($q) {
                         $q->whereNull('published_at')
                           ->orWhere('published_at', '<=', now());
                     });
    }

    /**
     * Scope a query to only include draft posts.
     */
    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    /**
     * Scope a query to only include featured posts.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeInCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Increment the views count.
     */
    public function incrementViews()
    {
        $this->increment('views_count');
    }

    /**
     * Get reading time estimate in minutes.
     */
    public function getReadingTimeAttribute(): int
    {
        $wordCount = str_word_count(strip_tags($this->content));
        return max(1, ceil($wordCount / 200)); // Average reading speed
    }

    /**
     * Get all translations for this post.
     */
    public function translations(): HasMany
    {
        return $this->hasMany(PostTranslation::class);
    }

    /**
     * Get translation for specific locale.
     */
    public function translation(string $locale): ?PostTranslation
    {
        return $this->translations()->where('locale', $locale)->first();
    }

    /**
     * Get translated content for a specific locale.
     * Falls back to default (English) if translation doesn't exist.
     */
    public function getTranslated(string $locale): array
    {
        // If requesting English, return main model data
        if ($locale === 'en') {
            return [
                'title' => $this->title,
                'slug' => $this->slug,
                'excerpt' => $this->excerpt,
                'content' => $this->content,
            ];
        }

        // Get translation for other languages
        $translation = $this->translation($locale);
        
        if ($translation) {
            return [
                'title' => $translation->title,
                'slug' => $translation->slug,
                'excerpt' => $translation->excerpt,
                'content' => $translation->content,
            ];
        }

        // Fallback to English if translation doesn't exist
        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
        ];
    }

    /**
     * Check if post has translation for specific locale.
     */
    public function hasTranslation(string $locale): bool
    {
        if ($locale === 'en') {
            return true; // Always has English (main data)
        }
        
        return $this->translations()->where('locale', $locale)->exists();
    }

    /**
     * Scope to filter posts by locale.
     */
    public function scopeForLocale($query, $locale = 'en')
    {
        if ($locale === 'en') {
            // For English, show posts that either have no translations (English content) 
            // or have English translations
            return $query->where(function($q) {
                $q->whereDoesntHave('translations') // Original English content
                  ->orWhereHas('translations', function($subQ) {
                      $subQ->where('locale', 'en');
                  });
            });
        } else {
            // For other languages, ONLY show posts that have translations in that language
            // Do NOT fallback to English content
            return $query->whereHas('translations', function($subQ) use ($locale) {
                $subQ->where('locale', $locale);
            });
        }
    }
}
