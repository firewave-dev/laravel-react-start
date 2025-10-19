<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventRegistration extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'event_id',
        'user_id',
        'registrant_name',
        'registrant_email',
        'registrant_phone',
        'additional_attendees',
        'total_attendees',
        'status',
        'registration_type',
        'special_requirements',
        'notes',
        'admin_notes',
        'checked_in_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'additional_attendees' => 'array',
            'checked_in_at' => 'datetime',
        ];
    }

    /**
     * Get the event that this registration is for.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Get the user who made this registration (if logged in).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope to filter registrations by status.
     */
    public function scopeWithStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope to filter registrations by event.
     */
    public function scopeForEvent($query, $eventId)
    {
        return $query->where('event_id', $eventId);
    }

    /**
     * Scope to filter registrations by user.
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope to get confirmed registrations only.
     */
    public function scopeConfirmed($query)
    {
        return $query->whereIn('status', ['registered', 'confirmed']);
    }

    /**
     * Scope to get pending registrations.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope to get waitlisted registrations.
     */
    public function scopeWaitlisted($query)
    {
        return $query->where('status', 'waitlisted');
    }

    /**
     * Check if registration is confirmed.
     */
    public function isConfirmed(): bool
    {
        return in_array($this->status, ['registered', 'confirmed']);
    }

    /**
     * Check if registration is waitlisted.
     */
    public function isWaitlisted(): bool
    {
        return $this->status === 'waitlisted';
    }

    /**
     * Check if registration is cancelled.
     */
    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    /**
     * Check if attendee has checked in.
     */
    public function hasCheckedIn(): bool
    {
        return !is_null($this->checked_in_at);
    }

    /**
     * Get formatted registration date.
     */
    public function getFormattedRegistrationDate(): string
    {
        return $this->created_at->format('M j, Y g:i A');
    }

    /**
     * Get formatted check-in date.
     */
    public function getFormattedCheckInDate(): ?string
    {
        return $this->checked_in_at ? $this->checked_in_at->format('M j, Y g:i A') : null;
    }

    /**
     * Get status label with color.
     */
    public function getStatusLabel(): array
    {
        return match ($this->status) {
            'registered' => ['label' => 'Registered', 'color' => 'blue'],
            'confirmed' => ['label' => 'Confirmed', 'color' => 'green'],
            'waitlisted' => ['label' => 'Waitlisted', 'color' => 'orange'],
            'cancelled' => ['label' => 'Cancelled', 'color' => 'red'],
            default => ['label' => ucfirst($this->status), 'color' => 'gray'],
        };
    }

    /**
     * Get registration type label.
     */
    public function getRegistrationTypeLabel(): array
    {
        return match ($this->registration_type) {
            'member' => ['label' => 'Member', 'color' => 'blue'],
            'guest' => ['label' => 'Guest', 'color' => 'gray'],
            'family' => ['label' => 'Family', 'color' => 'green'],
            default => ['label' => ucfirst($this->registration_type), 'color' => 'gray'],
        };
    }

    /**
     * Cancel this registration.
     */
    public function cancel(): bool
    {
        return $this->update(['status' => 'cancelled']);
    }

    /**
     * Confirm this registration.
     */
    public function confirm(): bool
    {
        return $this->update(['status' => 'confirmed']);
    }

    /**
     * Move to waitlist.
     */
    public function moveToWaitlist(): bool
    {
        return $this->update(['status' => 'waitlisted']);
    }

    /**
     * Check in attendee.
     */
    public function checkIn(): bool
    {
        return $this->update(['checked_in_at' => now()]);
    }

    /**
     * Get display name (user name or registrant name).
     */
    public function getDisplayName(): string
    {
        return $this->user ? $this->user->name : $this->registrant_name;
    }

    /**
     * Get display email (user email or registrant email).
     */
    public function getDisplayEmail(): string
    {
        return $this->user ? $this->user->email : $this->registrant_email;
    }
}