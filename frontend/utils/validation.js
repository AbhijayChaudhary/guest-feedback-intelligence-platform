/**
 * Validation Helper Functions
 */

/**
 * Validates a guest name based on formatting requirements.
 * Name is required, must not be only whitespaces, numbers, or special symbols,
 * and must contain at least one alphabetic character.
 * 
 * @param {string} name - The guest name to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
export function isValidGuestName(name) {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (!trimmed) return false;
  return /[a-zA-Z]/.test(trimmed);
}
