const { validateEmail, formatDate, sanitizeInput } = require('../utils/helpers');

describe('validateEmail', () => {
    it('should return true for valid email formats', () => {
        expect(validateEmail('test@example.com')).toBe(true);
        expect(validateEmail('test.test@sub.domain.net')).toBe(true);
        expect(validateEmail('test123@example.com')).toBe(true);
        expect(validateEmail('test-test@example.com')).toBe(true);
        expect(validateEmail('test_test@example.com')).toBe(true);
    });

    it('should return false for invalid email formats', () => {
        expect(validateEmail('test@example')).toBe(false);
        expect(validateEmail('test@.com')).toBe(false);
        expect(validateEmail('test')).toBe(false);
        expect(validateEmail('@example.com')).toBe(false);
        expect(validateEmail('test@example.')).toBe(false);
        expect(validateEmail('test@example.c')).toBe(false);
        expect(validateEmail('test@example.123')).toBe(false);
        expect(validateEmail('test@example')).toBe(false);
        expect(validateEmail('test.example.com')).toBe(false);
        expect(validateEmail('test @example.com')).toBe(false);
          expect(validateEmail(123)).toBe(false);
           expect(validateEmail(null)).toBe(false);
        expect(validateEmail(undefined)).toBe(false);
         expect(validateEmail({})).toBe(false);
          expect(validateEmail([])).toBe(false);

    });
});

describe('formatDate', () => {
    it('should return formatted date string for valid ISO date strings', () => {
        expect(formatDate('2024-08-22T12:00:00.000Z')).toBe('2024-08-22');
        expect(formatDate('2023-01-01')).toBe('2023-01-01');
        expect(formatDate('2024-12-31T23:59:59.999Z')).toBe('2024-12-31');
        expect(formatDate('2024-02-29T10:00:00.000Z')).toBe('2024-02-29');

    });

    it('should return null for invalid date strings', () => {
        expect(formatDate('invalid-date')).toBe(null);
          expect(formatDate('')).toBe(null);
         expect(formatDate('2024-08-22T12:00:00')).toBe(null);
         expect(formatDate('2024-13-01T12:00:00.000Z')).toBe(null);
          expect(formatDate('2024-08-32T12:00:00.000Z')).toBe(null);
           expect(formatDate('2024-02-30T12:00:00.000Z')).toBe(null);
    });

    it('should return null for non-string inputs', () => {
        expect(formatDate(123)).toBe(null);
        expect(formatDate(null)).toBe(null);
        expect(formatDate(undefined)).toBe(null);
        expect(formatDate({})).toBe(null);
        expect(formatDate([])).toBe(null);
    });
});


describe('sanitizeInput', () => {
  it('should encode HTML tags', () => {
    expect(sanitizeInput('<p>Test</p>')).toBe('&lt;p&gt;Test&lt;/p&gt;');
    expect(sanitizeInput('<h1>Title</h1>')).toBe('&lt;h1&gt;Title&lt;/h1&gt;');
    expect(sanitizeInput('<script>alert("XSS")</script>')).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;');
    expect(sanitizeInput('<a href="javascript:void(0)">Link</a>')).toBe('&lt;a href="javascript:void(0)"&gt;Link&lt;/a&gt;');
  });
    
    it('should handle strings with no HTML tags', () => {
        expect(sanitizeInput('This is a test string')).toBe('This is a test string');
        expect(sanitizeInput('Another test string without HTML')).toBe('Another test string without HTML');
         expect(sanitizeInput('123456')).toBe('123456');
         expect(sanitizeInput('test-string-with_underscores')).toBe('test-string-with_underscores');
    });

    it('should handle non-string inputs', () => {
        expect(sanitizeInput(123)).toBe('123');
        expect(sanitizeInput(null)).toBe('null');
        expect(sanitizeInput(undefined)).toBe('undefined');
        expect(sanitizeInput({ test: 'test' })).toBe('[object Object]');
         expect(sanitizeInput(['test', 'test2'])).toBe('test,test2');
    });
      it('should handle empty string', () => {
         expect(sanitizeInput('')).toBe('');
     });

});