<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Event extends Model
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
        'description',
        'event_date',
        'start_time',
        'end_time',
        'location',
        'event_type',
        'is_recurring',
        'recurrence_pattern',
        'created_by',
        'status',
        'published_at',
        'is_featured',
        'max_attendees',
        'registration_required',
        'registration_enabled',
        'registration_capacity',
        'allow_waitlist',
        'registration_deadline',
        'registration_opens_at',
        'registration_instructions',
        'registration_fields',
        'registration_fee',
        'fee_required',
        'send_reminders',
        'reminder_days_before',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'event_date' => 'date',
            'start_time' => 'datetime:H:i',
            'end_time' => 'datetime:H:i',
            'published_at' => 'datetime',
            'is_recurring' => 'boolean',
            'is_featured' => 'boolean',
            'registration_required' => 'boolean',
            'registration_enabled' => 'boolean',
            'allow_waitlist' => 'boolean',
            'fee_required' => 'boolean',
            'send_reminders' => 'boolean',
            'registration_deadline' => 'datetime',
            'registration_opens_at' => 'datetime',
            'registration_fields' => 'array',
            'registration_fee' => 'decimal:2',
        ];
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Auto-generate slug from title
        static::creating(function ($event) {
            if (empty($event->slug)) {
                $event->slug = Str::slug($event->title);
            }
        });

        // Auto-set published_at when status changes to published
        static::saving(function ($event) {
            if ($event->status === 'published' && !$event->published_at) {
                $event->published_at = now();
            }
        });
    }

    /**
     * Get the user who created this event.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Scope a query to only include published events.
     * Events must be marked as published AND published_at must be in the past.
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
     * Scope a query to only include upcoming events.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('event_date', '>=', now()->toDateString())
                     ->orderBy('event_date', 'asc')
                     ->orderBy('start_time', 'asc');
    }

    /**
     * Scope a query to only include past events.
     */
    public function scopePast($query)
    {
        return $query->where('event_date', '<', now()->toDateString())
                     ->orderBy('event_date', 'desc');
    }

    /**
     * Scope a query to filter by event type.
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('event_type', $type);
    }

    /**
     * Check if event is upcoming.
     */
    public function isUpcoming(): bool
    {
        return $this->event_date >= now()->toDateString();
    }

    /**
     * Check if event is past.
     */
    public function isPast(): bool
    {
        return $this->event_date < now()->toDateString();
    }

    /**
     * Get formatted event date and time.
     */
    public function getFormattedDateTime(): string
    {
        $formatted = $this->event_date->format('F j, Y');
        
        if ($this->start_time) {
            $formatted .= ' at ' . $this->start_time->format('g:i A');
        }
        
        if ($this->end_time) {
            $formatted .= ' - ' . $this->end_time->format('g:i A');
        }
        
        return $formatted;
    }

    /**
     * Get all translations for this event.
     */
    public function translations(): HasMany
    {
        return $this->hasMany(EventTranslation::class);
    }

    /**
     * Get all registrations for this event.
     */
    public function registrations(): HasMany
    {
        return $this->hasMany(EventRegistration::class);
    }

    /**
     * Get translation for specific locale.
     */
    public function translation(string $locale): ?EventTranslation
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
                'description' => $this->description,
                'location' => $this->location,
            ];
        }

        // Get translation for other languages
        $translation = $this->translation($locale);
        
        if ($translation) {
            return [
                'title' => $translation->title,
                'slug' => $translation->slug,
                'description' => $translation->description,
                'location' => $translation->location,
            ];
        }

        // Fallback to English if translation doesn't exist
        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'location' => $this->location,
        ];
    }

    /**
     * Check if event has translation for specific locale.
     */
    public function hasTranslation(string $locale): bool
    {
        if ($locale === 'en') {
            return true; // Always has English (main data)
        }
        
        return $this->translations()->where('locale', $locale)->exists();
    }

    /**
     * Scope to filter events by locale.
     */
    public function scopeForLocale($query, $locale = 'en')
    {
        if ($locale === 'en') {
            // For English, show events that either have no translations (English content) 
            // or have English translations
            return $query->where(function($q) {
                $q->whereDoesntHave('translations') // Original English content
                  ->orWhereHas('translations', function($subQ) {
                      $subQ->where('locale', 'en');
                  });
            });
        } else {
            // For other languages, ONLY show events that have translations in that language
            // Do NOT fallback to English content
            return $query->whereHas('translations', function($subQ) use ($locale) {
                $subQ->where('locale', $locale);
            });
        }
    }

    /**
     * Check if event requires registration.
     */
    public function requiresRegistration(): bool
    {
        return $this->registration_required && $this->registration_enabled;
    }

    /**
     * Check if registration is open.
     */
    public function isRegistrationOpen(): bool
    {
        if (!$this->registration_enabled) {
            return false;
        }

        // Check if registration has opened
        if ($this->registration_opens_at && $this->registration_opens_at->isFuture()) {
            return false;
        }

        // Check if registration deadline has passed
        if ($this->registration_deadline && $this->registration_deadline->isPast()) {
            return false;
        }

        return true;
    }

    /**
     * Get confirmed registrations count.
     */
    public function getConfirmedRegistrationsCount(): int
    {
        return $this->registrations()->confirmed()->sum('total_attendees');
    }

    /**
     * Get waitlisted registrations count.
     */
    public function getWaitlistedRegistrationsCount(): int
    {
        return $this->registrations()->waitlisted()->count();
    }

    /**
     * Check if event is full.
     */
    public function isFull(): bool
    {
        if (!$this->registration_capacity) {
            return false;
        }

        return $this->getConfirmedRegistrationsCount() >= $this->registration_capacity;
    }

    /**
     * Check if event has available spots.
     */
    public function hasAvailableSpots(): bool
    {
        return !$this->isFull();
    }

    /**
     * Get available spots count.
     */
    public function getAvailableSpots(): int
    {
        if (!$this->registration_capacity) {
            return 999; // Unlimited
        }

        return max(0, $this->registration_capacity - $this->getConfirmedRegistrationsCount());
    }

    /**
     * Check if user is registered for this event.
     */
    public function isUserRegistered($userId): bool
    {
        return $this->registrations()->where('user_id', $userId)->confirmed()->exists();
    }

    /**
     * Check if email is registered for this event.
     */
    public function isEmailRegistered($email): bool
    {
        return $this->registrations()->where('registrant_email', $email)->confirmed()->exists();
    }

    /**
     * Get confirmed registrations count as attribute.
     */
    public function getConfirmedRegistrationsAttribute(): int
    {
        return $this->getConfirmedRegistrationsCount();
    }

    /**
     * Check if registration is open as attribute.
     */
    public function getIsRegistrationOpenAttribute(): bool
    {
        return $this->isRegistrationOpen();
    }

    /**
     * Check if event is full as attribute.
     */
    public function getIsFullAttribute(): bool
    {
        return $this->isFull();
    }

    /**
     * Get allow waitlist as attribute.
     */
    public function getAllowWaitlistAttribute(): bool
    {
        return $this->allow_waitlist ?? false;
    }

    /**
     * Get registration status for user.
     */
    public function getRegistrationStatus($userId): ?string
    {
        $registration = $this->registrations()->where('user_id', $userId)->first();
        return $registration ? $registration->status : null;
    }

    /**
     * Get registration deadline formatted.
     */
    public function getFormattedRegistrationDeadline(): ?string
    {
        return $this->registration_deadline ? $this->registration_deadline->format('M j, Y g:i A') : null;
    }

    /**
     * Get registration opens date formatted.
     */
    public function getFormattedRegistrationOpensAt(): ?string
    {
        return $this->registration_opens_at ? $this->registration_opens_at->format('M j, Y g:i A') : null;
    }

    /**
     * Scope to filter events that require registration.
     */
    public function scopeRequiresRegistration($query)
    {
        return $query->where('registration_required', true)->where('registration_enabled', true);
    }

    /**
     * Scope to filter events with open registration.
     */
    public function scopeWithOpenRegistration($query)
    {
        return $query->where('registration_enabled', true)
                    ->where(function($q) {
                        $q->whereNull('registration_opens_at')
                          ->orWhere('registration_opens_at', '<=', now());
                    })
                    ->where(function($q) {
                        $q->whereNull('registration_deadline')
                          ->orWhere('registration_deadline', '>', now());
                    });
    }
}
