<?php

namespace Database\Seeders;

use App\Models\Bulletin;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ComprehensiveBulletinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@church.com')->first();
        $postedBy = $admin?->id ?? 1;

        $bulletins = [
            // High Priority Announcements
            [
                'title' => 'URGENT: Special Divine Liturgy Schedule Change',
                'message' => "IMPORTANT NOTICE: Due to the Feast of the Nativity of the Theotokos, this Sunday's Divine Liturgy will begin at 8:30 AM instead of the usual 9:30 AM.\n\nPlease arrive early to ensure you don't miss this beautiful feast day celebration. Vespers will be held on Saturday at 6:00 PM.\n\nFollowing the Divine Liturgy, we will have a procession around the church with the icon of the Nativity of the Theotokos, followed by fellowship and refreshments in the parish hall.\n\nMay the Most Holy Theotokos intercede for us all!",
                'priority' => 'high',
                'type' => 'urgent',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(2),
                'is_pinned' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Weather Alert - Service Cancellation',
                'message' => "Due to severe weather forecast including heavy snow and dangerous road conditions, tonight's Bible Study (7:00 PM) and tomorrow morning's Matins (8:00 AM) have been CANCELLED.\n\nDivine Liturgy on Sunday will proceed as scheduled unless conditions worsen. Please check our website or call the church office for updates.\n\nStay safe and warm, everyone. May God protect us all from harm.",
                'priority' => 'high',
                'type' => 'urgent',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(1),
                'is_pinned' => true,
                'status' => 'active',
            ],

            // Prayer Requests
            [
                'title' => 'Prayer Request: Brother Michael - Surgery',
                'message' => "Please keep Brother Michael in your prayers as he undergoes heart surgery this Thursday. The surgery is scheduled for 8:00 AM and is expected to last 4-6 hours.\n\nMay the Lord grant the doctors wisdom and skill, and may He grant Brother Michael healing, strength, and a swift recovery.\n\nCards, flowers, and messages can be sent to:\nSt. Mary's Hospital, Room 315\n123 Medical Center Drive\n\nOr dropped off at the church office.\n\nLet us lift up Brother Michael and his family in prayer during this difficult time.",
                'priority' => 'normal',
                'type' => 'prayer_request',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(7),
                'is_pinned' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Prayer Request: The Johnson Family',
                'message' => "Please pray for the Johnson family during their time of grief. Mrs. Johnson's mother, Maria, fell asleep in the Lord last week after a long illness.\n\nMay her memory be eternal, and may the Lord grant comfort and peace to her family and friends.\n\nThe funeral service will be held at our church on Saturday at 11:00 AM, followed by burial at St. Nicholas Cemetery.\n\nAll parishioners are invited to attend and offer their prayers for the repose of Maria's soul.",
                'priority' => 'normal',
                'type' => 'prayer_request',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(10),
                'is_pinned' => false,
                'status' => 'active',
            ],
            [
                'title' => 'Prayer Request: Missionaries in Africa',
                'message' => "Please remember in your prayers Father Nicholas and Presvytera Elena, our parish missionaries serving in Kenya. They are facing challenges with the local community and need our spiritual support.\n\nPray for:\n- Their safety and health\n- Success in their missionary work\n- Open hearts among the people they serve\n- Financial support for their ministry\n- Strength and encouragement in difficult times\n\nLetters of encouragement can be sent through the church office. Let us support our missionaries with prayer and love.",
                'priority' => 'normal',
                'type' => 'prayer_request',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(14),
                'is_pinned' => false,
                'status' => 'active',
            ],

            // Event Notices
            [
                'title' => 'Parish Potluck This Sunday - Bring a Dish!',
                'message' => "Join us for fellowship and delicious food after Divine Liturgy this Sunday!\n\nWe're asking everyone to bring a dish to share:\n- Main courses (casseroles, roasted meats, vegetarian options)\n- Side dishes (salads, vegetables, breads)\n- Desserts (cakes, cookies, traditional pastries)\n- Drinks (juices, soft drinks)\n\nWe'll gather in the Fellowship Hall around 12:30 PM. This is a wonderful opportunity to share in fellowship and enjoy the diverse culinary talents of our parish family.\n\nPlease let us know what you plan to bring by signing up on the sheet in the fellowship hall or calling Maria at (555) 123-4567.\n\nLooking forward to seeing everyone there!",
                'priority' => 'normal',
                'type' => 'event_notice',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(3),
                'is_pinned' => true,
                'status' => 'active',
            ],
            [
                'title' => 'Annual Parish Meeting - All Members Invited',
                'message' => "Our Annual Parish Meeting will be held on Sunday, October 15th, immediately following Divine Liturgy in the Fellowship Hall.\n\nImportant topics to be discussed:\n- Annual financial report and budget\n- Election of new Parish Council members\n- Upcoming building maintenance projects\n- Plans for next year's programs and events\n- Community outreach initiatives\n\nAll parish members are encouraged to attend and participate. Your input and voice matter in the governance of our parish.\n\nLight lunch will be provided. Please RSVP to the church office by October 10th.\n\nLet us work together to build up our parish community!",
                'priority' => 'normal',
                'type' => 'event_notice',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(21),
                'is_pinned' => false,
                'status' => 'active',
            ],
            [
                'title' => 'Orthodox Education Registration - Limited Time!',
                'message' => "Registration for our Orthodox Education Program is now open, but spaces are filling up quickly!\n\nPrograms available:\n- Sunday School (ages 3-18)\n- Adult Bible Study\n- Orthodox Theology Classes\n- Newcomers Class\n\nRegistration deadline is September 1st. Cost is $25 per child (adult classes are free). Scholarships are available for families in need.\n\nDon't miss this opportunity to deepen your faith and that of your children. Pick up registration forms at the church office or download from our website.\n\nQuestions? Contact our Education Director, Mrs. Elena Constantinou, at (555) 987-6543.\n\nInvest in your spiritual future today!",
                'priority' => 'normal',
                'type' => 'event_notice',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(10),
                'is_pinned' => false,
                'status' => 'active',
            ],

            // General Announcements
            [
                'title' => 'Church Office Hours Update',
                'message' => "Starting Monday, September 4th, the church office will have new hours:\n\nRegular Hours:\nMonday - Friday: 9:00 AM - 3:00 PM\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed (available after Divine Liturgy)\n\nSummer Hours (July - August):\nMonday - Thursday: 10:00 AM - 2:00 PM\nFriday: 10:00 AM - 1:00 PM\nSaturday & Sunday: Closed\n\nFor emergencies or urgent matters outside office hours, please call Father Michael directly at (555) 234-5678.\n\nThank you for your understanding as we adjust our schedule to better serve our parish community.",
                'priority' => 'normal',
                'type' => 'general',
                'posted_by' => $postedBy,
                'expires_at' => null,
                'is_pinned' => false,
                'status' => 'active',
            ],
            [
                'title' => 'New Parish Library Now Open!',
                'message' => "We are excited to announce the opening of our newly expanded parish library! Located in the renovated space next to the fellowship hall, our library now contains over 500 books covering:\n\n- Orthodox theology and doctrine\n- Lives of saints and Church history\n- Spiritual guidance and prayer books\n- Children's Orthodox literature\n- Audio and video materials\n\nLibrary hours:\n- Sundays: After Divine Liturgy until 1:00 PM\n- Tuesdays: 6:00 PM - 8:00 PM (during Bible Study)\n- Wednesdays: 5:00 PM - 7:00 PM (during Vespers)\n- Saturdays: 10:00 AM - 12:00 PM\n\nBorrowing is free for all parishioners. Books can be kept for 3 weeks. No late fees, but please return books promptly.\n\nCome explore the riches of Orthodox literature!",
                'priority' => 'normal',
                'type' => 'general',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(30),
                'is_pinned' => false,
                'status' => 'active',
            ],
            [
                'title' => 'Volunteer Opportunities - Help Needed!',
                'message' => "Our parish thrives through the dedication and service of volunteers. We have several opportunities for you to serve:\n\nImmediate Needs:\n- Sunday School teachers (training provided)\n- Fellowship hall setup and cleanup\n- Church grounds maintenance\n- Office assistance (filing, phone calls)\n- Transportation for elderly parishioners\n\nOngoing Opportunities:\n- Choir members (no experience necessary)\n- Altar servers (men and boys)\n- Coffee hour hosts\n- Library volunteers\n- Community outreach team\n\nEven an hour or two of your time can make a big difference! Please sign up on the volunteer sheet in the fellowship hall or contact Maria at (555) 123-4567.\n\n'For even the Son of Man did not come to be served, but to serve' (Mark 10:45)",
                'priority' => 'normal',
                'type' => 'general',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(45),
                'is_pinned' => false,
                'status' => 'active',
            ],

            // Community Outreach
            [
                'title' => 'Community Food Drive - Help Feed the Hungry',
                'message' => "Our annual Community Food Drive begins this Sunday and continues for two weeks. We are collecting non-perishable food items for local families in need.\n\nMost needed items:\n- Canned vegetables and fruits\n- Pasta and rice\n- Canned meats and fish\n- Peanut butter and jelly\n- Baby food and formula\n- Cereal and oatmeal\n- Soup and stew\n\nDrop-off locations:\n- Church lobby (collection boxes)\n- Fellowship hall (large donations)\n- Contact John at (555) 456-7890 for pickup\n\nOur goal is to collect 1,000 items to help 50 families. Last year we exceeded our goal - let's do it again!\n\n'For I was hungry and you gave me food' (Matthew 25:35)",
                'priority' => 'normal',
                'type' => 'general',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(14),
                'is_pinned' => false,
                'status' => 'active',
            ],
            [
                'title' => 'Orthodox Mission Trip - Sign Up Now!',
                'message' => "We are organizing a mission trip to help Orthodox communities in need. This is a life-changing opportunity to serve others and grow in faith.\n\nTrip Details:\n- Destination: Orthodox orphanage in Romania\n- Dates: November 15-22 (8 days)\n- Cost: $1,200 (includes airfare, lodging, meals)\n- Activities: Teaching, construction, medical assistance\n- Group size: Limited to 12 participants\n\nRequirements:\n- Must be 18 or older (or accompanied by parent)\n- Passport required\n- Basic medical checkup\n- Fundraising participation\n\nInformation meeting: Sunday, September 10th at 12:30 PM in the Conference Room.\n\nDeadline to apply: September 20th. Contact Father Michael for application forms.\n\n'Go therefore and make disciples of all nations' (Matthew 28:19)",
                'priority' => 'normal',
                'type' => 'general',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(20),
                'is_pinned' => false,
                'status' => 'active',
            ],

            // Special Services
            [
                'title' => 'Memorial Service - 40 Days for Nicholas Family',
                'message' => "Please join us for the 40-day memorial service for the Nicholas family. This is a traditional Orthodox service to remember and pray for the departed souls.\n\nService Details:\n- Date: Saturday, September 16th\n- Time: 10:00 AM\n- Location: Main Church Sanctuary\n- Followed by: Fellowship and memorial meal\n\nMemorial donations can be made to:\n- Orthodox Relief Fund\n- Local Food Bank\n- Church Building Fund\n\nAll parishioners are invited to attend and offer their prayers. May their memory be eternal!\n\nKoliva (memorial wheat) will be provided. If you would like to help prepare or bring additional food for the memorial meal, please contact Elena at (555) 789-0123.",
                'priority' => 'normal',
                'type' => 'general',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(12),
                'is_pinned' => false,
                'status' => 'active',
            ],
            [
                'title' => 'Wedding Announcement - Michael & Elena',
                'message' => "We joyfully announce the upcoming wedding of Michael Constantinou and Elena Petrov!\n\nWedding Details:\n- Date: Saturday, October 28th\n- Time: 3:00 PM\n- Location: Main Church Sanctuary\n- Reception: Fellowship Hall (5:00 PM)\n\nAll parishioners are invited to witness and celebrate this blessed union. Your presence and prayers are requested.\n\nGift registry information is available at the church office. Monetary gifts can be made to help the couple start their new life together.\n\nPlease RSVP by October 15th to help us plan for the reception. Contact Maria at (555) 123-4567 or sign up in the fellowship hall.\n\nMay God grant them many years of happiness together!",
                'priority' => 'normal',
                'type' => 'general',
                'posted_by' => $postedBy,
                'expires_at' => now()->addDays(35),
                'is_pinned' => false,
                'status' => 'active',
            ],
        ];

        foreach ($bulletins as $bulletinData) {
            Bulletin::create($bulletinData);
        }

        $this->command->info('Comprehensive bulletins seeded successfully!');
        $this->command->info('Created ' . count($bulletins) . ' bulletins including announcements, prayer requests, and community notices');
    }
}
