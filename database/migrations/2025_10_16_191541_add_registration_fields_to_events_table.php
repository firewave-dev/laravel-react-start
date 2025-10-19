<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            // Registration settings
            $table->boolean('registration_required')->default(false)->after('max_attendees');
            $table->boolean('registration_enabled')->default(true)->after('registration_required');
            $table->integer('registration_capacity')->nullable()->after('registration_enabled');
            $table->boolean('allow_waitlist')->default(true)->after('registration_capacity');
            $table->timestamp('registration_deadline')->nullable()->after('allow_waitlist');
            $table->timestamp('registration_opens_at')->nullable()->after('registration_deadline');
            
            // Registration details
            $table->text('registration_instructions')->nullable()->after('registration_opens_at');
            $table->json('registration_fields')->nullable()->after('registration_instructions'); // Custom fields
            
            // Pricing (for paid events)
            $table->decimal('registration_fee', 8, 2)->nullable()->after('registration_fields');
            $table->boolean('fee_required')->default(false)->after('registration_fee');
            
            // Notifications
            $table->boolean('send_reminders')->default(true)->after('fee_required');
            $table->integer('reminder_days_before')->default(1)->after('send_reminders');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn([
                'registration_required',
                'registration_enabled',
                'registration_capacity',
                'allow_waitlist',
                'registration_deadline',
                'registration_opens_at',
                'registration_instructions',
                'registration_fields',
                'registration_fee',
                'fee_required',
                'send_reminders',
                'reminder_days_before'
            ]);
        });
    }
};