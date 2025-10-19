<?php

namespace App\Console\Commands;

use App\Models\Post;
use App\Models\Event;
use App\Services\NotificationService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ProcessScheduledContent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'content:process-scheduled';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process scheduled posts and events for publishing';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Processing scheduled content...');
        
        $postsPublished = $this->processScheduledPosts();
        $eventsPublished = $this->processScheduledEvents();
        
        $this->info("Published {$postsPublished} posts and {$eventsPublished} events.");
        
        Log::info('Scheduled content processed', [
            'posts_published' => $postsPublished,
            'events_published' => $eventsPublished
        ]);
        
        return Command::SUCCESS;
    }

    /**
     * Process scheduled posts
     */
    private function processScheduledPosts(): int
    {
        $scheduledPosts = Post::where('status', 'draft')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->get();

        $count = 0;
        
        foreach ($scheduledPosts as $post) {
            $post->update(['status' => 'published']);
            
            // Send notifications
            NotificationService::sendPostNotification($post);
            
            $count++;
            
            $this->line("Published post: {$post->title}");
        }
        
        return $count;
    }

    /**
     * Process scheduled events
     */
    private function processScheduledEvents(): int
    {
        $scheduledEvents = Event::where('status', 'draft')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->get();

        $count = 0;
        
        foreach ($scheduledEvents as $event) {
            $event->update(['status' => 'published']);
            
            // Send notifications
            NotificationService::sendEventNotification($event);
            
            $count++;
            
            $this->line("Published event: {$event->title}");
        }
        
        return $count;
    }
}