/**
 * Translation utilities for frontend
 */

/**
 * Get translated content for a model with fallback to English
 * @param {Object} item - The model item with translations
 * @param {string} locale - Target locale ('en', 'fr', 'sr')
 * @param {string} field - Field to translate ('title', 'content', etc.)
 * @returns {string} Translated text or English fallback
 */
export const getTranslatedField = (item, locale, field) => {
  // If requesting English or no translations, return main field
  if (locale === 'en' || !item.translations) {
    return item[field] || ''
  }

  // Find translation for requested locale
  const translation = item.translations.find(t => t.locale === locale)
  
  if (translation && translation[field]) {
    return translation[field]
  }

  // Fallback to English (main model)
  return item[field] || ''
}

/**
 * Get all translated content for a model
 * @param {Object} item - The model item with translations  
 * @param {string} locale - Target locale
 * @returns {Object} Object with all translated fields
 */
export const getTranslatedContent = (item, locale) => {
  if (locale === 'en' || !item.translations) {
    return {
      title: item.title || '',
      slug: item.slug || '',
      excerpt: item.excerpt || '',
      content: item.content || '',
      description: item.description || '',
      location: item.location || '',
      message: item.message || ''
    }
  }

  const translation = item.translations.find(t => t.locale === locale)
  
  if (translation) {
    return {
      title: translation.title || item.title || '',
      slug: translation.slug || item.slug || '', 
      excerpt: translation.excerpt || item.excerpt || '',
      content: translation.content || item.content || '',
      description: translation.description || item.description || '',
      location: translation.location || item.location || '',
      message: translation.message || item.message || ''
    }
  }

  // Fallback to English
  return {
    title: item.title || '',
    slug: item.slug || '',
    excerpt: item.excerpt || '',
    content: item.content || '',
    description: item.description || '',
    location: item.location || '',
    message: item.message || ''
  }
}

/**
 * Check if item has translation for locale
 * @param {Object} item - The model item
 * @param {string} locale - Target locale
 * @returns {boolean} True if translation exists
 */
export const hasTranslation = (item, locale) => {
  if (locale === 'en') return true
  if (!item.translations) return false
  return item.translations.some(t => t.locale === locale && t.title)
}

/**
 * Get language-specific URL
 * @param {string} path - Base path
 * @param {string} locale - Target locale
 * @returns {string} URL with language parameter
 */
export const getLocalizedUrl = (path, locale) => {
  if (locale === 'en') return path
  
  const url = new URL(path, window.location.origin)
  url.searchParams.set('lang', locale)
  return url.pathname + url.search
}

/**
 * Available languages
 */
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'sr', name: 'Serbian', flag: '🇷🇸', nativeName: 'Српски' }
]

/**
 * Get current locale from URL or default to English
 * @returns {string} Current locale code
 */
export const getCurrentLocale = () => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('lang') || 'en'
}
