<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Quote extends Model
{
    protected $table = 'daily_quotes';
    
    protected $fillable = [
        'quote_en',
        'quote_fr', 
        'quote_sr',
        'author_en',
        'author_fr',
        'author_sr',
        'title_en',
        'title_fr', 
        'title_sr',
        'source_en',
        'source_fr',
        'source_sr',
        'century',
        'category',
        'is_active',
        'display_order'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'century' => 'integer',
        'display_order' => 'integer'
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeByCentury($query, $century)
    {
        return $query->where('century', $century);
    }

    public function scopeRandom($query)
    {
        return $query->inRandomOrder();
    }

    // Accessor for getting localized content
    public function getLocalizedQuote($locale = 'en')
    {
        $quoteField = "quote_{$locale}";
        return $this->$quoteField ?: $this->quote_en;
    }

    public function getLocalizedAuthor($locale = 'en')
    {
        $authorField = "author_{$locale}";
        return $this->$authorField ?: $this->author_en;
    }

    public function getLocalizedTitle($locale = 'en')
    {
        $titleField = "title_{$locale}";
        return $this->$titleField ?: $this->title_en;
    }

    public function getLocalizedSource($locale = 'en')
    {
        $sourceField = "source_{$locale}";
        return $this->$sourceField ?: $this->source_en;
    }

    // Get full author name with title
    public function getFullAuthorName($locale = 'en')
    {
        $title = $this->getLocalizedTitle($locale);
        $author = $this->getLocalizedAuthor($locale);
        
        return $title ? "{$title} {$author}" : $author;
    }

    // Get formatted source
    public function getFormattedSource($locale = 'en')
    {
        $source = $this->getLocalizedSource($locale);
        $century = $this->century;
        
        if ($source && $century) {
            return "{$source} ({$century}th century)";
        } elseif ($source) {
            return $source;
        } elseif ($century) {
            return "({$century}th century)";
        }
        
        return null;
    }
}
