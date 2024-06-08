import { UserDataType } from './types';

export class LocalStorageManager {
    public static saveUserData(userData: UserDataType): void {
        const userDataJson = JSON.stringify(userData);
        localStorage.setItem('userData', userDataJson);
    }

    public static getUserData(): UserDataType | null {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            return JSON.parse(userDataString);
        }
        return null;
    }

    public static removeUserData(): void {
        localStorage.removeItem('userData');
    }

    public static saveToken(token: string): void {
        localStorage.setItem('authToken', token);
    }

    public static getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    public static removeToken(): void {
        localStorage.removeItem('authToken');
    }

    public static saveProduct(id: string): void {
        localStorage.setItem('cart', id);
    }

    public static getProduct(): string | null {
        return localStorage.getItem('cart');
    }

    public static removeProduct(): void {
        localStorage.removeItem('cart');
    }

    public static getCartId(): string | null {
        return localStorage.getItem('cartId');
    }

    public static saveCartId(id: string): void {
        localStorage.setItem('cartId', id);
    }
}
