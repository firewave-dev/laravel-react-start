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
        Schema::create('bulletins', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('message');
            $table->enum('priority', ['high', 'normal', 'low'])->default('normal');
            $table->enum('type', ['announcement', 'prayer_request', 'event_notice', 'urgent', 'general'])->default('general');
            $table->foreignId('posted_by')->constrained('users')->cascadeOnDelete();
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_pinned')->default(false);
            $table->enum('status', ['active', 'expired', 'archived'])->default('active');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('status');
            $table->index('priority');
            $table->index('type');
            $table->index('expires_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bulletins');
    }
};
