/**
 * Date utility functions for formatting and displaying dates
 */

/**
 * Format a date string for display
 * @param {string|Date} date - The date to format
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = 'en-US', options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format a date with time for display
 * @param {string|Date} date - The date to format
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date, locale = 'en-US') => {
  return formatDate(date, locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Format a date for relative display (e.g., "2 hours ago", "3 days ago")
 * @param {string|Date} date - The date to format
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Relative date string
 */
export const formatRelativeDate = (date, locale = 'en-US') => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);
    
    // Define time intervals
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 }
    ];
    
    // Find the appropriate interval
    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
      }
    }
    
    return 'just now';
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return '';
  }
};

/**
 * Check if a date is today
 * @param {string|Date} date - The date to check
 * @returns {boolean} True if the date is today
 */
export const isToday = (date) => {
  if (!date) return false;
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    
    return dateObj.toDateString() === today.toDateString();
  } catch (error) {
    console.error('Error checking if date is today:', error);
    return false;
  }
};

/**
 * Check if a date is yesterday
 * @param {string|Date} date - The date to check
 * @returns {boolean} True if the date is yesterday
 */
export const isYesterday = (date) => {
  if (!date) return false;
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    return dateObj.toDateString() === yesterday.toDateString();
  } catch (error) {
    console.error('Error checking if date is yesterday:', error);
    return false;
  }
};

/**
 * Get a human-readable date string (e.g., "Today", "Yesterday", "Jan 15, 2024")
 * @param {string|Date} date - The date to format
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Human-readable date string
 */
export const getHumanReadableDate = (date, locale = 'en-US') => {
  if (!date) return '';
  
  if (isToday(date)) {
    return 'Today';
  }
  
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  
  return formatDate(date, locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
