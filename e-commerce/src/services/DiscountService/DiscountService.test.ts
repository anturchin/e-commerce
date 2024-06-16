import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { IDiscountResponse } from './types';
import { DiscountService } from './DiscountService';
import { IResponseFailed } from '../types';

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('DiscountService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return discount response on successful fetch', async () => {
        const mockResponse: IDiscountResponse = {
            limit: 20,
            offset: 0,
            count: 2,
            total: 2,
            results: [
                {
                    id: 'd7a204f9-7746-4857-b17e-71f1235a691a',
                    version: 2,
                    value: {
                        type: 'absolute',
                        money: [
                            {
                                type: 'centPrecision',
                                fractionDigits: 2,
                                currencyCode: 'EUR',
                                centAmount: 100,
                            },
                        ],
                    },
                    predicate: '1=1',
                    name: {
                        en: 'test-discount1',
                    },
                    description: {
                        en: 'test-discount1',
                    },
                    isActive: false,
                    sortOrder: '0.9534',
                    references: [],
                    createdAt: '2016-02-24T09:44:57.858Z',
                    lastModifiedAt: '2016-02-24T09:44:57.939Z',
                },
                {
                    id: '29cc032d-8ee3-4763-b2ab-3fe0dda22a2d',
                    version: 2,
                    value: {
                        type: 'absolute',
                        money: [
                            {
                                type: 'centPrecision',
                                fractionDigits: 2,
                                currencyCode: 'EUR',
                                centAmount: 100,
                            },
                        ],
                    },
                    predicate: '1=1',
                    name: {
                        en: 'test-discount2',
                    },
                    description: {
                        en: 'test-discount2',
                    },
                    isActive: false,
                    sortOrder: '0.9478',
                    references: [],
                    createdAt: '2016-02-24T10:25:04.206Z',
                    lastModifiedAt: '2016-02-24T10:25:04.295Z',
                },
            ],
        };

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        } as Response);

        const result = await DiscountService.getDiscounts('test-bearer-token');
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

        const result = await DiscountService.getDiscounts('test-bearer-token');
        expect(result).toEqual({
            statusCode: mockErrorResponse.statusCode,
            msg: mockErrorResponse.message,
        } as IResponseFailed);
    });

    test('should throw an error on fetch failure', async () => {
        const mockError = new Error('network error');
        (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(mockError);
        await expect(DiscountService.getDiscounts('test-bearer-token')).rejects.toThrow(mockError);
    });
});
