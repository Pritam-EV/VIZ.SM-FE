
// ============================================
// frontend/src/utils/classNames.js
// ============================================

/**
 * Utility function to combine className strings
 * Similar to 'classnames' library
 */

export const classNames = (...classes) => {
  return classes
    .filter(Boolean)
    .flat()
    .map((cls) => (typeof cls === 'string' ? cls.trim() : ''))
    .filter(Boolean)
    .join(' ');
};
