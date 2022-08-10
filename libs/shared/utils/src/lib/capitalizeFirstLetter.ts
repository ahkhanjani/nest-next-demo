/**
 * Capitalizes the first letter of the input.
 */
export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
