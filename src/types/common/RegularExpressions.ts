export const EMAIL_REG_EXP =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Must contain at least one number and one uppercase and lowercase letter, and at least 7 or more characters
 */
export const PASSWORD_REG_EXP =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;

/**
 * Must contain from 11 up to 13 characters
 * Valid formats: +31636363634, 1234567890, 075-63546725, 123-456-7890, (123)456-7890, (123) 456-7890, 123.456.7890
 */
// eslint-disable-next-line no-useless-escape
export const PHONE_REG_EXP =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

