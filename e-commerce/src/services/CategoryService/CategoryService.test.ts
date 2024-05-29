import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { CategoryService } from './CategoryService';
import { ICategoryResponse } from './types';
import { IResponseFailed } from '../types';

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('CategoryService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return category response on successful fetch', async () => {
        const mockResponse: ICategoryResponse = {
            limit: 20,
            offset: 0,
            count: 2,
            total: 2,
            results: [
                {
                    id: 'c2f93298-c967-44af-8c2a-d2220bf39eb2',
                    version: 1,
                    name: {
                        ru: 'Hats',
                    },
                    slug: {
                        ru: 'hats',
                    },
                    ancestors: [
                        {
                            typeId: 'category',
                            id: '123456',
                        },
                    ],
                    orderHint: '0.1',
                    createdAt: '1970-01-01T00:00:00.001Z',
                    lastModifiedAt: '1970-01-01T00:00:00.001Z',
                },
            ],
        };

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        } as Response);

        const result = await CategoryService.getCategoryList('test-bearer-token');
        expect(result).toEqual(mockResponse);
    });

    test('should return error response on failed fetch', async () => {
        const mockErrorResponse = {
            statusCode: 401,
            message: 'failed fetch',
        };

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: false,
            json: async () => mockErrorResponse,
        } as Response);

        const result = await CategoryService.getCategoryList('test-bearer-token');
        expect(result).toEqual({
            statusCode: mockErrorResponse.statusCode,
            msg: mockErrorResponse.message,
        } as IResponseFailed);
    });

    test('should throw an error on fetch failure', async () => {
        const mockError = new Error('Network error');
        (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(mockError);
        await expect(CategoryService.getCategoryList('test-bearer-token')).rejects.toThrow(
            mockError
        );
    });
});
