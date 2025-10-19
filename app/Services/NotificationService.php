<?php

namespace App\Services;

use App\Mail\PostPublished;
use App\Mail\EventPublished;
use App\Mail\BulletinPosted;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class NotificationService
{
    /**
     * Send post notification to subscribers
     */
    public static function sendPostNotification($post): void
    {
        try {
            $subscribers = User::getPostNotificationSubscribers();
            
            foreach ($subscribers as $subscriber) {
                if ($subscriber->wantsNotificationFor('posts')) {
                    // Get content in user's preferred language
                    $language = $subscriber->getNotificationLanguage();
                    $localizedPost = self::getLocalizedContent($post, $language);
                    
                    Mail::to($subscriber->email)
                        ->locale($language)
                        ->send(new PostPublished($localizedPost));
                }
            }
            
            Log::info("Post notification sent to {$subscribers->count()} subscribers", [
                'post_id' => $post->id,
                'post_title' => $post->title
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to send post notifications', [
                'post_id' => $post->id,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Send event notification to subscribers
     */
    public static function sendEventNotification($event): void
    {
        try {
            $subscribers = User::getEventNotificationSubscribers();
            
            foreach ($subscribers as $subscriber) {
                if ($subscriber->wantsNotificationFor('events')) {
                    // Get content in user's preferred language
                    $language = $subscriber->getNotificationLanguage();
                    $localizedEvent = self::getLocalizedContent($event, $language);
                    
                    Mail::to($subscriber->email)
                        ->locale($language)
                        ->send(new EventPublished($localizedEvent));
                }
            }
            
            Log::info("Event notification sent to {$subscribers->count()} subscribers", [
                'event_id' => $event->id,
                'event_title' => $event->title
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to send event notifications', [
                'event_id' => $event->id,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Send bulletin notification to subscribers
     */
    public static function sendBulletinNotification($bulletin): void
    {
        try {
            $subscribers = User::getBulletinNotificationSubscribers();
            
            foreach ($subscribers as $subscriber) {
                if ($subscriber->wantsNotificationFor('bulletins')) {
                    // Get content in user's preferred language
                    $language = $subscriber->getNotificationLanguage();
                    $localizedBulletin = self::getLocalizedContent($bulletin, $language);
                    
                    Mail::to($subscriber->email)
                        ->locale($language)
                        ->send(new BulletinPosted($localizedBulletin));
                }
            }
            
            Log::info("Bulletin notification sent to {$subscribers->count()} subscribers", [
                'bulletin_id' => $bulletin->id,
                'bulletin_title' => $bulletin->title
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to send bulletin notifications', [
                'bulletin_id' => $bulletin->id,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Get localized content for notifications
     */
    private static function getLocalizedContent($item, string $language)
    {
        if ($language === 'en' || !$item->translations) {
            return $item;
        }

        $translation = $item->translations->where('locale', $language)->first();
        
        if ($translation) {
            // Create a clone with translated content
            $localizedItem = clone $item;
            $localizedItem->title = $translation->title;
            $localizedItem->slug = $translation->slug;
            
            if (isset($translation->description)) {
                $localizedItem->description = $translation->description;
            }
            if (isset($translation->excerpt)) {
                $localizedItem->excerpt = $translation->excerpt;
            }
            if (isset($translation->content)) {
                $localizedItem->content = $translation->content;
            }
            if (isset($translation->message)) {
                $localizedItem->message = $translation->message;
            }
            if (isset($translation->location)) {
                $localizedItem->location = $translation->location;
            }
            
            return $localizedItem;
        }
        
        return $item; // Fallback to original
    }

    /**
     * Send event reminder notifications
     */
    public static function sendEventReminders(): void
    {
        // This would be called by a scheduled command
        // Implementation for sending event reminders 24 hours before events
        Log::info('Event reminders sent');
    }

    /**
     * Send weekly digest
     */
    public static function sendWeeklyDigest(): void
    {
        // This would be called by a scheduled command
        // Implementation for sending weekly digest of all content
        Log::info('Weekly digest sent');
    }
}
