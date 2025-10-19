<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@church.com')->first();
        $createdBy = $admin?->id ?? 1;

        $events = [
            [
                'title' => 'Divine Liturgy',
                'slug' => Str::slug('Divine Liturgy'),
                'description' => 'Weekly Divine Liturgy celebrating the Holy Eucharist',
                'event_date' => now()->next('Sunday'),
                'start_time' => '10:00',
                'end_time' => '12:00',
                'location' => 'Main Church',
                'event_type' => 'liturgy',
                'is_recurring' => true,
                'recurrence_pattern' => 'Weekly on Sunday',
                'status' => 'published',
                'is_featured' => true,
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Parish Potluck',
                'slug' => Str::slug('Parish Potluck'),
                'description' => 'Join us for fellowship and food after the Divine Liturgy',
                'event_date' => now()->next('Sunday'),
                'start_time' => '12:30',
                'end_time' => '14:30',
                'location' => 'Fellowship Hall',
                'event_type' => 'social',
                'is_recurring' => false,
                'status' => 'published',
                'is_featured' => true,
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Bible Study',
                'slug' => Str::slug('Bible Study'),
                'description' => 'In-depth study of the Gospel of John',
                'event_date' => now()->addDays(2),
                'start_time' => '19:00',
                'end_time' => '20:30',
                'location' => 'Parish Library',
                'event_type' => 'study',
                'is_recurring' => true,
                'recurrence_pattern' => 'Weekly on Tuesday',
                'status' => 'published',
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Feast of the Theotokos',
                'slug' => Str::slug('Feast of the Theotokos'),
                'description' => 'Celebrating the Dormition of the Mother of God',
                'event_date' => now()->addDays(5),
                'start_time' => '18:00',
                'end_time' => '20:00',
                'location' => 'Main Church',
                'event_type' => 'feast',
                'is_recurring' => false,
                'status' => 'published',
                'is_featured' => true,
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Community Service Day',
                'slug' => Str::slug('Community Service Day'),
                'description' => 'Help our local community - food distribution and assistance',
                'event_date' => now()->addDays(7),
                'start_time' => '09:00',
                'end_time' => '13:00',
                'location' => 'Community Center',
                'event_type' => 'service',
                'is_recurring' => false,
                'status' => 'published',
                'max_attendees' => 20,
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Vespers',
                'slug' => Str::slug('Vespers'),
                'description' => 'Evening Prayer Service',
                'event_date' => now()->addDays(3),
                'start_time' => '18:00',
                'end_time' => '19:00',
                'location' => 'Main Church',
                'event_type' => 'liturgy',
                'is_recurring' => true,
                'recurrence_pattern' => 'Weekly on Saturday',
                'status' => 'published',
                'created_by' => $createdBy,
            ],
        ];

        foreach ($events as $eventData) {
            Event::create($eventData);
        }

        $this->command->info('Events seeded successfully!');
    }
}
