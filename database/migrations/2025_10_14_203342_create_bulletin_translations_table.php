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
        Schema::create('bulletin_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bulletin_id')->constrained()->cascadeOnDelete();
            $table->string('locale', 5); // en, fr, sr
            
            // Translatable fields
            $table->string('title');
            $table->text('message');
            
            $table->timestamps();
            
            // Ensure one translation per bulletin per language
            $table->unique(['bulletin_id', 'locale']);
            $table->index(['locale', 'bulletin_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bulletin_translations');
    }
};