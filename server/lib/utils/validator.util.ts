export const isValidString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

export const isValidEmail = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(value.trim());
};

export const isValidNumber = (value: unknown): boolean => {
  if (typeof value === 'number') {
    return !isNaN(value);
  }

  if (typeof value === 'string') {
    return value.trim() !== '' && !isNaN(Number(value));
  }

  return false;
};
