<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ContentModeration extends Model
{
    use HasFactory;

    protected $table = 'content_moderation';

    protected $fillable = [
        'moderatable_type',
        'moderatable_id',
        'status',
        'notes',
        'rejection_reason',
        'moderation_data',
        'submitted_by',
        'moderated_by',
        'moderated_at',
        'version',
        'previous_data'
    ];

    protected $casts = [
        'moderation_data' => 'array',
        'previous_data' => 'array',
        'moderated_at' => 'datetime'
    ];

    /**
     * Get the moderatable content (Post, Event, Bulletin)
     */
    public function moderatable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the user who submitted for moderation
     */
    public function submitter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }

    /**
     * Get the moderator who reviewed the content
     */
    public function moderator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'moderated_by');
    }

    /**
     * Scope for pending moderation
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope for approved content
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope for rejected content
     */
    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    /**
     * Scope for content needing revision
     */
    public function scopeNeedingRevision($query)
    {
        return $query->where('status', 'needs_revision');
    }

    /**
     * Check if moderation is pending
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if moderation is approved
     */
    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    /**
     * Check if moderation is rejected
     */
    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    /**
     * Check if moderation needs revision
     */
    public function needsRevision(): bool
    {
        return $this->status === 'needs_revision';
    }

    /**
     * Get status badge color
     */
    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'pending' => 'yellow',
            'approved' => 'green',
            'rejected' => 'red',
            'needs_revision' => 'orange',
            default => 'gray'
        };
    }

    /**
     * Get status label
     */
    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'pending' => 'Pending Review',
            'approved' => 'Approved',
            'rejected' => 'Rejected',
            'needs_revision' => 'Needs Revision',
            default => 'Unknown'
        };
    }
}