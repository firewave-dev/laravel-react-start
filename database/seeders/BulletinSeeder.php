<?php

namespace Database\Seeders;

use App\Models\Bulletin;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BulletinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@church.com')->first();
        $postedBy = $admin?->id ?? 1;

        $bulletins = [
            [
                'title' => 'Divine Liturgy Schedule Change',
                'message' => "Please note: This Sunday's Divine Liturgy will begin at 9:30 AM instead of the usual 10:00 AM due to a special feast day celebration.\n\nVespers will follow at 6:00 PM as usual.",
                'priority' => 'high',
                'type' => 'announcement',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(3),
                'is_pinned' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Prayer Request: Brother Michael',
                'message' => "Please keep Brother Michael in your prayers as he undergoes surgery this week. May the Lord grant him healing and a swift recovery.\n\nCards and messages can be sent to the church office.",
                'priority' => 'normal',
                'type' => 'prayer_request',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(7),
                'is_pinned' => false,
                'status' => 'active',
            ],
            [
                'title' => 'Parish Potluck This Sunday',
                'message' => "Join us for fellowship and food after Divine Liturgy this Sunday!\n\nPlease bring a dish to share. Main course, sides, and desserts all welcome. We'll gather in the Fellowship Hall around 12:30 PM.",
                'priority' => 'normal',
                'type' => 'event_notice',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(2),
                'is_pinned' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Church Office Hours Update',
                'message' => "Starting next week, the church office will be open:\n\nMonday - Friday: 9:00 AM - 3:00 PM\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed (available after Liturgy)\n\nFor emergencies, please call Father Michael directly.",
                'priority' => 'normal',
                'type' => 'general',
                'posted_by' => $postedBy,
                'expires_at' => null,
                'is_pinned' => false,
                'status' => 'active',
            ],
            [
                'title' => 'URGENT: Weather Alert',
                'message' => "Due to severe weather forecast, tonight's Bible Study has been CANCELLED.\n\nWe will resume next week at the regular time. Stay safe everyone!",
                'priority' => 'high',
                'type' => 'urgent',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(1),
                'is_pinned' => true,
                'status' => 'active',
            ],
        ];

        foreach ($bulletins as $bulletinData) {
            Bulletin::create($bulletinData);
        }

        $this->command->info('Bulletins seeded successfully!');
    }
}
