export class InputValidator {
    public static isValidPostalCode(country: string, postalCode: string): boolean {
        switch (country) {
            case 'United States': {
                const regexUS = /^\d{5}(?:[-\s]\d{4})?$/;
                return regexUS.test(postalCode);
            }
            case 'Russia': {
                const regexRU = /^\d{6}$/;
                return regexRU.test(postalCode);
            }
            default:
                return false;
        }
    }

    public static isValidCountry(country: string): boolean {
        return country === 'United States' || country === 'Russia';
    }

    public static isValidBirthdate(birthdate: string, minAge: number = 13): boolean {
        const birthdateDate = new Date(birthdate);
        const today = new Date();
        const age = today.getFullYear() - birthdateDate.getFullYear();
        const monthDifference = today.getMonth() - birthdateDate.getMonth();
        const dayDifference = today.getDate() - birthdateDate.getDate();

        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            return age - 1 >= minAge;
        }
        return age >= minAge;
    }

    public static isValidCity(city: string): boolean {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(city);
    }

    public static isValidStreet(street: string): boolean {
        return street.length > 0;
    }

    public static isValidSurname(surname: string): boolean {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(surname) && /[a-zA-Z]/.test(surname);
    }

    public static isValidName(name: string): boolean {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(name) && /[a-zA-Z]/.test(name);
    }

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
