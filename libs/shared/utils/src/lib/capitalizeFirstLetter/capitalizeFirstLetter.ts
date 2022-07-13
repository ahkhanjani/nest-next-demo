/**
 * Capitalizes the first letter of the input.
 */
export const capitalizeFirstLetter = (str: string): string | null =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : null;
