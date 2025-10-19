/**
 * Content utility functions for handling translations and content formatting
 */

/**
 * Get translated content with fallback to English
 * @param {Object} item - The content item (post, event, bulletin, etc.)
 * @param {string} field - The field to get (title, content, description, etc.)
 * @param {string} language - The desired language (default: 'en')
 * @returns {string} Translated content or fallback
 */
export const getTranslatedContent = (item, field, language = 'en') => {
  if (!item) return '';
  
  // If the item has translations
  if (item.translations && item.translations.length > 0) {
    // Find translation for the requested language
    const translation = item.translations.find(t => t.locale === language);
    if (translation && translation[field]) {
      return translation[field];
    }
  }
  
  // Fallback to the main field (usually English)
  return item[field] || '';
};

/**
 * Get translated title with fallback
 * @param {Object} item - The content item
 * @param {string} language - The desired language (default: 'en')
 * @returns {string} Translated title
 */
export const getTranslatedTitle = (item, language = 'en') => {
  return getTranslatedContent(item, 'title', language);
};

/**
 * Get translated content/description with fallback
 * @param {Object} item - The content item
 * @param {string} language - The desired language (default: 'en')
 * @param {string} field - The field to get (default: 'content')
 * @returns {string} Translated content
 */
export const getTranslatedDescription = (item, language = 'en', field = 'content') => {
  return getTranslatedContent(item, field, language);
};

/**
 * Get translated location with fallback
 * @param {Object} item - The content item (usually event)
 * @param {string} language - The desired language (default: 'en')
 * @returns {string} Translated location
 */
export const getTranslatedLocation = (item, language = 'en') => {
  return getTranslatedContent(item, 'location', language);
};

/**
 * Get translated message with fallback
 * @param {Object} item - The content item (usually bulletin)
 * @param {string} language - The desired language (default: 'en')
 * @returns {string} Translated message
 */
export const getTranslatedMessage = (item, language = 'en') => {
  return getTranslatedContent(item, 'message', language);
};

/**
 * Get translated slug with fallback
 * @param {Object} item - The content item
 * @param {string} language - The desired language (default: 'en')
 * @returns {string} Translated slug
 */
export const getTranslatedSlug = (item, language = 'en') => {
  return getTranslatedContent(item, 'slug', language);
};

/**
 * Check if content has translation for a specific language
 * @param {Object} item - The content item
 * @param {string} language - The language to check
 * @returns {boolean} True if translation exists
 */
export const hasTranslation = (item, language = 'en') => {
  if (!item || !item.translations) return false;
  
  return item.translations.some(t => t.locale === language);
};

/**
 * Get available languages for content
 * @param {Object} item - The content item
 * @returns {Array} Array of available language codes
 */
export const getAvailableLanguages = (item) => {
  if (!item || !item.translations) return ['en']; // Default to English
  
  const languages = ['en']; // Always include English as base
  item.translations.forEach(t => {
    if (!languages.includes(t.locale)) {
      languages.push(t.locale);
    }
  });
  
  return languages;
};

/**
 * Format content for display with proper line breaks
 * @param {string} content - The content to format
 * @param {number} maxLength - Maximum length before truncation (optional)
 * @returns {string} Formatted content
 */
export const formatContentForDisplay = (content, maxLength = null) => {
  if (!content) return '';
  
  // Replace line breaks with proper HTML breaks
  let formatted = content.replace(/\n/g, '<br>');
  
  // Truncate if maxLength is specified
  if (maxLength && formatted.length > maxLength) {
    formatted = formatted.substring(0, maxLength) + '...';
  }
  
  return formatted;
};

/**
 * Strip HTML tags from content
 * @param {string} content - The content to strip
 * @returns {string} Plain text content
 */
export const stripHtmlTags = (content) => {
  if (!content) return '';
  
  // Create a temporary DOM element to parse HTML
  const temp = document.createElement('div');
  temp.innerHTML = content;
  return temp.textContent || temp.innerText || '';
};

/**
 * Generate excerpt from content
 * @param {string} content - The content to excerpt
 * @param {number} maxLength - Maximum length of excerpt (default: 150)
 * @returns {string} Excerpt
 */
export const generateExcerpt = (content, maxLength = 150) => {
  if (!content) return '';
  
  // Strip HTML tags first
  const plainText = stripHtmlTags(content);
  
  // Truncate if needed
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // Find the last complete word within the limit
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
};
