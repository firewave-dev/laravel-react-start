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
        Schema::create('content_moderation', function (Blueprint $table) {
            $table->id();
            
            // Polymorphic relationship to content
            $table->morphs('moderatable'); // moderatable_type, moderatable_id
            
            // Moderation details
            $table->enum('status', ['pending', 'approved', 'rejected', 'needs_revision'])->default('pending');
            $table->text('notes')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->json('moderation_data')->nullable(); // Store moderation-specific data
            
            // User who submitted for moderation
            $table->foreignId('submitted_by')->constrained('users')->cascadeOnDelete();
            
            // Moderator details
            $table->foreignId('moderated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('moderated_at')->nullable();
            
            // Version control
            $table->integer('version')->default(1);
            $table->json('previous_data')->nullable(); // Store previous version data
            
            $table->timestamps();
            
            // Indexes
            $table->index('status');
            $table->index('submitted_by');
            $table->index('moderated_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('content_moderation');
    }
};