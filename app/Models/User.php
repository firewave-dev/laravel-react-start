<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
        ];
    }

    /**
     * Get the user's preferences.
     */
    public function preference(): HasOne
    {
        return $this->hasOne(UserPreference::class);
    }

    /**
     * Check if user has a specific role.
     */
    public function hasRole(UserRole|string $role): bool
    {
        if (is_string($role)) {
            $role = UserRole::from($role);
        }
        
        return $this->role === $role;
    }

    /**
     * Check if user is admin.
     */
    public function isAdmin(): bool
    {
        return $this->role->isAdmin();
    }

    /**
     * Check if user can manage content.
     */
    public function canManage(): bool
    {
        return $this->role->canManage();
    }

    /**
     * Check if user has a specific permission.
     */
    public function hasPermission(string $permission): bool
    {
        return $this->role->hasPermission($permission);
    }

    /**
     * Get all users who want email notifications.
     */
    public static function getEmailSubscribers()
    {
        return static::whereHas('preference', function ($query) {
            $query->where('email_notifications', true);
        })->get();
    }

    /**
     * Get users who want to receive post notifications
     */
    public static function getPostNotificationSubscribers(): Collection
    {
        return static::whereHas('preference', function ($query) {
            $query->where('email_notifications', true)
                  ->where('notify_new_posts', true);
        })->get();
    }

    /**
     * Get users who want to receive event notifications
     */
    public static function getEventNotificationSubscribers(): Collection
    {
        return static::whereHas('preference', function ($query) {
            $query->where('email_notifications', true)
                  ->where('notify_new_events', true);
        })->get();
    }

    /**
     * Get users who want to receive bulletin notifications
     */
    public static function getBulletinNotificationSubscribers(): Collection
    {
        return static::whereHas('preference', function ($query) {
            $query->where('email_notifications', true)
                  ->where('notify_new_bulletins', true);
        })->get();
    }

    /**
     * Check if user wants to receive notifications for a specific type
     */
    public function wantsNotificationFor(string $type): bool
    {
        $preference = $this->preference;
        if (!$preference || !$preference->email_notifications) {
            return false;
        }

        return match($type) {
            'posts' => $preference->notify_new_posts,
            'events' => $preference->notify_new_events,
            'bulletins' => $preference->notify_new_bulletins,
            'event_reminders' => $preference->notify_event_reminders,
            'weekly_digest' => $preference->notify_weekly_digest,
            default => false,
        };
    }

    /**
     * Get user's preferred notification language
     */
    public function getNotificationLanguage(): string
    {
        return $this->preference?->notification_language ?? 'en';
    }
}
