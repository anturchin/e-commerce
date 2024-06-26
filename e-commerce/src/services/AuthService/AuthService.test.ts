import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { ICustomerResponse, IResponseFailed } from '../types';
import { AuthService } from './AuthService';
import { ICustomerForLogin } from './types';

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('AuthService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return customer response on successful login', async () => {
        const mockResponse: ICustomerResponse = {
            customer: {
                addresses: [{ country: 'US', id: '1' }],
                email: 'test@test.com',
                firstName: 'john',
                id: 'customer-id',
                isEmailVerified: true,
                lastName: 'smith',
                password: 'password',
                version: 1,
                createdAt: '2023-01-01',
                lastModifiedAt: '2023-01-01',
                authenticationMode: 'password',
                stores: [{ typeId: 'store', key: 'store-key' }],
            },
        };

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        } as Response);

        const result = await AuthService.login('test-bearer-token', {
            email: 'test@test.com',
            password: 'password',
        } as ICustomerForLogin);
        expect(result).toEqual(mockResponse);
    });

    test('should return error response on failed login', async () => {
        const mockErrorResponse = {
            statusCode: 401,
            message: 'Unauthorized',
        };

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: false,
            json: async () => mockErrorResponse,
        } as Response);

        const result = await AuthService.login('test-bearer-token', {
            email: 'test@example.com',
            password: 'wrong-password',
        } as ICustomerForLogin);
        expect(result).toEqual({
            statusCode: mockErrorResponse.statusCode,
            msg: mockErrorResponse.message,
        } as IResponseFailed);
    });

    test('should throw an error on fetch failure', async () => {
        const mockError = new Error('Network error');
        (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(mockError);
        await expect(
            AuthService.login('test-bearer-token', {
                email: 'test@example.com',
                password: 'password',
            } as ICustomerForLogin)
        ).rejects.toThrow(mockError);
    });
});
