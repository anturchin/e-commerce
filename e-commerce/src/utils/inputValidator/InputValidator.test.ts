import { describe, expect, test } from '@jest/globals';
import { InputValidator } from './InputValidator';

describe('InputValidator', () => {
    describe('isValidEmail', () => {
        test('should return true for valid email', () => {
            expect(InputValidator.isValidEmail('user@example.com')).toBe(true);
        });

        test('should return false for email without "@"', () => {
            expect(InputValidator.isValidEmail('userexample.com')).toBe(false);
        });

        test('should return false for email without domain', () => {
            expect(InputValidator.isValidEmail('user@')).toBe(false);
        });

        test('should return false for email with spaces', () => {
            expect(InputValidator.isValidEmail(' user@example.com ')).toBe(false);
        });

        test('should return false for email with invalid format', () => {
            expect(InputValidator.isValidEmail('user@example')).toBe(false);
        });
    });

    describe('isValidPassword', () => {
        test('should return true for valid password', () => {
            expect(InputValidator.isValidPassword('Password1!')).toBe(true);
        });

        test('should return false for password shorter than 8 characters', () => {
            expect(InputValidator.isValidPassword('Pass1!')).toBe(false);
        });

        test('should return false for password without uppercase letter', () => {
            expect(InputValidator.isValidPassword('password1!')).toBe(false);
        });

        test('should return false for password without lowercase letter', () => {
            expect(InputValidator.isValidPassword('PASSWORD1!')).toBe(false);
        });

        test('should return false for password without digit', () => {
            expect(InputValidator.isValidPassword('Password!')).toBe(false);
        });

        test('should return false for password with spaces', () => {
            expect(InputValidator.isValidPassword(' Password1! ')).toBe(false);
        });

        test('should return false for password without special character', () => {
            expect(InputValidator.isValidPassword('Password1')).toBe(false);
        });
    });

    describe('isValidSurname', () => {
        test('should return true for valid surname', () => {
            expect(InputValidator.isValidSurname('Smith')).toBe(true);
        });

        test('should return true for valid multi-part surname', () => {
            expect(InputValidator.isValidSurname('van der Waals')).toBe(true);
        });

        test('should return false for surname with numbers', () => {
            expect(InputValidator.isValidSurname('Smith123')).toBe(false);
        });

        test('should return false for surname with special characters', () => {
            expect(InputValidator.isValidSurname('Smith!')).toBe(false);
        });

        test('should return false for empty surname', () => {
            expect(InputValidator.isValidSurname('')).toBe(false);
        });
    });

    describe('isValidName', () => {
        test('should return true for valid name', () => {
            expect(InputValidator.isValidName('John')).toBe(true);
        });

        test('should return true for valid multi-part name', () => {
            expect(InputValidator.isValidName('John Doe')).toBe(true);
        });

        test('should return false for name with numbers', () => {
            expect(InputValidator.isValidName('John123')).toBe(false);
        });

        test('should return false for name with special characters', () => {
            expect(InputValidator.isValidName('John!')).toBe(false);
        });

        test('should return false for empty name', () => {
            expect(InputValidator.isValidName('')).toBe(false);
        });
    });

    describe('isValidStreet', () => {
        test('should return true for valid street', () => {
            expect(InputValidator.isValidStreet('123 Main St')).toBe(true);
        });

        test('should return false for empty street', () => {
            expect(InputValidator.isValidStreet('')).toBe(false);
        });
    });

    describe('isValidCity', () => {
        test('should return true for valid city', () => {
            expect(InputValidator.isValidCity('New York')).toBe(true);
        });

        test('should return false for city with numbers', () => {
            expect(InputValidator.isValidCity('New York123')).toBe(false);
        });

        test('should return false for city with special characters', () => {
            expect(InputValidator.isValidCity('New York!')).toBe(false);
        });

        test('should return false for empty city', () => {
            expect(InputValidator.isValidCity('')).toBe(false);
        });
    });

    describe('isValidBirthdate', () => {
        test('should return true for valid birthdate with age over 13', () => {
            const thirteenYearsAgo = new Date();
            thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 14);
            expect(
                InputValidator.isValidBirthdate(thirteenYearsAgo.toISOString().split('T')[0])
            ).toBe(true);
        });

        test('should return false for valid birthdate with age under 13', () => {
            const twelveYearsAgo = new Date();
            twelveYearsAgo.setFullYear(twelveYearsAgo.getFullYear() - 12);
            expect(
                InputValidator.isValidBirthdate(twelveYearsAgo.toISOString().split('T')[0])
            ).toBe(false);
        });

        test('should return false for invalid birthdate format', () => {
            expect(InputValidator.isValidBirthdate('invalid-date')).toBe(false);
        });
    });

    describe('isValidPostalCode', () => {
        test('should return true for valid US postal code', () => {
            expect(InputValidator.isValidPostalCode('US', '12345')).toBe(true);
            expect(InputValidator.isValidPostalCode('US', '12345-6789')).toBe(true);
        });

        test('should return false for valid US postal code', () => {
            expect(InputValidator.isValidPostalCode('US', '125')).toBe(false);
            expect(InputValidator.isValidPostalCode('US', '12345-679')).toBe(false);
            expect(InputValidator.isValidPostalCode('US', '')).toBe(false);
        });

        test('should return true for valid Russian postal code', () => {
            expect(InputValidator.isValidPostalCode('RU', '101000')).toBe(true);
        });

        test('should return false for valid Russian postal code', () => {
            expect(InputValidator.isValidPostalCode('RU', '1010')).toBe(false);
            expect(InputValidator.isValidPostalCode('RU', '')).toBe(false);
        });

        test('should return false for invalid postal code', () => {
            expect(InputValidator.isValidPostalCode('Invalid Country', '12345')).toBe(false);
        });
    });

    describe('isValidHouse', () => {
        test('should return true for valid house number with only digits', () => {
            expect(InputValidator.isValidHouse('123')).toBe(true);
        });

        test('should return true for valid house number with digits and letters', () => {
            expect(InputValidator.isValidHouse('123A')).toBe(true);
        });

        test('should return true for valid house number with digits, letters, and slash', () => {
            expect(InputValidator.isValidHouse('123/4')).toBe(true);
            expect(InputValidator.isValidHouse('123A/4B')).toBe(true);
        });

        test('should return false for invalid house number with special characters', () => {
            expect(InputValidator.isValidHouse('123@')).toBe(false);
            expect(InputValidator.isValidHouse('123A#')).toBe(false);
        });

        test('should return false for invalid house number starting with letters', () => {
            expect(InputValidator.isValidHouse('A123')).toBe(false);
        });

        test('should return false for empty string', () => {
            expect(InputValidator.isValidHouse('')).toBe(false);
        });

        test('should return false for house number with spaces', () => {
            expect(InputValidator.isValidHouse('123 A')).toBe(false);
        });
    });
});
