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
});
