<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_preferences', function (Blueprint $table) {
            // Add specific notification preferences
            $table->boolean('notify_new_posts')->default(true)->after('email_notifications');
            $table->boolean('notify_new_events')->default(true)->after('notify_new_posts');
            $table->boolean('notify_new_bulletins')->default(true)->after('notify_new_events');
            $table->boolean('notify_event_reminders')->default(true)->after('notify_new_bulletins');
            $table->boolean('notify_weekly_digest')->default(false)->after('notify_event_reminders');
            
            // Language preference for notifications
            $table->string('notification_language', 2)->default('en')->after('notify_weekly_digest');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_preferences', function (Blueprint $table) {
            $table->dropColumn([
                'notify_new_posts',
                'notify_new_events', 
                'notify_new_bulletins',
                'notify_event_reminders',
                'notify_weekly_digest',
                'notification_language'
            ]);
        });
    }
};