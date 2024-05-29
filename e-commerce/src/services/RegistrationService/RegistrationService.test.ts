import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { RegistrationService } from './RegistrationService';
import { ICustomerResponse, IResponseFailed } from '../types';
import { ICustomer } from './types';

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('RegistrationService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return register response on successful fetch', async () => {
        const mockResponse: ICustomerResponse = {
            customer: {
                addresses: [],
                email: 'andrey@gmail.com',
                firstName: 'andrey',
                id: 'some_123_id',
                isEmailVerified: false,
                lastName: 'lebowski',
                password: '123456',
                version: 1,
                createdAt: '2015-07-06T13:22:33.339Z',
                lastModifiedAt: '2015-07-06T13:22:33.339Z',
                authenticationMode: 'Password',
                stores: [],
            },
        };

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        } as Response);

        const result = await RegistrationService.registration('test-bearer-token', {
            email: 'andrey@gmail.com',
            firstName: 'andrey',
            lastName: 'lebowski',
            password: '123456',
        } as ICustomer);
        expect(result).toEqual(mockResponse);
    });

    test('should return error response on failed fetch', async () => {
        const mockErrorResponse = {
            statusCode: 401,
            message: 'bad request',
        };

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: false,
            json: async () => mockErrorResponse,
        } as Response);

        const result = await RegistrationService.registration('test-bearer-token', {
            email: 'andrey@gmail.com',
            firstName: 'andrey',
            lastName: 'lebowski',
            password: '123456',
        } as ICustomer);
        expect(result).toEqual({
            statusCode: mockErrorResponse.statusCode,
            msg: mockErrorResponse.message,
        } as IResponseFailed);
    });

    test('should throw an error on fetch failure', async () => {
        const mockError = new Error('network error');
        (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(mockError);
        await expect(
            RegistrationService.registration('test-bearer-token', {
                email: 'andrey@gmail.com',
                firstName: 'andrey',
                lastName: 'lebowski',
                password: '123456',
            } as ICustomer)
        ).rejects.toThrow(mockError);
    });
});
