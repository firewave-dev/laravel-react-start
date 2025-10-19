<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed admin and test users
        $this->call([
            AdminUserSeeder::class,
            // Original seeders (basic content)
            EventSeeder::class,
            PostSeeder::class,
            BulletinSeeder::class,
            TrilingualContentSeeder::class,
            
            // Comprehensive seeders (rich Orthodox content)
            ComprehensiveEventSeeder::class,
            ComprehensivePostSeeder::class,
            ComprehensiveBulletinSeeder::class,
            ComprehensiveTrilingualSeeder::class,
        ]);
    }
}
