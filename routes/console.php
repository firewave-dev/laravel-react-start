<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule content processing every minute
Schedule::command('content:process-scheduled')->everyMinute();

// Schedule event reminders every hour
Schedule::command('events:send-reminders')->hourly();

// Schedule event reminders 24 hours before events
Schedule::command('events:send-reminders --hours=24')->dailyAt('09:00');
