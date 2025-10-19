<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\User;
use Carbon\Carbon;

class EventRegistrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get some events that require registration
        $events = Event::where('registration_required', true)
                      ->where('registration_enabled', true)
                      ->take(5)
                      ->get();

        if ($events->isEmpty()) {
            // Create some events with registration if none exist
            $this->createEventsWithRegistration();
            $events = Event::where('registration_required', true)->take(5)->get();
        }

        // Get some users for registrations
        $users = User::take(10)->get();

        foreach ($events as $event) {
            // Create registrations for each event
            $this->createRegistrationsForEvent($event, $users);
        }

        echo "Event registrations seeded successfully!\n";
        echo "Created registrations for " . $events->count() . " events\n";
    }

    private function createEventsWithRegistration()
    {
        $eventTypes = ['liturgy', 'meeting', 'social', 'feast'];
        
        for ($i = 1; $i <= 3; $i++) {
            Event::create([
                'title' => "Orthodox Liturgy - Divine Service $i",
                'slug' => "orthodox-liturgy-divine-service-$i",
                'description' => "Join us for a beautiful Orthodox Divine Liturgy service with traditional hymns and prayers.",
                'event_date' => Carbon::now()->addDays(rand(7, 30)),
                'start_time' => Carbon::createFromTime(10, 0),
                'end_time' => Carbon::createFromTime(12, 0),
                'location' => 'Main Church',
                'event_type' => $eventTypes[array_rand($eventTypes)],
                'status' => 'published',
                'published_at' => now(),
                'created_by' => 1,
                'registration_required' => true,
                'registration_enabled' => true,
                'registration_capacity' => rand(20, 50),
                'allow_waitlist' => true,
                'registration_deadline' => Carbon::now()->addDays(rand(1, 7)),
                'registration_instructions' => 'Please register in advance. Contact the church office if you have any questions.',
                'fee_required' => false,
                'send_reminders' => true,
                'reminder_days_before' => 1,
            ]);
        }
    }

    private function createRegistrationsForEvent($event, $users)
    {
        $registrationCount = rand(5, min(15, $event->registration_capacity ?? 20));
        
        for ($i = 0; $i < $registrationCount; $i++) {
            $user = $users->random();
            $totalAttendees = rand(1, 4);
            
            // Create additional attendees for family registrations
            $additionalAttendees = [];
            if ($totalAttendees > 1) {
                $names = ['John', 'Mary', 'Michael', 'Sarah', 'David', 'Lisa', 'James', 'Anna'];
                for ($j = 1; $j < $totalAttendees; $j++) {
                    $additionalAttendees[] = [
                        'name' => $names[array_rand($names)] . ' ' . $user->name,
                        'age' => rand(5, 65)
                    ];
                }
            }

            $statuses = ['registered', 'confirmed', 'waitlisted'];
            $status = $statuses[array_rand($statuses)];
            
            // If event is full, make some registrations waitlisted
            if ($event->getConfirmedRegistrationsCount() >= ($event->registration_capacity ?? 20)) {
                $status = 'waitlisted';
            }

            EventRegistration::create([
                'event_id' => $event->id,
                'user_id' => $user->id,
                'registrant_name' => $user->name,
                'registrant_email' => $user->email,
                'registrant_phone' => '+1-555-' . rand(100, 999) . '-' . rand(1000, 9999),
                'additional_attendees' => $additionalAttendees,
                'total_attendees' => $totalAttendees,
                'status' => $status,
                'registration_type' => $totalAttendees > 1 ? 'family' : 'member',
                'special_requirements' => rand(0, 1) ? 'Vegetarian meal preferred' : null,
                'notes' => rand(0, 1) ? 'Looking forward to this event!' : null,
                'created_at' => Carbon::now()->subDays(rand(0, 10)),
            ]);
        }

        // Create some guest registrations (no user account)
        $guestCount = rand(2, 5);
        for ($i = 0; $i < $guestCount; $i++) {
            $guestNames = [
                'Alex Johnson', 'Maria Garcia', 'Robert Smith', 'Elena Petrov', 
                'Ahmed Hassan', 'Jennifer Lee', 'Carlos Rodriguez', 'Sofia Chen'
            ];
            
            EventRegistration::create([
                'event_id' => $event->id,
                'user_id' => null, // Guest registration
                'registrant_name' => $guestNames[array_rand($guestNames)],
                'registrant_email' => strtolower(str_replace(' ', '.', $guestNames[array_rand($guestNames)])) . '@example.com',
                'registrant_phone' => '+1-555-' . rand(100, 999) . '-' . rand(1000, 9999),
                'additional_attendees' => [],
                'total_attendees' => 1,
                'status' => rand(0, 1) ? 'registered' : 'confirmed',
                'registration_type' => 'guest',
                'special_requirements' => rand(0, 1) ? 'Wheelchair accessible seating needed' : null,
                'notes' => rand(0, 1) ? 'First time attending. Very excited!' : null,
                'created_at' => Carbon::now()->subDays(rand(0, 7)),
            ]);
        }
    }
}