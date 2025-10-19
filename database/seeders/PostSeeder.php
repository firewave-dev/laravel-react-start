<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@church.com')->first();
        $authorId = $admin?->id ?? 1;

        $posts = [
            [
                'title' => 'Celebration of the Theotokos Feast Day',
                'slug' => Str::slug('Celebration of the Theotokos Feast Day'),
                'excerpt' => 'Join us in celebrating the Dormition of the Mother of God with Divine Liturgy and fellowship.',
                'content' => "Dear Beloved in Christ,\n\nWe invite you to join us for the celebration of the Dormition of the Theotokos, one of the most significant feasts in the Orthodox Church calendar. The feast commemorates the repose and translation of the Mother of God.\n\nThe Divine Liturgy will be celebrated on August 15th, followed by a procession and fellowship meal. This is a time for our community to come together in prayer and thanksgiving for the intercessions of the Theotokos.\n\nMay the Mother of God intercede for us all.\n\nIn Christ,\nFather John",
                'author_id' => $authorId,
                'category' => 'saint_day',
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'is_featured' => true,
                'views_count' => 45,
            ],
            [
                'title' => 'New Bible Study Series Begins',
                'slug' => Str::slug('New Bible Study Series Begins'),
                'excerpt' => 'Starting this Tuesday, we will begin an in-depth study of the Gospel of John.',
                'content' => "Brothers and Sisters,\n\nWe are excited to announce a new Bible Study series beginning this Tuesday evening at 7:00 PM. We will be exploring the Gospel of John, diving deep into the profound theology and spiritual wisdom of this beloved Gospel.\n\nThe study will meet weekly on Tuesday evenings in the Parish Library. All are welcome, regardless of your level of biblical knowledge. We will provide study materials and refreshments.\n\nTopics will include:\n- The Logos and Creation\n- The Seven Signs\n- The I AM statements\n- The Passion narrative\n\nPlease bring your Bible and an open heart. See you there!\n\nIn Christ's love,\nThe Education Committee",
                'author_id' => $authorId,
                'category' => 'announcement',
                'status' => 'published',
                'published_at' => now()->subDays(3),
                'is_featured' => true,
                'views_count' => 67,
            ],
            [
                'title' => 'Reflection on Prayer and Fasting',
                'slug' => Str::slug('Reflection on Prayer and Fasting'),
                'excerpt' => 'Understanding the spiritual discipline of prayer and fasting in Orthodox tradition.',
                'content' => "Prayer and fasting are inseparable companions in the Orthodox Christian life. They are not burdens, but gifts that draw us closer to God.\n\nWhen we fast, we deny ourselves not because the physical is evil, but to remind ourselves that we do not live by bread alone. Fasting teaches us discipline, self-control, and dependence on God rather than on material sustenance.\n\nPrayer, on the other hand, is our constant conversation with God. It is not merely asking for things, but communion - being in the presence of the Divine.\n\nTogether, prayer and fasting transform us. They humble us, purify our hearts, and open us to receive God's grace. They are not rules to follow, but means by which we participate more fully in the life of Christ.\n\nLet us embrace these spiritual disciplines with joy, knowing that through them, we grow in holiness and draw nearer to our loving Father.\n\nMay God bless your spiritual journey.",
                'author_id' => $authorId,
                'category' => 'reflection',
                'status' => 'published',
                'published_at' => now()->subDays(7),
                'is_featured' => false,
                'views_count' => 89,
            ],
            [
                'title' => 'Parish Cleanup Day - Volunteers Needed',
                'slug' => Str::slug('Parish Cleanup Day - Volunteers Needed'),
                'excerpt' => 'Help us prepare the church grounds for the upcoming feast celebrations.',
                'content' => "Dear Parishioners,\n\nWe are organizing a Parish Cleanup Day on Saturday morning and need volunteers!\n\nWe will be:\n- Cleaning the church interior\n- Tidying the grounds\n- Organizing the fellowship hall\n- Preparing decorations for upcoming feast\n\nPlease bring gloves and cleaning supplies if you can. We will provide lunch for all volunteers.\n\nTime: Saturday, 9:00 AM - 1:00 PM\nMeet at: Church entrance\n\nMany hands make light work! Your help is greatly appreciated.\n\nThank you,\nParish Council",
                'author_id' => $authorId,
                'category' => 'announcement',
                'status' => 'published',
                'published_at' => now()->subDays(2),
                'is_featured' => false,
                'views_count' => 34,
            ],
            [
                'title' => 'Understanding the Divine Liturgy',
                'slug' => Str::slug('Understanding the Divine Liturgy'),
                'excerpt' => 'A guide to the structure and meaning of the Orthodox Divine Liturgy.',
                'content' => "The Divine Liturgy is the heart of Orthodox Christian worship. It is not simply a service we attend, but a participation in heavenly worship, where earth meets heaven.\n\nThe Liturgy has three main parts:\n\n1. The Proskomedia - The preparation of the gifts\n2. The Liturgy of the Word - Scripture readings and the Gospel\n3. The Liturgy of the Faithful - The Eucharistic prayer and Holy Communion\n\nEach action, each prayer, each movement has deep theological significance. The incense represents our prayers rising to God. The icons surround us with the cloud of witnesses. The Eucharist is truly the Body and Blood of Christ.\n\nWhen we participate in the Divine Liturgy, we are not merely observers. We are active participants in the most profound mystery - the offering of Christ to the Father and our communion with God.\n\nCome to Liturgy not as spectators, but as worshippers, ready to offer yourselves along with the gifts on the altar.\n\nBlessed Liturgy to all!",
                'author_id' => $authorId,
                'category' => 'teaching',
                'status' => 'published',
                'published_at' => now()->subDays(10),
                'is_featured' => false,
                'views_count' => 112,
            ],
            [
                'title' => 'Upcoming Lenten Retreat',
                'slug' => Str::slug('Upcoming Lenten Retreat'),
                'excerpt' => 'Save the date for our annual Lenten Retreat with special guest speaker.',
                'content' => "Mark your calendars! Our annual Lenten Retreat will be held next month.\n\nThis year's theme: 'Journey to Pascha - Preparing Our Hearts'\n\nThe retreat will include:\n- Keynote presentations\n- Small group discussions\n- Prayer services\n- Time for personal reflection\n- Fellowship meals\n\nOur guest speaker will be Father Michael from Holy Trinity Monastery. Registration details coming soon.\n\nThis is a wonderful opportunity to deepen your faith during the Lenten season.",
                'author_id' => $authorId,
                'category' => 'news',
                'status' => 'draft',
                'published_at' => null,
                'is_featured' => false,
                'views_count' => 0,
            ],
        ];

        foreach ($posts as $postData) {
            Post::create($postData);
        }

        $this->command->info('Blog posts seeded successfully!');
    }
}
