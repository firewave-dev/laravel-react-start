<?php

namespace App\Console\Commands;

use App\Models\Event;
use App\Models\User;
use App\Mail\EventReminder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class SendEventReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'events:send-reminders {--hours=24 : Hours before event to send reminder}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send reminder notifications for upcoming events';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $hours = (int) $this->option('hours');
        $this->info("Sending event reminders for events starting in {$hours} hours...");
        
        $remindersSent = $this->sendEventReminders($hours);
        
        $this->info("Sent {$remindersSent} event reminders.");
        
        Log::info('Event reminders processed', [
            'reminders_sent' => $remindersSent,
            'hours_before' => $hours
        ]);
        
        return Command::SUCCESS;
    }

    /**
     * Send event reminders
     */
    private function sendEventReminders(int $hours): int
    {
        $targetTime = Carbon::now()->addHours($hours);
        $timeRange = [
            $targetTime->copy()->subMinutes(30),
            $targetTime->copy()->addMinutes(30)
        ];

        $upcomingEvents = Event::where('status', 'published')
            ->whereBetween('event_date', $timeRange)
            ->get();

        $count = 0;
        
        foreach ($upcomingEvents as $event) {
            $subscribers = User::whereHas('preference', function ($query) {
                $query->where('email_notifications', true)
                      ->where('notify_event_reminders', true);
            })->get();
            
            foreach ($subscribers as $subscriber) {
                if ($subscriber->wantsNotificationFor('event_reminders')) {
                    $language = $subscriber->getNotificationLanguage();
                    
                    Mail::to($subscriber->email)
                        ->locale($language)
                        ->send(new EventReminder($event));
                }
            }
            
            $count += $subscribers->count();
            
            $this->line("Sent reminders for event: {$event->title} to {$subscribers->count()} subscribers");
        }
        
        return $count;
    }
}