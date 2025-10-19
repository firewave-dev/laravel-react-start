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
        Schema::create('event_registrations', function (Blueprint $table) {
            $table->id();
            
            // Event relationship
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            
            // User relationship (nullable for guest registrations)
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            
            // Registration details
            $table->string('registrant_name'); // Name of person registering
            $table->string('registrant_email'); // Email for confirmations
            $table->string('registrant_phone')->nullable(); // Optional phone number
            
            // Additional attendees (for family registrations)
            $table->json('additional_attendees')->nullable(); // Array of additional people
            $table->integer('total_attendees')->default(1); // Total number of people
            
            // Registration status
            $table->enum('status', ['registered', 'confirmed', 'cancelled', 'waitlisted'])->default('registered');
            $table->enum('registration_type', ['member', 'guest', 'family'])->default('guest');
            
            // Special requirements
            $table->text('special_requirements')->nullable(); // Dietary restrictions, accessibility needs, etc.
            $table->text('notes')->nullable(); // Additional notes from registrant
            
            // Admin fields
            $table->text('admin_notes')->nullable(); // Internal notes
            $table->timestamp('checked_in_at')->nullable(); // When they actually attended
            
            // Timestamps
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['event_id', 'status']);
            $table->index(['user_id', 'status']);
            $table->index(['registrant_email']);
            $table->index(['created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_registrations');
    }
};