<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ComprehensivePostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@church.com')->first();
        $authorId = $admin?->id ?? 1;

        $posts = [
            // Featured Saint Day Posts
            [
                'title' => 'Celebration of the Nativity of the Theotokos',
                'slug' => 'nativity-theotokos-' . time(),
                'excerpt' => 'Join us in celebrating the birth of the Mother of God, a day of great joy for all Orthodox Christians.',
                'content' => '<h2>The Nativity of the Most Holy Theotokos</h2>
                <p>Dear Beloved in Christ,</p>
                <p>On September 8th, we celebrate one of the most joyful feasts of our Orthodox Church - the Nativity of the Most Holy Theotokos. This sacred day marks the beginning of our salvation history, as the Virgin Mary, chosen by God to be the Mother of our Lord Jesus Christ, was born to the righteous Joachim and Anna.</p>
                <p>This feast reminds us that God works through human history to fulfill His divine plan. The birth of the Theotokos was the preparation for the Incarnation of our Savior, and through her, all of humanity received the gift of salvation.</p>
                <p><strong>Divine Liturgy Schedule:</strong></p>
                <ul>
                    <li>Vespers: September 7th at 6:00 PM</li>
                    <li>Matins: September 8th at 8:00 AM</li>
                    <li>Divine Liturgy: September 8th at 9:30 AM</li>
                </ul>
                <p>Following the Divine Liturgy, we will have a procession around the church with the icon of the Nativity of the Theotokos, followed by fellowship and refreshments in the parish hall.</p>
                <p>May the Most Holy Theotokos intercede for us all and guide us closer to her Son, our Lord Jesus Christ.</p>
                <p>With love in Christ,<br>Father Michael</p>',
                'author_id' => $authorId,
                'category' => 'saint_day',
                'status' => 'published',
                'published_at' => now()->subDays(2),
                'is_featured' => true,
                'views_count' => 156,
            ],
            [
                'title' => 'The Feast of the Exaltation of the Holy Cross',
                'slug' => 'exaltation-holy-cross-' . time(),
                'excerpt' => 'Commemorating the finding and exaltation of the Precious and Life-giving Cross of our Lord.',
                'content' => '<h2>September 14th: The Universal Exaltation of the Precious and Life-giving Cross</h2>
                <p>Brothers and Sisters in Christ,</p>
                <p>On September 14th, we commemorate the Universal Exaltation of the Precious and Life-giving Cross of our Lord Jesus Christ. This great feast celebrates two historical events: the finding of the True Cross by Saint Helen, mother of Emperor Constantine, and its recovery from the Persians by Emperor Heraclius.</p>
                <p>The Cross, which was once an instrument of death, has become through Christ\'s Resurrection the symbol of life, victory, and salvation. As we venerate the Cross during this feast, we are reminded of the great love God has for us and the price that was paid for our redemption.</p>
                <p><strong>Special Services:</strong></p>
                <ul>
                    <li>Vespers with Cross Procession: September 13th at 6:00 PM</li>
                    <li>Matins with Cross Exaltation: September 14th at 8:00 AM</li>
                    <li>Divine Liturgy: September 14th at 9:30 AM</li>
                </ul>
                <p>This is a day of strict fast, as we remember the suffering of our Lord on the Cross. Let us approach this feast with reverence and thanksgiving for the gift of salvation.</p>
                <p>In the Cross is salvation, in the Cross is life, in the Cross is protection from enemies.</p>
                <p>With prayers,<br>Father John</p>',
                'author_id' => $authorId,
                'category' => 'saint_day',
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'is_featured' => true,
                'views_count' => 203,
            ],

            // Teaching Posts
            [
                'title' => 'The Meaning of Orthodox Icons',
                'slug' => 'meaning-orthodox-icons-' . time(),
                'excerpt' => 'Understanding the theological and spiritual significance of icons in Orthodox Christian worship and prayer.',
                'content' => '<h2>Theology of Icons in Orthodox Christianity</h2>
                <p>Icons are not mere decorations in Orthodox churches; they are windows to heaven, connecting us with the divine reality they represent. The theology of icons is deeply rooted in the Incarnation of Christ and the Orthodox understanding of the relationship between the visible and invisible worlds.</p>
                
                <h3>Why Do We Venerate Icons?</h3>
                <p>The veneration of icons is based on the fundamental Christian belief in the Incarnation. When God became man in the person of Jesus Christ, He made the invisible God visible. This means that it is not only possible but appropriate to depict the divine in human form.</p>
                
                <p>As Saint John of Damascus wrote: "I do not worship matter; I worship the Creator of matter who became matter for my sake, who willed to take His abode in matter; who worked out my salvation through matter."</p>
                
                <h3>The Icon as Prayer</h3>
                <p>When we stand before an icon, we are not simply looking at a picture. We are engaging in prayer, entering into communion with the person or event depicted. The icon serves as a focal point for our prayer, helping us to concentrate our minds and hearts on God.</p>
                
                <h3>Common Orthodox Icons</h3>
                <ul>
                    <li><strong>Christ Pantocrator:</strong> Christ as ruler of all, showing His divine and human natures</li>
                    <li><strong>Theotokos (Mother of God):</strong> Various types showing the Virgin Mary with Christ</li>
                    <li><strong>Saints:</strong> Holy men and women who have achieved union with God</li>
                    <li><strong>Feast Day Icons:</strong> Depicting events from the life of Christ and the Church</li>
                </ul>
                
                <p>Next week, we will continue our study with a closer look at the iconography of the Nativity and how it teaches us about the Incarnation.</p>
                <p>May God bless our study and help us to grow in understanding and love for the Orthodox faith.</p>
                <p>In Christ,<br>Father Michael</p>',
                'author_id' => $authorId,
                'category' => 'teaching',
                'status' => 'published',
                'published_at' => now()->subDays(8),
                'is_featured' => false,
                'views_count' => 187,
            ],
            [
                'title' => 'Understanding the Divine Liturgy: Part I',
                'slug' => 'divine-liturgy-part-1-' . time(),
                'excerpt' => 'A comprehensive guide to the structure and meaning of the Orthodox Divine Liturgy.',
                'content' => '<h2>The Divine Liturgy: Heaven on Earth</h2>
                <p>The Divine Liturgy is the heart of Orthodox Christian worship. It is not merely a service we attend, but a participation in heavenly worship where earth meets heaven in the most profound way possible.</p>
                
                <h3>The Three Parts of the Divine Liturgy</h3>
                
                <h4>1. The Proskomedia (Preparation)</h4>
                <p>Before the visible service begins, the priest prepares the gifts of bread and wine at the Prothesis table. This preparation symbolizes the birth, baptism, and death of Christ. The priest takes a portion of the prosphora (bread) and places it on the paten, while wine and water are poured into the chalice.</p>
                
                <h4>2. The Liturgy of the Word (Liturgy of the Catechumens)</h4>
                <p>This part of the service includes:</p>
                <ul>
                    <li><strong>Great Litany:</strong> Prayers for the peace of the world and the Church</li>
                    <li><strong>Antiphons:</strong> Psalms sung with refrains</li>
                    <li><strong>Little Entrance:</strong> The Gospel book is carried in procession</li>
                    <li><strong>Scripture Readings:</strong> Epistle and Gospel lessons</li>
                    <li><strong>Sermon:</strong> Explanation of the readings</li>
                </ul>
                
                <h4>3. The Liturgy of the Faithful</h4>
                <p>This is the most sacred part, reserved for baptized Orthodox Christians:</p>
                <ul>
                    <li><strong>Great Entrance:</strong> The gifts are brought to the altar</li>
                    <li><strong>Creed:</strong> We proclaim our faith</li>
                    <li><strong>Anaphora:</strong> The Eucharistic prayer where bread and wine become the Body and Blood of Christ</li>
                    <li><strong>Holy Communion:</strong> Receiving the precious gifts</li>
                    <li><strong>Dismissal:</strong> Being sent forth to serve God in the world</li>
                </ul>
                
                <p>In our next installment, we will explore the meaning of the Anaphora and the transformation of the gifts.</p>
                <p>May God bless our understanding and participation in this most sacred mystery.</p>
                <p>With love in Christ,<br>Father John</p>',
                'author_id' => $authorId,
                'category' => 'teaching',
                'status' => 'published',
                'published_at' => now()->subDays(12),
                'is_featured' => false,
                'views_count' => 234,
            ],

            // Reflection Posts
            [
                'title' => 'The Journey of Lent: Preparation for Pascha',
                'slug' => 'journey-lent-preparation-' . time(),
                'excerpt' => 'Reflecting on the spiritual discipline and joy of the Great Fast as we prepare for the Resurrection.',
                'content' => '<h2>The Great Lent: A Time of Spiritual Renewal</h2>
                <p>As we enter the season of Great Lent, we are called to embark on a spiritual journey that will transform us and prepare our hearts to receive the joy of Pascha (Easter). This is not a time of mere fasting from food, but a comprehensive fast that encompasses every aspect of our lives.</p>
                
                <h3>The Purpose of Lent</h3>
                <p>Lent is not about punishment or deprivation for its own sake. It is about:</p>
                <ul>
                    <li><strong>Repentance:</strong> Turning away from sin and toward God</li>
                    <li><strong>Self-examination:</strong> Looking honestly at our spiritual state</li>
                    <li><strong>Prayer:</strong> Deepening our relationship with God</li>
                    <li><strong>Almsgiving:</strong> Caring for those in need</li>
                    <li><strong>Preparation:</strong> Getting ready to celebrate the Resurrection</li>
                </ul>
                
                <h3>The Lenten Fast</h3>
                <p>The Orthodox fast during Lent includes:</p>
                <ul>
                    <li>Abstaining from meat, dairy, fish, wine, and oil</li>
                    <li>Eating simpler, plainer foods</li>
                    <li>Reducing the quantity of food we consume</li>
                    <li>Focusing on spiritual rather than physical nourishment</li>
                </ul>
                
                <h3>Beyond Food: The Complete Fast</h3>
                <p>True Lenten discipline extends far beyond what we eat:</p>
                <ul>
                    <li><strong>Fast from anger and resentment</strong></li>
                    <li><strong>Fast from gossip and idle talk</strong></li>
                    <li><strong>Fast from excessive entertainment</strong></li>
                    <li><strong>Fast from material distractions</strong></li>
                    <li><strong>Fast from pride and judgment</strong></li>
                </ul>
                
                <h3>The Joy of Lent</h3>
                <p>Contrary to popular belief, Lent is not a sad or gloomy time. It is a time of spiritual joy, as we draw closer to God and experience His grace in our lives. The Church calls it "bright sadness" - a time when we mourn our sins while rejoicing in God\'s mercy.</p>
                
                <p>Let us embrace this holy season with enthusiasm and commitment, knowing that through our Lenten discipline, we will emerge spiritually renewed and ready to celebrate the Resurrection with pure hearts.</p>
                <p>May God bless our Lenten journey!</p>
                <p>With prayers for a blessed Lent,<br>Father Michael</p>',
                'author_id' => $authorId,
                'category' => 'reflection',
                'status' => 'published',
                'published_at' => now()->subDays(15),
                'is_featured' => false,
                'views_count' => 298,
            ],

            // News Posts
            [
                'title' => 'New Parish Library Opens',
                'slug' => 'new-parish-library-' . time(),
                'excerpt' => 'Our expanded parish library is now open with hundreds of Orthodox books, videos, and study materials.',
                'content' => '<h2>Welcome to Our New Parish Library!</h2>
                <p>We are delighted to announce the opening of our newly expanded parish library, located in the renovated space adjacent to the fellowship hall. This beautiful new facility represents a significant investment in the spiritual education and growth of our parish family.</p>
                
                <h3>What\'s Available</h3>
                <p>Our library now contains over 500 books covering:</p>
                <ul>
                    <li><strong>Theology and Doctrine:</strong> Works by the Church Fathers and contemporary Orthodox theologians</li>
                    <li><strong>Spirituality:</strong> Books on prayer, fasting, and the spiritual life</li>
                    <li><strong>Church History:</strong> From the early Church to modern times</li>
                    <li><strong>Lives of Saints:</strong> Biographies and hagiographies</li>
                    <li><strong>Children\'s Books:</strong> Orthodox stories and teachings for young readers</li>
                    <li><strong>Audio/Video Materials:</strong> Lectures, documentaries, and music</li>
                </ul>
                
                <h3>Library Hours</h3>
                <ul>
                    <li><strong>Sundays:</strong> After Divine Liturgy until 1:00 PM</li>
                    <li><strong>Tuesdays:</strong> 6:00 PM - 8:00 PM (during Bible Study)</li>
                    <li><strong>Wednesdays:</strong> 5:00 PM - 7:00 PM (during Vespers)</li>
                    <li><strong>Saturdays:</strong> 10:00 AM - 12:00 PM</li>
                </ul>
                
                <h3>How to Borrow Books</h3>
                <p>Borrowing is simple and free for all parishioners:</p>
                <ol>
                    <li>Fill out the borrowing form at the library desk</li>
                    <li>Books can be kept for 3 weeks</li>
                    <li>Return books in the designated return box</li>
                    <li>No late fees, but please return books promptly for others to enjoy</li>
                </ol>
                
                <p>Special thanks to the Library Committee and all volunteers who made this project possible. We especially thank Mrs. Maria Petrov for her generous donation of books and her tireless work in organizing the collection.</p>
                
                <p>Come and explore the riches of Orthodox literature and deepen your faith through reading!</p>
                <p>Blessings,<br>The Parish Council</p>',
                'author_id' => $authorId,
                'category' => 'news',
                'status' => 'published',
                'published_at' => now()->subDays(3),
                'is_featured' => true,
                'views_count' => 145,
            ],
            [
                'title' => 'Annual Parish Picnic: A Day of Joy and Fellowship',
                'slug' => 'annual-parish-picnic-' . time(),
                'excerpt' => 'Join us for our annual parish picnic with games, food, and fellowship for the whole family.',
                'content' => '<h2>Annual Parish Picnic - Save the Date!</h2>
                <p>Mark your calendars for our most anticipated annual event - the Parish Picnic! This year\'s celebration promises to be bigger and better than ever, with activities for all ages and plenty of delicious food and fellowship.</p>
                
                <h3>Event Details</h3>
                <ul>
                    <li><strong>Date:</strong> Saturday, June 15th</li>
                    <li><strong>Time:</strong> 11:00 AM - 4:00 PM</li>
                    <li><strong>Location:</strong> Riverside Park Pavilion</li>
                    <li><strong>Cost:</strong> Free for all parishioners and guests</li>
                </ul>
                
                <h3>What to Expect</h3>
                <p><strong>Food & Refreshments:</strong></p>
                <ul>
                    <li>Traditional Orthodox dishes prepared by our talented cooks</li>
                    <li>BBQ and grilled specialties</li>
                    <li>Vegetarian and vegan options available</li>
                    <li>Homemade desserts and pastries</li>
                    <li>Soft drinks, coffee, and tea</li>
                </ul>
                
                <p><strong>Activities for All Ages:</strong></p>
                <ul>
                    <li>Children\'s games and face painting</li>
                    <li>Volleyball and soccer tournaments</li>
                    <li>Three-legged race and sack races</li>
                    <li>Orthodox trivia contest</li>
                    <li>Live music and folk dancing</li>
                    <li>Silent auction with wonderful prizes</li>
                </ul>
                
                <h3>How to Help</h3>
                <p>We need volunteers for:</p>
                <ul>
                    <li>Food preparation and serving</li>
                    <li>Setting up and cleaning up</li>
                    <li>Children\'s activities</li>
                    <li>Transportation for elderly parishioners</li>
                </ul>
                
                <p>Please sign up on the volunteer sheet in the fellowship hall or contact Maria at (555) 123-4567.</p>
                
                <h3>What to Bring</h3>
                <ul>
                    <li>Lawn chairs or blankets</li>
                    <li>Sun hats and sunscreen</li>
                    <li>Your favorite dish to share (optional)</li>
                    <li>Your beautiful smiles and joyful spirits!</li>
                </ul>
                
                <p>This is a wonderful opportunity to strengthen our parish bonds and welcome new families to our community. Invite your friends and neighbors to join us for this special day!</p>
                
                <p>Looking forward to seeing everyone there!</p>
                <p>With love,<br>The Social Committee</p>',
                'author_id' => $authorId,
                'category' => 'news',
                'status' => 'published',
                'published_at' => now()->subDays(7),
                'is_featured' => false,
                'views_count' => 167,
            ],

            // Announcement Posts
            [
                'title' => 'Orthodox Education Program Registration Open',
                'slug' => 'orthodox-education-registration-' . time(),
                'excerpt' => 'Register your children for Sunday School and adult education classes for the new academic year.',
                'content' => '<h2>Orthodox Education Program - Fall Registration</h2>
                <p>Registration is now open for our Orthodox Education Program for the 2024-2025 academic year. We offer comprehensive religious education for all ages, from preschoolers to adults, designed to deepen understanding of our Orthodox faith and strengthen spiritual growth.</p>
                
                <h3>Programs Available</h3>
                
                <h4>Children\'s Programs</h4>
                <ul>
                    <li><strong>Preschool (Ages 3-5):</strong> Basic prayers, Bible stories, and Orthodox traditions</li>
                    <li><strong>Elementary (Grades 1-5):</strong> Scripture study, Church history, and moral teachings</li>
                    <li><strong>Middle School (Grades 6-8):</strong> Deeper theology, Church Fathers, and Orthodox worldview</li>
                    <li><strong>High School (Grades 9-12):</strong> Advanced theology, apologetics, and preparation for adult faith</li>
                </ul>
                
                <h4>Adult Education</h4>
                <ul>
                    <li><strong>Newcomers Class:</strong> Introduction to Orthodox Christianity</li>
                    <li><strong>Bible Study:</strong> In-depth study of Scripture with Orthodox interpretation</li>
                    <li><strong>Church Fathers Study:</strong> Reading and discussing the writings of the saints</li>
                    <li><strong>Orthodox Spirituality:</strong> Prayer, fasting, and the spiritual life</li>
                </ul>
                
                <h3>Schedule</h3>
                <ul>
                    <li><strong>Children\'s Classes:</strong> Sundays, 10:30 AM - 11:30 AM</li>
                    <li><strong>Adult Classes:</strong> Various times throughout the week</li>
                    <li><strong>Program Begins:</strong> September 15th</li>
                    <li><strong>Program Ends:</strong> May 25th</li>
                </ul>
                
                <h3>Registration Information</h3>
                <ul>
                    <li><strong>Registration Fee:</strong> $25 per child (adult classes are free)</li>
                    <li><strong>Deadline:</strong> September 1st</li>
                    <li><strong>Materials Included:</strong> Textbooks, workbooks, and supplies</li>
                    <li><strong>Scholarships Available:</strong> Contact Father Michael for financial assistance</li>
                </ul>
                
                <h3>How to Register</h3>
                <ol>
                    <li>Pick up a registration form from the church office</li>
                    <li>Complete all required information</li>
                    <li>Submit with registration fee</li>
                    <li>Attend orientation meeting on September 8th</li>
                </ol>
                
                <p>Our dedicated teachers are committed to providing excellent Orthodox education in a warm, nurturing environment. Questions? Contact our Education Director, Mrs. Elena Constantinou, at (555) 987-6543.</p>
                
                <p>Invest in your child\'s spiritual future - register today!</p>
                <p>Blessings,<br>Father Michael & The Education Committee</p>',
                'author_id' => $authorId,
                'category' => 'announcement',
                'status' => 'published',
                'published_at' => now()->subDays(1),
                'is_featured' => false,
                'views_count' => 89,
            ],
        ];

        foreach ($posts as $postData) {
            Post::create($postData);
        }

        $this->command->info('Comprehensive blog posts seeded successfully!');
        $this->command->info('Created ' . count($posts) . ' posts with rich Orthodox content');
    }
}
