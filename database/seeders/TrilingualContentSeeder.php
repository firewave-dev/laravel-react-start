<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\Event;
use App\Models\Bulletin;
use App\Models\User;

class TrilingualContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();
        if (!$admin) {
            $admin = User::factory()->create(['role' => 'admin']);
        }

        // Create trilingual blog post (hybrid structure: English in main table, translations in separate table)
        $post = Post::create([
            'author_id' => $admin->id,
            'title' => 'Trilingual Test Post', // Required in main table
            'slug' => 'trilingual-test-post-' . time(),
            'excerpt' => 'Join us in our spiritual journey and community fellowship.',
            'content' => '<h2>Welcome to Our Church</h2><p>We are delighted to welcome you to our Orthodox Christian community. Our church has been serving the faithful for generations, providing spiritual guidance, community support, and a place of worship where traditions are honored and faith is strengthened.</p><p>Whether you are a lifelong Orthodox Christian or someone exploring the faith, you will find a warm and welcoming community here.</p>',
            'category' => 'news',
            'status' => 'published',
            'published_at' => now(),
            'is_featured' => true,
            'views_count' => 0,
        ]);

        // Add French translation (only additional languages go in translation table)
        $post->translations()->create([
            'locale' => 'fr',
            'title' => 'Bienvenue dans Notre Communauté Orthodoxe',
            'slug' => 'bienvenue-communaute-orthodoxe-' . time(),
            'excerpt' => 'Rejoignez-nous dans notre voyage spirituel et notre fellowship communautaire.',
            'content' => '<h2>Bienvenue dans Notre Église</h2><p>Nous sommes ravis de vous accueillir dans notre communauté chrétienne orthodoxe. Notre église sert les fidèles depuis des générations, offrant des conseils spirituels, un soutien communautaire et un lieu de culte où les traditions sont honorées et la foi est renforcée.</p><p>Que vous soyez un chrétien orthodoxe de longue date ou quelqu\'un qui explore la foi, vous trouverez ici une communauté chaleureuse et accueillante.</p>',
        ]);

        // Add Serbian translation
        $post->translations()->create([
            'locale' => 'sr',
            'title' => 'Добродошли у Нашу Православну Заједницу',
            'slug' => 'dobrodosli-pravoslavna-zajednica-' . time(),
            'excerpt' => 'Придружите нам се на нашем духовном путовању и заједничком дружењу.',
            'content' => '<h2>Добродошли у Нашу Цркву</h2><p>Радујемо се што вас можемо поздравити у нашој православној хришћанској заједници. Наша црква служи верницима генерацијама, пружајући духовно вођење, подршку заједнице и место богослужења где се традиције поштују и вера јача.</p><p>Било да сте дугогодишњи православни хришћанин или неко ко истражује веру, овде ћете пронаћи топлу и гостољубиву заједницу.</p>',
        ]);

        // Create trilingual event (current structure: some fields still in main table)
        $event = Event::create([
            'created_by' => $admin->id,
            'title' => 'Trilingual Test Event', // Still in main table
            'slug' => 'trilingual-test-event-' . time(), // Still in main table
            'description' => 'Join us for our weekly Divine Liturgy celebrating the Orthodox tradition with hymns, prayers, and community fellowship.', // Still in main table
            'location' => 'Main Church Sanctuary', // Still in main table
            'event_date' => now()->next('Sunday'),
            'start_time' => '09:00',
            'end_time' => '11:30',
            'event_type' => 'liturgy',
            'is_recurring' => true,
            'recurrence_pattern' => 'Weekly on Sundays',
            'status' => 'published',
            'published_at' => now(),
            'is_featured' => true,
            'max_attendees' => null,
        ]);

        // Add French translation
        $event->translations()->create([
            'locale' => 'fr',
            'title' => 'Liturgie Divine Dominicale',
            'slug' => 'liturgie-divine-dominicale',
            'description' => 'Rejoignez-nous pour notre Liturgie Divine hebdomadaire célébrant la tradition orthodoxe avec des hymnes, des prières et la communion fraternelle.',
            'location' => 'Sanctuaire Principal de l\'Église',
        ]);

        // Add Serbian translation
        $event->translations()->create([
            'locale' => 'sr',
            'title' => 'Недељна Божанска Литургија',
            'slug' => 'nedeljna-bozanska-liturgija',
            'description' => 'Придружите нам се на нашој недељној Божанској Литургији прослављајући православну традицију са химнама, молитвама и заједничким дружењем.',
            'location' => 'Главни Црквени Олтар',
        ]);

        // Create trilingual bulletin (current structure: some fields still in main table)
        $bulletin = Bulletin::create([
            'posted_by' => $admin->id,
            'title' => 'Trilingual Test Bulletin', // Still in main table
            'message' => 'Dear parishioners, we invite you to attend our monthly parish meeting this Thursday at 7 PM. We will discuss upcoming events, budget matters, and community initiatives. Light refreshments will be served.', // Still in main table
            'type' => 'announcement',
            'priority' => 'normal',
            'expires_at' => now()->addWeeks(2),
            'is_pinned' => true,
            'status' => 'active',
        ]);

        // Add French translation
        $bulletin->translations()->create([
            'locale' => 'fr',
            'title' => 'Réunion Paroissiale ce Jeudi',
            'message' => 'Chers paroissiens, nous vous invitons à assister à notre réunion paroissiale mensuelle ce jeudi à 19h. Nous discuterons des événements à venir, des questions budgétaires et des initiatives communautaires. Des rafraîchissements légers seront servis.',
        ]);

        // Add Serbian translation
        $bulletin->translations()->create([
            'locale' => 'sr',
            'title' => 'Црквени Збор овај Четвртак',
            'message' => 'Драги парохијани, позивамо вас да присуствујете нашем месечном црквеном збору овај четвртак у 19 часова. Разговараћемо о предстојећим догађајима, буџетским питањима и заједничким иницијативама. Службиће се лако освежење.',
        ]);

        $this->command->info('Sample trilingual content created successfully!');
        $this->command->info('- 1 Blog post with EN/FR/SR translations');
        $this->command->info('- 1 Event with EN/FR/SR translations');  
        $this->command->info('- 1 Bulletin with EN/FR/SR translations');
    }
}