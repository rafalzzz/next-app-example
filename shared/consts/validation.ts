export const FIRST_NAME_VALIDATION = /(^[a-zA-Z][a-zA-Z\s]{0,40}[a-zA-Z]$)/;
export const LAST_NAME_VALIDATION = /(^[a-zA-Z][a-zA-Z\s\-']{0,40}[a-zA-Z]$)/;
export const EMAIL_VALIDATION =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const NAME_ON_CARD_VALIDATION = /^[A-Z -]+$/;
export const DIGITS_ONLY = /^[0-9 ]+$/;
export const STRING_INCLUDES_SPECIAL_CHARACTERS = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
export const STRING_INCLUDES_UNDERSCORE_SIGN = /^[^_]*$/;

export const PASSWORD_VALIDATION = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,64}$/g;
export const REGEX_PASSWORD_LENGTH = /.{8,}/;
export const REGEX_PASSWORD_NUMBER = /[0-9]/;
export const REGEX_PASSWORD_CAPITAL_LETTER = /[A-Z]/;
