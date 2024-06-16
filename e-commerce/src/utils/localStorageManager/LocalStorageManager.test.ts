import { describe, expect, test, beforeEach } from '@jest/globals';
import { LocalStorageManager } from './LocalStorageManager';
import { UserDataType } from './types';

const localStorageMock = (() => {
    let store: Record<string, string> = {};

    const localStorageApi: Partial<Storage> = {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
        key: (index: number) => {
            const keys = Object.keys(store);
            return keys[index] || null;
        },
        get length() {
            return Object.keys(store).length;
        },
    };

    return localStorageApi as Storage;
})();

global.localStorage = localStorageMock;

describe('LocalStorageManager', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should save user data', () => {
        const userData: UserDataType = { firstName: 'string', id: 'id' };
        LocalStorageManager.saveUserData(userData);
        const user = LocalStorageManager.getUserData();
        expect(user).toEqual(userData);
    });

    test('should remove user data', () => {
        const userData: UserDataType = { firstName: 'string', id: 'id' };
        LocalStorageManager.saveUserData(userData);
        LocalStorageManager.removeUserData();
        const user = LocalStorageManager.getUserData();
        expect(user).toBeNull();
    });

    test('should save token', () => {
        const authToken = 'token';
        LocalStorageManager.saveToken(authToken);
        const token = LocalStorageManager.getToken();
        expect(token).toBe(authToken);
    });

    test('should save product', () => {
        const productId = 'product-id';
        LocalStorageManager.saveProduct(productId);
        const product = LocalStorageManager.getProduct();
        expect(product).toBe(productId);
    });

    test('should delete product', () => {
        const productId = 'product-id';
        LocalStorageManager.saveProduct(productId);
        LocalStorageManager.removeProduct();
        const product = LocalStorageManager.getProduct();
        expect(product).toBeNull();
    });

    test('should save cartId', () => {
        const cartId = 'cartId';
        LocalStorageManager.saveCartId(cartId);
        const cart = LocalStorageManager.getCartId();
        expect(cart).toBe(cartId);
    });

    test('should delete cartId', () => {
        const cartId = 'cartId';
        LocalStorageManager.saveCartId(cartId);
        LocalStorageManager.removeCart();
        const cart = LocalStorageManager.getCartId();
        expect(cart).toBeNull();
    });
});
