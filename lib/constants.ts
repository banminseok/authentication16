export const USERNAME_MIN_LENGTH = 5;
export const USERNAME_MAX_LENGTH = 10;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const EMAIL_REGEX = new RegExp(
  /^[a-zA-Z0-9._-]+@zod\.com$/
);

