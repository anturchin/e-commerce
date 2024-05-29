import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { TokenForRegistration } from './TokenForRegistration';
import { ITokenResponse } from './types';
import { IResponseFailed } from '../types';

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('TokenForRegistration', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return token response on successful fetch', async () => {
        const mockResponse: ITokenResponse = {
            access_token: 'test_access_token',
            expires_in: 3600,
            scope: 'test_scope',
            token_type: 'Bearer',
        };
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        } as Response);

        const result = await TokenForRegistration.getToken();
        expect(result).toEqual(mockResponse);
    });

    test('should return error response on failed fetch with status', async () => {
        const mockErrorResponse = {
            statusCode: 400,
            message: 'Bad Request',
        };

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: false,
            json: async () => mockErrorResponse,
        } as Response);
        const result = await TokenForRegistration.getToken();
        expect(result).toEqual({
            statusCode: mockErrorResponse.statusCode,
            msg: mockErrorResponse.message,
        } as IResponseFailed);
    });

    test('should throw an error on fetch failure', async () => {
        const mockError = new Error('Network error');
        (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(mockError);

        await expect(TokenForRegistration.getToken()).rejects.toThrow(mockError);
    });
});
