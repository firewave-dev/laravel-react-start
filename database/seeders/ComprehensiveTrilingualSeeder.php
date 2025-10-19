<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\Event;
use App\Models\Bulletin;
use App\Models\User;
use Illuminate\Support\Str;

class ComprehensiveTrilingualSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();
        if (!$admin) {
            $admin = User::where('email', 'admin@church.com')->first();
        }

        // Create trilingual blog posts
        $this->createTrilingualPosts($admin);
        
        // Create trilingual events
        $this->createTrilingualEvents($admin);
        
        // Create trilingual bulletins
        $this->createTrilingualBulletins($admin);

        $this->command->info('Comprehensive trilingual content created successfully!');
        $this->command->info('- 3 Blog posts with EN/FR/SR translations');
        $this->command->info('- 3 Events with EN/FR/SR translations');  
        $this->command->info('- 3 Bulletins with EN/FR/SR translations');
    }

    private function createTrilingualPosts($admin)
    {
        // Post 1: The Importance of Orthodox Icons
        $post1 = Post::create([
            'author_id' => $admin->id,
            'title' => 'The Sacred Art of Orthodox Icons: Windows to Heaven',
            'slug' => 'sacred-art-orthodox-icons-' . time(),
            'excerpt' => 'Discover the profound spiritual significance of icons in Orthodox Christianity and how they connect us to the divine.',
            'content' => '<h2>The Sacred Art of Orthodox Icons: Windows to Heaven</h2>
            <p>In Orthodox Christianity, icons are not mere religious art or decoration. They are sacred windows that open our hearts and minds to the divine reality they represent. The word "icon" comes from the Greek "eikon," meaning image or likeness, and in Orthodox tradition, these holy images serve as bridges between heaven and earth.</p>
            
            <h3>The Theology Behind Icons</h3>
            <p>The veneration of icons is deeply rooted in the Orthodox understanding of the Incarnation. When God became man in the person of Jesus Christ, He made the invisible God visible. This fundamental truth means that it is not only possible but appropriate to depict the divine in human form.</p>
            
            <p>As Saint John of Damascus eloquently wrote: "I do not worship matter; I worship the Creator of matter who became matter for my sake, who willed to take His abode in matter; who worked out my salvation through matter."</p>
            
            <h3>Icons as Prayer and Worship</h3>
            <p>When we stand before an icon, we are not simply looking at a picture. We are engaging in prayer, entering into communion with the person or event depicted. The icon serves as a focal point for our prayer, helping us to concentrate our minds and hearts on God.</p>
            
            <p>Through icons, we participate in the heavenly worship, joining the angels and saints in their eternal praise of God. The icon becomes a means of grace, a way through which God\'s presence is made manifest in our midst.</p>
            
            <h3>Common Orthodox Icons and Their Meanings</h3>
            <ul>
                <li><strong>Christ Pantocrator:</strong> Christ as ruler of all, showing His divine and human natures united</li>
                <li><strong>Theotokos (Mother of God):</strong> Various types showing the Virgin Mary with Christ, emphasizing her role in salvation</li>
                <li><strong>Saints:</strong> Holy men and women who have achieved union with God and serve as examples for us</li>
                <li><strong>Feast Day Icons:</strong> Depicting events from the life of Christ and the Church throughout the liturgical year</li>
            </ul>
            
            <p>May these sacred images continue to inspire our worship and draw us closer to the divine mysteries they represent.</p>',
            'category' => 'teaching',
            'status' => 'published',
            'published_at' => now()->subDays(5),
            'is_featured' => true,
            'views_count' => 145,
        ]);

        // French translation
        $post1->translations()->create([
            'locale' => 'fr',
            'title' => 'L\'Art Sacré des Icônes Orthodoxes: Fenêtres vers le Ciel',
            'slug' => 'art-sacre-icones-orthodoxes-' . time(),
            'excerpt' => 'Découvrez la profonde signification spirituelle des icônes dans le christianisme orthodoxe et comment elles nous relient au divin.',
            'content' => '<h2>L\'Art Sacré des Icônes Orthodoxes: Fenêtres vers le Ciel</h2>
            <p>Dans le christianisme orthodoxe, les icônes ne sont pas de simples œuvres d\'art religieux ou des décorations. Ce sont des fenêtres sacrées qui ouvrent nos cœurs et nos esprits à la réalité divine qu\'elles représentent. Le mot "icône" vient du grec "eikon", signifiant image ou ressemblance, et dans la tradition orthodoxe, ces images saintes servent de ponts entre le ciel et la terre.</p>
            
            <h3>La Théologie derrière les Icônes</h3>
            <p>La vénération des icônes est profondément enracinée dans la compréhension orthodoxe de l\'Incarnation. Quand Dieu s\'est fait homme en la personne de Jésus-Christ, Il a rendu le Dieu invisible visible. Cette vérité fondamentale signifie qu\'il n\'est pas seulement possible mais approprié de représenter le divin sous forme humaine.</p>
            
            <p>Comme l\'a écrit avec éloquence saint Jean Damascène : "Je n\'adore pas la matière ; j\'adore le Créateur de la matière qui s\'est fait matière pour moi, qui a voulu prendre sa demeure dans la matière ; qui a accompli mon salut à travers la matière."</p>
            
            <h3>Les Icônes comme Prière et Adoration</h3>
            <p>Quand nous nous tenons devant une icône, nous ne regardons pas simplement une image. Nous nous engageons dans la prière, entrant en communion avec la personne ou l\'événement représenté. L\'icône sert de point focal pour notre prière, nous aidant à concentrer nos esprits et nos cœurs sur Dieu.</p>
            
            <p>À travers les icônes, nous participons à l\'adoration céleste, nous joignant aux anges et aux saints dans leur louange éternelle de Dieu. L\'icône devient un moyen de grâce, une voie à travers laquelle la présence de Dieu se manifeste au milieu de nous.</p>',
        ]);

        // Serbian translation
        $post1->translations()->create([
            'locale' => 'sr',
            'title' => 'Света Уметност Православних Икона: Прозори у Небо',
            'slug' => 'sveta-umetnost-pravoslavnih-ikona-' . time(),
            'excerpt' => 'Откријте дубоку духовну значај икона у православном хришћанству и како нас оне повезују са божанским.',
            'content' => '<h2>Света Уметност Православних Икона: Прозори у Небо</h2>
            <p>У православном хришћанству, иконе нису само верске слике или декорације. Оне су свети прозори који отварају наша срца и умове божанској стварности коју представљају. Реч "икона" долази од грчког "еикон", што значи слика или лик, а у православној традицији, ове свете слике служе као мостови између неба и земље.</p>
            
            <h3>Теологија икона</h3>
            <p>Поштовање икона је дубоко укорењено у православном разумевању Васкрсења. Када се Бог појавио као човек у лику Исуса Христа, Он је учинио невидљивог Бога видљивим. Ова основна истина значи да није само могуће већ и прикладно приказати божанско у људском облику.</p>
            
            <p>Као што је свети Јован Дамаскин елоквентно написао: "Не обожавам материју; обожавам Творца материје који се постао материја због мене, који је хтео да се настани у материји; који је извршио моје спасење кроз материју."</p>
            
            <h3>Иконе као Молитва и Богослужење</h3>
            <p>Када стојимо пред иконом, не гледамо само слику. Ангажујемо се у молитви, улазећи у заједницу са особом или догађајем који је приказан. Икона служи као фокусна тачка за нашу молитву, помажући нам да концентришемо наше умове и срца на Бога.</p>',
        ]);

        // Post 2: The Divine Liturgy
        $post2 = Post::create([
            'author_id' => $admin->id,
            'title' => 'The Divine Liturgy: Heaven on Earth',
            'slug' => 'divine-liturgy-heaven-earth-' . time(),
            'excerpt' => 'Explore the profound mystery of the Orthodox Divine Liturgy and its role in connecting us to heavenly worship.',
            'content' => '<h2>The Divine Liturgy: Heaven on Earth</h2>
            <p>The Divine Liturgy is the heart and soul of Orthodox Christian worship. It is not merely a service we attend, but a sacred participation in heavenly worship where earth meets heaven in the most profound way possible. Every aspect of the Liturgy is designed to draw us into the eternal worship that takes place before the throne of God.</p>
            
            <h3>The Structure of Divine Worship</h3>
            <p>The Divine Liturgy consists of three main parts, each with its own spiritual significance:</p>
            
            <h4>1. The Proskomedia (Preparation)</h4>
            <p>Before the visible service begins, the priest prepares the gifts of bread and wine at the Prothesis table. This sacred preparation symbolizes the birth, baptism, and death of Christ. The priest takes a portion of the prosphora (bread) and places it on the paten, while wine and water are poured into the chalice.</p>
            
            <h4>2. The Liturgy of the Word</h4>
            <p>This part includes the Great Litany, antiphons, the Little Entrance with the Gospel, Scripture readings, and the sermon. It prepares us to receive the Word of God and understand His teachings.</p>
            
            <h4>3. The Liturgy of the Faithful</h4>
            <p>The most sacred part includes the Great Entrance, the Creed, the Anaphora (Eucharistic prayer), Holy Communion, and the dismissal. Here, the bread and wine truly become the Body and Blood of Christ.</p>
            
            <h3>The Mystery of Transfiguration</h3>
            <p>During the Anaphora, the most profound moment occurs when the priest calls down the Holy Spirit to transform the gifts. This is not a symbolic act but a real transformation - the bread and wine become truly the Body and Blood of Christ, just as they were at the Last Supper.</p>
            
            <p>Through Holy Communion, we receive Christ Himself into our bodies and souls, becoming one with Him and with one another in the mystical body of the Church.</p>',
            'category' => 'teaching',
            'status' => 'published',
            'published_at' => now()->subDays(8),
            'is_featured' => false,
            'views_count' => 198,
        ]);

        // French translation for post 2
        $post2->translations()->create([
            'locale' => 'fr',
            'title' => 'La Liturgie Divine: Le Ciel sur Terre',
            'slug' => 'liturgie-divine-ciel-terre-' . time(),
            'excerpt' => 'Explorez le mystère profond de la Liturgie Divine orthodoxe et son rôle dans notre connexion avec l\'adoration céleste.',
            'content' => '<h2>La Liturgie Divine: Le Ciel sur Terre</h2>
            <p>La Liturgie Divine est le cœur et l\'âme de l\'adoration chrétienne orthodoxe. Ce n\'est pas simplement un service que nous fréquentons, mais une participation sacrée à l\'adoration céleste où la terre rencontre le ciel de la manière la plus profonde possible. Chaque aspect de la Liturgie est conçu pour nous attirer dans l\'adoration éternelle qui se déroule devant le trône de Dieu.</p>
            
            <h3>La Structure de l\'Adoration Divine</h3>
            <p>La Liturgie Divine consiste en trois parties principales, chacune avec sa propre signification spirituelle :</p>
            
            <h4>1. La Proskomédie (Préparation)</h4>
            <p>Avant que le service visible ne commence, le prêtre prépare les dons de pain et de vin à la table de la Prothèse. Cette préparation sacrée symbolise la naissance, le baptême et la mort du Christ.</p>',
        ]);

        // Serbian translation for post 2
        $post2->translations()->create([
            'locale' => 'sr',
            'title' => 'Божанска Литургија: Небо на Земљи',
            'slug' => 'bozanska-liturgija-nebo-zemlji-' . time(),
            'excerpt' => 'Истражите дубоки мистерију православне Божанске Литургије и њену улогу у повезивању са небеским богослужењем.',
            'content' => '<h2>Божанска Литургија: Небо на Земљи</h2>
            <p>Божанска Литургија је срце и душа православног хришћанског богослужења. То није само служба коју посећујемо, већ свето учешће у небеском богослужењу где се земља сусреће са небом на најдубљи могући начин. Сваки аспект Литургије је дизајниран да нас привуче у вечно богослужење које се одвија пред Божјим престолом.</p>
            
            <h3>Структура Божанског Богослужења</h3>
            <p>Божанска Литургија се састоји од три главна дела, сваки са својим духовним значајем:</p>
            
            <h4>1. Проскомидија (Припрема)</h4>
            <p>Пре него што почне видљива служба, свештеник припрема дарове хлеба и вина на столу Протезе. Ова света припрема симболизује рођење, крштење и смрт Христа.</p>',
        ]);

        // Post 3: Orthodox Prayer Life
        $post3 = Post::create([
            'author_id' => $admin->id,
            'title' => 'The Orthodox Life of Prayer: A Journey of the Heart',
            'slug' => 'orthodox-life-prayer-' . time(),
            'excerpt' => 'Discover the rich tradition of Orthodox prayer and how it can transform your spiritual life and relationship with God.',
            'content' => '<h2>The Orthodox Life of Prayer: A Journey of the Heart</h2>
            <p>Prayer in Orthodox Christianity is not merely a religious exercise or a means to ask God for things. It is a way of life, a continuous conversation with God that transforms our hearts and draws us into deeper communion with the Divine. The Orthodox tradition offers a rich treasury of prayer practices that have been refined over centuries by saints and spiritual fathers.</p>
            
            <h3>The Jesus Prayer: The Prayer of the Heart</h3>
            <p>The Jesus Prayer - "Lord Jesus Christ, Son of God, have mercy on me, a sinner" - is perhaps the most well-known Orthodox prayer practice. This simple yet profound prayer becomes a constant companion, repeated throughout the day until it becomes as natural as breathing.</p>
            
            <p>The goal is not mechanical repetition but to descend from the mind into the heart, creating a space where we can encounter God\'s presence in the depths of our being.</p>
            
            <h3>The Daily Prayer Rule</h3>
            <p>Orthodox Christians traditionally follow a daily prayer rule that includes:</p>
            <ul>
                <li><strong>Morning Prayers:</strong> Starting the day with thanksgiving and dedication</li>
                <li><strong>Evening Prayers:</strong> Reflecting on the day and seeking forgiveness</li>
                <li><strong>Meal Blessings:</strong> Acknowledging God\'s provision</li>
                <li><strong>Prayers Before Sleep:</strong> Commending ourselves to God\'s protection</li>
            </ul>
            
            <h3>The Role of the Prayer Book</h3>
            <p>Orthodox prayer books contain a wealth of prayers composed by saints throughout the centuries. These prayers teach us how to pray, providing words when we find ourselves speechless before God\'s majesty.</p>
            
            <p>Through regular use of the prayer book, we learn the language of the heart and develop a deeper understanding of our relationship with God.</p>',
            'category' => 'reflection',
            'status' => 'published',
            'published_at' => now()->subDays(12),
            'is_featured' => false,
            'views_count' => 167,
        ]);

        // French translation for post 3
        $post3->translations()->create([
            'locale' => 'fr',
            'title' => 'La Vie de Prière Orthodoxe: Un Voyage du Cœur',
            'slug' => 'vie-priere-orthodoxe-' . time(),
            'excerpt' => 'Découvrez la riche tradition de la prière orthodoxe et comment elle peut transformer votre vie spirituelle et votre relation avec Dieu.',
            'content' => '<h2>La Vie de Prière Orthodoxe: Un Voyage du Cœur</h2>
            <p>La prière dans le christianisme orthodoxe n\'est pas simplement un exercice religieux ou un moyen de demander des choses à Dieu. C\'est un mode de vie, une conversation continue avec Dieu qui transforme nos cœurs et nous attire dans une communion plus profonde avec le Divin. La tradition orthodoxe offre un riche trésor de pratiques de prière qui ont été raffinées au fil des siècles par les saints et les pères spirituels.</p>
            
            <h3>La Prière de Jésus: La Prière du Cœur</h3>
            <p>La Prière de Jésus - "Seigneur Jésus-Christ, Fils de Dieu, aie pitié de moi, pécheur" - est peut-être la pratique de prière orthodoxe la plus connue. Cette prière simple mais profonde devient une compagne constante, répétée tout au long de la journée jusqu\'à ce qu\'elle devienne aussi naturelle que respirer.</p>',
        ]);

        // Serbian translation for post 3
        $post3->translations()->create([
            'locale' => 'sr',
            'title' => 'Православни Живот Молитве: Путовање Срца',
            'slug' => 'pravoslavni-zivot-molitve-' . time(),
            'excerpt' => 'Откријте богату традицију православне молитве и како она може да трансформише ваш духовни живот и однос са Богом.',
            'content' => '<h2>Православни Живот Молитве: Путовање Срца</h2>
            <p>Молитва у православном хришћанству није само верска вежба или средство за тражење ствари од Бога. То је начин живота, континуирани разговор са Богом који трансформише наша срца и привлачи нас у дубљу заједницу са Божанским. Православна традиција нуди богато благо молитвених пракси које су савршене вековима од стране светаца и духовних очева.</p>
            
            <h3>Исусова Молитва: Молитва Срца</h3>
            <p>Исусова молитва - "Господе Исусе Христе, Сине Божји, помилуј ме грешног" - је можда најпознатија православна молитвена пракса. Ова једноставна али дубока молитва постаје константни пратилац, понавља се током дана док не постане природна као дисање.</p>',
        ]);
    }

    private function createTrilingualEvents($admin)
    {
        // Event 1: Divine Liturgy
        $event1 = Event::create([
            'created_by' => $admin->id,
            'title' => 'Sunday Divine Liturgy',
            'slug' => 'sunday-divine-liturgy-' . time(),
            'description' => 'Join us for our weekly celebration of the Divine Liturgy, the central act of Orthodox Christian worship.',
            'location' => 'Main Church Sanctuary',
            'event_date' => now()->next('Sunday'),
            'start_time' => '09:30',
            'end_time' => '11:30',
            'event_type' => 'liturgy',
            'is_recurring' => true,
            'recurrence_pattern' => 'Weekly on Sundays',
            'status' => 'published',
            'is_featured' => true,
        ]);

        $event1->translations()->create([
            'locale' => 'fr',
            'title' => 'Liturgie Divine du Dimanche',
            'slug' => 'liturgie-divine-dimanche-' . time(),
            'description' => 'Rejoignez-nous pour notre célébration hebdomadaire de la Liturgie Divine, l\'acte central de l\'adoration chrétienne orthodoxe.',
            'location' => 'Sanctuaire Principal de l\'Église',
        ]);

        $event1->translations()->create([
            'locale' => 'sr',
            'title' => 'Недељна Божанска Литургија',
            'slug' => 'nedeljna-bozanska-liturgija-' . time(),
            'description' => 'Придружите нам се на нашој недељној прослави Божанске Литургије, централном чину православног хришћанског богослужења.',
            'location' => 'Главни Црквени Олтар',
        ]);

        // Event 2: Bible Study
        $event2 = Event::create([
            'created_by' => $admin->id,
            'title' => 'Orthodox Bible Study - Gospel of John',
            'slug' => 'bible-study-john-' . time(),
            'description' => 'Join us for an in-depth study of the Gospel of John with Orthodox commentary and spiritual insights.',
            'location' => 'Parish Library',
            'event_date' => now()->addDays(3),
            'start_time' => '19:00',
            'end_time' => '20:30',
            'event_type' => 'study',
            'is_recurring' => true,
            'recurrence_pattern' => 'Weekly on Tuesdays',
            'status' => 'published',
        ]);

        $event2->translations()->create([
            'locale' => 'fr',
            'title' => 'Étude Biblique Orthodoxe - Évangile de Jean',
            'slug' => 'etude-biblique-jean-' . time(),
            'description' => 'Rejoignez-nous pour une étude approfondie de l\'Évangile de Jean avec des commentaires orthodoxes et des aperçus spirituels.',
            'location' => 'Bibliothèque Paroissiale',
        ]);

        $event2->translations()->create([
            'locale' => 'sr',
            'title' => 'Православно Библјско Учење - Јеванђеље по Јовану',
            'slug' => 'pravoslavno-biblijsko-ucenje-jovan-' . time(),
            'description' => 'Придружите нам се на дубинском проучавању Јеванђеља по Јовану са православним коментарима и духовним увидима.',
            'location' => 'Парохијска Библиотека',
        ]);

        // Event 3: Feast Day
        $event3 = Event::create([
            'created_by' => $admin->id,
            'title' => 'Feast of the Nativity of the Theotokos',
            'slug' => 'feast-nativity-theotokos-' . time(),
            'description' => 'Celebrate the birth of the Most Holy Theotokos with Divine Liturgy, procession, and fellowship.',
            'location' => 'Main Church Sanctuary',
            'event_date' => now()->addDays(7),
            'start_time' => '09:00',
            'end_time' => '12:00',
            'event_type' => 'feast',
            'is_recurring' => false,
            'status' => 'published',
            'is_featured' => true,
        ]);

        $event3->translations()->create([
            'locale' => 'fr',
            'title' => 'Fête de la Nativité de la Théotokos',
            'slug' => 'fete-nativite-theotokos-' . time(),
            'description' => 'Célébrez la naissance de la Très Sainte Théotokos avec la Liturgie Divine, la procession et la communion fraternelle.',
            'location' => 'Sanctuaire Principal de l\'Église',
        ]);

        $event3->translations()->create([
            'locale' => 'sr',
            'title' => 'Слава Рођења Пресвете Богородице',
            'slug' => 'slava-rođenja-bogorodice-' . time(),
            'description' => 'Прославите рођење Пресвете Богородице са Божанском Литургијом, поворком и заједничким дружењем.',
            'location' => 'Главни Црквени Олтар',
        ]);
    }

    private function createTrilingualBulletins($admin)
    {
        // Bulletin 1: General Announcement
        $bulletin1 = Bulletin::create([
            'posted_by' => $admin->id,
            'title' => 'Welcome to Our Orthodox Community',
            'message' => 'Dear parishioners, we warmly welcome you to our Orthodox Christian community. Whether you are a lifelong Orthodox Christian or someone exploring the faith, you will find a loving and welcoming spiritual home here. Join us for worship, fellowship, and spiritual growth as we journey together in faith.',
            'type' => 'announcement',
            'priority' => 'normal',
            'expires_at' => now()->addDays(30),
            'is_pinned' => true,
            'status' => 'active',
        ]);

        $bulletin1->translations()->create([
            'locale' => 'fr',
            'title' => 'Bienvenue dans Notre Communauté Orthodoxe',
            'message' => 'Chers paroissiens, nous vous souhaitons la bienvenue dans notre communauté chrétienne orthodoxe. Que vous soyez orthodoxe depuis toujours ou que vous exploriez la foi, vous trouverez ici un foyer spirituel aimant et accueillant. Rejoignez-nous pour l\'adoration, la communion fraternelle et la croissance spirituelle alors que nous cheminons ensemble dans la foi.',
        ]);

        $bulletin1->translations()->create([
            'locale' => 'sr',
            'title' => 'Добродошли у Нашу Православну Заједницу',
            'message' => 'Драги парохијани, топло вас поздрављамо у нашу православну хришћанску заједницу. Било да сте дугогодишњи православни хришћанин или неко ко истражује веру, овде ћете пронаћи љубавни и гостољубиви духовни дом. Придружите нам се за богослужење, заједничко дружење и духовни раст док заједно путујемо у вери.',
        ]);

        // Bulletin 2: Prayer Request
        $bulletin2 = Bulletin::create([
            'posted_by' => $admin->id,
            'title' => 'Prayer Request: Parish Missionaries',
            'message' => 'Please keep our parish missionaries, Father Nicholas and Presvytera Elena, in your prayers as they serve in Kenya. Pray for their safety, health, and success in their missionary work. May God grant them strength and wisdom as they share the Orthodox faith with those who have not yet heard the Gospel.',
            'type' => 'prayer_request',
            'priority' => 'normal',
            'expires_at' => now()->addDays(21),
            'is_pinned' => false,
            'status' => 'active',
        ]);

        $bulletin2->translations()->create([
            'locale' => 'fr',
            'title' => 'Demande de Prière: Missionnaires Paroissiaux',
            'message' => 'Veuillez garder nos missionnaires paroissiaux, le Père Nicolas et Presvytera Elena, dans vos prières alors qu\'ils servent au Kenya. Priez pour leur sécurité, leur santé et le succès de leur travail missionnaire. Que Dieu leur accorde force et sagesse alors qu\'ils partagent la foi orthodoxe avec ceux qui n\'ont pas encore entendu l\'Évangile.',
        ]);

        $bulletin2->translations()->create([
            'locale' => 'sr',
            'title' => 'Молитвени Захтев: Парохијски Мисионари',
            'message' => 'Молимо вас да држате наше парохијске мисионаре, оца Николе и Пресвитеру Елену, у својим молитвама док служе у Кенији. Молите се за њихову безбедност, здравље и успех у њиховом мисионарском раду. Нека им Бог да снагу и мудрост док деле православну веру са онима који још нису чули Јеванђеље.',
        ]);

        // Bulletin 3: Event Notice
        $bulletin3 = Bulletin::create([
            'posted_by' => $admin->id,
            'title' => 'Annual Parish Meeting - All Invited',
            'message' => 'Our Annual Parish Meeting will be held on Sunday, October 15th, immediately following Divine Liturgy. We will discuss the parish budget, upcoming projects, and elect new Parish Council members. All parishioners are encouraged to attend and participate in the governance of our parish community. Light refreshments will be served.',
            'type' => 'event_notice',
            'priority' => 'normal',
            'expires_at' => now()->addDays(28),
            'is_pinned' => false,
            'status' => 'active',
        ]);

        $bulletin3->translations()->create([
            'locale' => 'fr',
            'title' => 'Réunion Paroissiale Annuelle - Tous Invités',
            'message' => 'Notre Réunion Paroissiale Annuelle aura lieu le dimanche 15 octobre, immédiatement après la Liturgie Divine. Nous discuterons du budget paroissial, des projets à venir et élirons de nouveaux membres du Conseil Paroissial. Tous les paroissiens sont encouragés à assister et à participer à la gouvernance de notre communauté paroissiale. Des rafraîchissements légers seront servis.',
        ]);

        $bulletin3->translations()->create([
            'locale' => 'sr',
            'title' => 'Годишњи Парохијски Збор - Сви Позвани',
            'message' => 'Наш годишњи парохијски збор ће се одржати у недељу, 15. октобра, одмах након Божанске Литургије. Разговараћемо о парохијском буџету, предстојећим пројектима и изабрати нове чланове Парохијског већа. Сви парохијани се охрабрују да присуствују и учествују у управљању нашом парохијском заједницом. Служиће се лако освежење.',
        ]);
    }
}
