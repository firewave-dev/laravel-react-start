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
        Schema::create('prayer_requests', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Brief title/summary
            $table->text('request'); // The prayer request content
            $table->string('requester_name')->nullable(); // Optional: person's name
            $table->string('requester_email')->nullable(); // Optional: contact email
            $table->enum('visibility', ['public', 'private', 'anonymous'])->default('public');
            $table->enum('status', ['active', 'answered', 'archived'])->default('active');
            $table->enum('category', ['health', 'family', 'spiritual', 'work', 'travel', 'other'])->default('other');
            $table->integer('prayer_count')->default(0); // How many people prayed for this
            $table->boolean('is_urgent')->default(false);
            $table->boolean('is_anonymous')->default(false);
            $table->timestamp('answered_at')->nullable(); // When prayer was answered
            $table->text('answer_notes')->nullable(); // Optional: notes about how prayer was answered
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null'); // Optional: if user is logged in
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['status', 'visibility']);
            $table->index(['category', 'status']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prayer_requests');
    }
};
