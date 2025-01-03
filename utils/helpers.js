/**
 * Validates if the given email string is in a valid email format.
 * @param {string} email - The email string to validate.
 * @returns {boolean} - True if the email is valid, otherwise false.
 */
const validateEmail = (email) => {
  if (typeof email !== 'string') {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Formats a date string from ISO format to YYYY-MM-DD format.
 * @param {string} dateString - The date string in ISO format.
 * @returns {string | null} - The formatted date string in YYYY-MM-DD format, or null if the input is invalid.
 */
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return null;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return null;
  }
};


/**
 * Sanitizes user input to prevent XSS attacks by encoding HTML tags.
 * @param {string} input - The user input string to sanitize.
 * @returns {string} - The sanitized string.
 */
const sanitizeInput = (input) => {
    if (typeof input !== 'string') {
      return String(input);
    }
  
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};


module.exports = {
  validateEmail,
  formatDate,
  sanitizeInput,
};