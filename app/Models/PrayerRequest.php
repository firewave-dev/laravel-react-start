<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class PrayerRequest extends Model
{
    protected $fillable = [
        'title',
        'request',
        'requester_name',
        'requester_email',
        'visibility',
        'status',
        'category',
        'prayer_count',
        'is_urgent',
        'is_anonymous',
        'answered_at',
        'answer_notes',
        'user_id'
    ];

    protected $casts = [
        'is_urgent' => 'boolean',
        'is_anonymous' => 'boolean',
        'prayer_count' => 'integer',
        'answered_at' => 'datetime'
    ];

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopePublic($query)
    {
        return $query->where('visibility', 'public');
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeUrgent($query)
    {
        return $query->where('is_urgent', true);
    }

    public function scopeAnswered($query)
    {
        return $query->where('status', 'answered');
    }

    public function scopeRecent($query, $days = 30)
    {
        return $query->where('created_at', '>=', Carbon::now()->subDays($days));
    }

    // Accessors
    public function getDisplayNameAttribute(): string
    {
        if ($this->is_anonymous || $this->visibility === 'anonymous') {
            return 'Anonymous';
        }
        
        return $this->requester_name ?: 'Anonymous';
    }

    public function getFormattedCreatedAtAttribute(): string
    {
        return $this->created_at->format('M j, Y');
    }

    public function getFormattedAnsweredAtAttribute(): ?string
    {
        return $this->answered_at ? $this->answered_at->format('M j, Y') : null;
    }

    public function getCategoryLabelAttribute(): string
    {
        return match($this->category) {
            'health' => 'Health',
            'family' => 'Family',
            'spiritual' => 'Spiritual',
            'work' => 'Work',
            'travel' => 'Travel',
            default => 'Other'
        };
    }

    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'active' => 'Active',
            'answered' => 'Answered',
            'archived' => 'Archived',
            default => 'Unknown'
        };
    }

    // Methods
    public function incrementPrayerCount(): void
    {
        $this->increment('prayer_count');
    }

    public function markAsAnswered(?string $notes = null): void
    {
        $this->update([
            'status' => 'answered',
            'answered_at' => now(),
            'answer_notes' => $notes
        ]);
    }

    public function isVisibleToUser(?User $user = null): bool
    {
        // Public requests are visible to everyone
        if ($this->visibility === 'public') {
            return true;
        }

        // Private requests are only visible to the requester
        if ($this->visibility === 'private') {
            return $user && $user->id === $this->user_id;
        }

        // Anonymous requests are visible to everyone but without personal details
        if ($this->visibility === 'anonymous') {
            return true;
        }

        return false;
    }

    public function canBePrayedFor(): bool
    {
        return $this->status === 'active' && $this->visibility !== 'private';
    }

    public function getPrayerRequestText(): string
    {
        $text = $this->request;
        
        // If anonymous, don't include personal details
        if ($this->is_anonymous || $this->visibility === 'anonymous') {
            return $text;
        }

        // Include requester name if available and not anonymous
        if ($this->requester_name && !$this->is_anonymous) {
            $text = "Prayer request from {$this->requester_name}: " . $text;
        }

        return $text;
    }
}
