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
        Schema::create('daily_quotes', function (Blueprint $table) {
            $table->id();
            $table->text('quote_en');
            $table->text('quote_fr')->nullable();
            $table->text('quote_sr')->nullable();
            $table->string('author_en');
            $table->string('author_fr')->nullable();
            $table->string('author_sr')->nullable();
            $table->string('title_en')->nullable(); // e.g., "Saint", "Metropolitan", "Archbishop"
            $table->string('title_fr')->nullable();
            $table->string('title_sr')->nullable();
            $table->string('source_en')->nullable(); // e.g., "Homily on Love", "Letters", "Theology"
            $table->string('source_fr')->nullable();
            $table->string('source_sr')->nullable();
            $table->integer('century')->nullable(); // e.g., 4, 19, 20
            $table->string('category')->default('general'); // general, prayer, theology, spiritual, pastoral
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_quotes');
    }
};
