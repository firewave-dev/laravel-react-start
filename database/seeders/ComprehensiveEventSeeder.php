<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ComprehensiveEventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@church.com')->first();
        $createdBy = $admin?->id ?? 1;

        $events = [
            // Regular Weekly Services
            [
                'title' => 'Divine Liturgy - Sunday',
                'slug' => 'divine-liturgy-sunday-' . time(),
                'description' => 'Weekly Divine Liturgy celebrating the Holy Eucharist. All are welcome to join us in worship, prayer, and fellowship.',
                'event_date' => now()->next('Sunday'),
                'start_time' => '09:30',
                'end_time' => '11:30',
                'location' => 'Main Church Sanctuary',
                'event_type' => 'liturgy',
                'is_recurring' => true,
                'recurrence_pattern' => 'Weekly on Sundays',
                'status' => 'published',
                'is_featured' => true,
                'max_attendees' => null,
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Great Vespers - Saturday',
                'slug' => 'great-vespers-saturday-' . time(),
                'description' => 'Evening prayer service preparing us for the Sunday Divine Liturgy. A beautiful service of hymns, prayers, and scripture readings.',
                'event_date' => now()->next('Saturday'),
                'start_time' => '18:00',
                'end_time' => '19:00',
                'location' => 'Main Church Sanctuary',
                'event_type' => 'liturgy',
                'is_recurring' => true,
                'recurrence_pattern' => 'Weekly on Saturdays',
                'status' => 'published',
                'is_featured' => false,
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Wednesday Vespers',
                'slug' => 'wednesday-vespers-' . time(),
                'description' => 'Mid-week evening prayer service. A peaceful time for reflection and prayer in the middle of our busy week.',
                'event_date' => now()->next('Wednesday'),
                'start_time' => '18:30',
                'end_time' => '19:15',
                'location' => 'Main Church Sanctuary',
                'event_type' => 'liturgy',
                'is_recurring' => true,
                'recurrence_pattern' => 'Weekly on Wednesdays',
                'status' => 'published',
                'created_by' => $createdBy,
            ],

            // Educational Events
            [
                'title' => 'Orthodox Bible Study - Gospel of Matthew',
                'slug' => 'bible-study-matthew-' . time(),
                'description' => 'Join us for an in-depth study of the Gospel of Matthew with Orthodox commentary and discussion. All levels welcome.',
                'event_date' => now()->addDays(2),
                'start_time' => '19:00',
                'end_time' => '20:30',
                'location' => 'Parish Library',
                'event_type' => 'study',
                'is_recurring' => true,
                'recurrence_pattern' => 'Weekly on Tuesdays',
                'status' => 'published',
                'is_featured' => false,
                'max_attendees' => 25,
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Orthodox Theology Class - The Church Fathers',
                'slug' => 'theology-church-fathers-' . time(),
                'description' => 'Study the writings and teachings of the early Church Fathers including St. Basil, St. John Chrysostom, and St. Gregory the Theologian.',
                'event_date' => now()->addDays(4),
                'start_time' => '19:00',
                'end_time' => '21:00',
                'location' => 'Conference Room',
                'event_type' => 'study',
                'is_recurring' => true,
                'recurrence_pattern' => 'Weekly on Thursdays',
                'status' => 'published',
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Orthodox Spirituality Workshop',
                'slug' => 'spirituality-workshop-' . time(),
                'description' => 'Learn about Orthodox prayer, fasting, and spiritual disciplines. Practical guidance for deepening your spiritual life.',
                'event_date' => now()->addDays(10),
                'start_time' => '09:00',
                'end_time' => '12:00',
                'location' => 'Fellowship Hall',
                'event_type' => 'study',
                'is_recurring' => false,
                'status' => 'published',
                'is_featured' => true,
                'max_attendees' => 30,
                'created_by' => $createdBy,
            ],

            // Feast Days and Special Liturgies
            [
                'title' => 'Feast of the Nativity of the Theotokos',
                'slug' => 'nativity-theotokos-feast-' . time(),
                'description' => 'Celebrate the birth of the Most Holy Theotokos with Divine Liturgy, procession, and fellowship. One of the most joyful feasts of our Church.',
                'event_date' => now()->addDays(5),
                'start_time' => '09:00',
                'end_time' => '12:00',
                'location' => 'Main Church Sanctuary',
                'event_type' => 'feast',
                'is_recurring' => false,
                'status' => 'published',
                'is_featured' => true,
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Exaltation of the Holy Cross',
                'slug' => 'exaltation-holy-cross-' . time(),
                'description' => 'Commemorate the finding and exaltation of the Precious and Life-giving Cross. Special services with Cross procession.',
                'event_date' => now()->addDays(8),
                'start_time' => '08:00',
                'end_time' => '11:30',
                'location' => 'Main Church Sanctuary',
                'event_type' => 'feast',
                'is_recurring' => false,
                'status' => 'published',
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Protection of the Theotokos',
                'slug' => 'protection-theotokos-' . time(),
                'description' => 'Celebrate the intercession and protection of the Most Holy Theotokos. Divine Liturgy followed by Akathist to the Theotokos.',
                'event_date' => now()->addDays(15),
                'start_time' => '09:30',
                'end_time' => '12:30',
                'location' => 'Main Church Sanctuary',
                'event_type' => 'feast',
                'is_recurring' => false,
                'status' => 'published',
                'created_by' => $createdBy,
            ],

            // Social and Community Events
            [
                'title' => 'Parish Fellowship Coffee Hour',
                'slug' => 'fellowship-coffee-hour-' . time(),
                'description' => 'Join us for fellowship, coffee, and light refreshments after Divine Liturgy. A wonderful time to connect with fellow parishioners.',
                'event_date' => now()->next('Sunday'),
                'start_time' => '11:30',
                'end_time' => '13:00',
                'location' => 'Fellowship Hall',
                'event_type' => 'social',
                'is_recurring' => true,
                'recurrence_pattern' => 'Weekly on Sundays',
                'status' => 'published',
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Young Adults Group Meeting',
                'slug' => 'young-adults-meeting-' . time(),
                'description' => 'Fellowship, discussion, and activities for Orthodox Christians ages 18-35. This month\'s topic: "Orthodoxy in the Modern World".',
                'event_date' => now()->addDays(6),
                'start_time' => '19:00',
                'end_time' => '21:00',
                'location' => 'Youth Room',
                'event_type' => 'social',
                'is_recurring' => true,
                'recurrence_pattern' => 'Monthly on First Saturday',
                'status' => 'published',
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Annual Parish Picnic',
                'slug' => 'annual-parish-picnic-' . time(),
                'description' => 'Join us for our biggest social event of the year! Food, games, activities for all ages, and wonderful fellowship. Bring your family and friends!',
                'event_date' => now()->addDays(20),
                'start_time' => '11:00',
                'end_time' => '16:00',
                'location' => 'Riverside Park Pavilion',
                'event_type' => 'social',
                'is_recurring' => false,
                'status' => 'published',
                'is_featured' => true,
                'created_by' => $createdBy,
            ],

            // Service and Outreach Events
            [
                'title' => 'Community Food Drive',
                'slug' => 'community-food-drive-' . time(),
                'description' => 'Help us collect non-perishable food items for local families in need. Drop off donations at the church or volunteer to help distribute.',
                'event_date' => now()->addDays(12),
                'start_time' => '09:00',
                'end_time' => '15:00',
                'location' => 'Church Parking Lot',
                'event_type' => 'service',
                'is_recurring' => false,
                'status' => 'published',
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Visit to Nursing Home',
                'slug' => 'nursing-home-visit-' . time(),
                'description' => 'Bring comfort and joy to elderly residents at St. Mary\'s Nursing Home. We\'ll sing hymns, share prayers, and provide fellowship.',
                'event_date' => now()->addDays(18),
                'start_time' => '14:00',
                'end_time' => '16:00',
                'location' => 'St. Mary\'s Nursing Home',
                'event_type' => 'service',
                'is_recurring' => true,
                'recurrence_pattern' => 'Monthly on Third Saturday',
                'status' => 'published',
                'max_attendees' => 15,
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Orthodox Mission Trip Planning Meeting',
                'slug' => 'mission-trip-meeting-' . time(),
                'description' => 'Planning meeting for our upcoming mission trip to help Orthodox communities in need. Learn about opportunities to serve and make a difference.',
                'event_date' => now()->addDays(14),
                'start_time' => '19:00',
                'end_time' => '20:30',
                'location' => 'Conference Room',
                'event_type' => 'service',
                'is_recurring' => false,
                'status' => 'published',
                'created_by' => $createdBy,
            ],

            // Special Services
            [
                'title' => 'Memorial Service - Nicholas Family',
                'slug' => 'memorial-nicholas-family-' . time(),
                'description' => 'Memorial service for the Nicholas family. May their memory be eternal. All are invited to pray for the repose of their souls.',
                'event_date' => now()->addDays(7),
                'start_time' => '10:00',
                'end_time' => '11:00',
                'location' => 'Main Church Sanctuary',
                'event_type' => 'other',
                'is_recurring' => false,
                'status' => 'published',
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Wedding - Michael & Elena',
                'slug' => 'wedding-michael-elena-' . time(),
                'description' => 'Sacrament of Holy Matrimony for Michael Constantinou and Elena Petrov. All parishioners are invited to witness and celebrate this blessed union.',
                'event_date' => now()->addDays(25),
                'start_time' => '15:00',
                'end_time' => '17:00',
                'location' => 'Main Church Sanctuary',
                'event_type' => 'other',
                'is_recurring' => false,
                'status' => 'published',
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Baptism - Baby Alexander',
                'slug' => 'baptism-alexander-' . time(),
                'description' => 'Holy Baptism and Chrismation of baby Alexander, son of John and Maria. Welcome this little one into the Orthodox faith!',
                'event_date' => now()->addDays(9),
                'start_time' => '12:00',
                'end_time' => '13:00',
                'location' => 'Main Church Sanctuary',
                'event_type' => 'other',
                'is_recurring' => false,
                'status' => 'published',
                'created_by' => $createdBy,
            ],

            // Future Events
            [
                'title' => 'Lenten Retreat - Journey to Pascha',
                'slug' => 'lenten-retreat-' . time(),
                'description' => 'Annual Lenten retreat with guest speaker Father Gregory. Theme: "Preparing Our Hearts for the Resurrection". Registration required.',
                'event_date' => now()->addDays(45),
                'start_time' => '09:00',
                'end_time' => '16:00',
                'location' => 'Retreat Center',
                'event_type' => 'study',
                'is_recurring' => false,
                'status' => 'published',
                'is_featured' => true,
                'max_attendees' => 50,
                'created_by' => $createdBy,
            ],
            [
                'title' => 'Orthodox Youth Conference',
                'slug' => 'youth-conference-' . time(),
                'description' => 'Regional Orthodox Youth Conference for ages 12-18. Workshops, fellowship, and spiritual growth. Transportation provided.',
                'event_date' => now()->addDays(60),
                'start_time' => '08:00',
                'end_time' => '18:00',
                'location' => 'Metropolis Center',
                'event_type' => 'social',
                'is_recurring' => false,
                'status' => 'published',
                'max_attendees' => 20,
                'created_by' => $createdBy,
            ],
        ];

        foreach ($events as $eventData) {
            Event::create($eventData);
        }

        $this->command->info('Comprehensive events seeded successfully!');
        $this->command->info('Created ' . count($events) . ' events including liturgies, feasts, studies, and social events');
    }
}
