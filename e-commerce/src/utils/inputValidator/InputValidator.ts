export class InputValidator {
    public static isValidEmail(email: string): boolean {
        if (email !== email.trim()) {
            return false;
        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    public static isValidPassword(password: string): boolean {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasNoSpaces = /^\S+$/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasDigit &&
            hasNoSpaces &&
            hasSpecialChar
        );
    }
}
