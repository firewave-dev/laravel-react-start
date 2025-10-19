<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use App\Models\UserPreference;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        $admin = User::updateOrCreate(
            ['email' => 'admin@church.com'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('password'),
                'role' => UserRole::ADMIN->value,
                'email_verified_at' => now(),
            ]
        );

        // Create preferences for admin
        UserPreference::updateOrCreate(
            ['user_id' => $admin->id],
            [
                'phone' => '+1234567890',
                'address' => '123 Church Street, City, State 12345',
                'date_of_birth' => '1980-01-01',
                'gender' => 'male',
                'notes' => 'System Administrator',
                'email_notifications' => true,
                'sms_notifications' => true,
            ]
        );

        $this->command->info('Admin user created successfully!');
        $this->command->info('Email: admin@church.com');
        $this->command->info('Password: password');

        // Create additional role examples (optional)
        $operator = User::updateOrCreate(
            ['email' => 'operator@church.com'],
            [
                'name' => 'Church Operator',
                'password' => Hash::make('password'),
                'role' => UserRole::OPERATOR->value,
                'email_verified_at' => now(),
            ]
        );

        UserPreference::updateOrCreate(
            ['user_id' => $operator->id],
            [
                'phone' => '+1234567891',
                'email_notifications' => true,
                'sms_notifications' => false,
            ]
        );

        $manager = User::updateOrCreate(
            ['email' => 'manager@church.com'],
            [
                'name' => 'Church Manager',
                'password' => Hash::make('password'),
                'role' => UserRole::MANAGER->value,
                'email_verified_at' => now(),
            ]
        );

        UserPreference::updateOrCreate(
            ['user_id' => $manager->id],
            [
                'phone' => '+1234567892',
                'email_notifications' => true,
                'sms_notifications' => false,
            ]
        );

        $member = User::updateOrCreate(
            ['email' => 'member@church.com'],
            [
                'name' => 'John Doe',
                'password' => Hash::make('password'),
                'role' => UserRole::MEMBER->value,
                'email_verified_at' => now(),
            ]
        );

        UserPreference::updateOrCreate(
            ['user_id' => $member->id],
            [
                'phone' => '+1234567893',
                'address' => '456 Member Lane, City, State 12345',
                'date_of_birth' => '1990-05-15',
                'gender' => 'male',
                'email_notifications' => true,
                'sms_notifications' => false,
            ]
        );

        $this->command->info('Additional test users created!');
        $this->command->info('Operator: operator@church.com / password');
        $this->command->info('Manager: manager@church.com / password');
        $this->command->info('Member: member@church.com / password');
    }
}
