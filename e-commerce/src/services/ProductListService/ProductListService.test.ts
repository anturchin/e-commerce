import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { ProductListService } from './ProductListService';
import { IProductResponse } from './types';
import { IResponseFailed } from '../types';

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('ProductListService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return product-list response on successful fetch', async () => {
        const mockResponse: IProductResponse = {
            limit: 20,
            offset: 0,
            count: 1,
            total: 1,
            results: [
                {
                    id: 'e7ba4c75-b1bb-483d-94d8-2c4a10f78472',
                    masterData: {
                        current: {
                            categories: [
                                {
                                    id: 'cf6d790a-f027-4f46-9a2b-4bc9a31066fb',
                                    typeId: 'category',
                                },
                            ],
                            description: {
                                en: 'Sample description',
                                ru: 'Ru description',
                            },
                            masterVariant: {
                                attributes: [],
                                id: 1,
                                images: [
                                    {
                                        dimensions: {
                                            h: 1400,
                                            w: 1400,
                                        },
                                        url: 'https://commercetools.com/cli/data/253245821_1.jpg',
                                    },
                                ],
                                prices: [
                                    {
                                        value: {
                                            type: 'centPrecision',
                                            fractionDigits: 2,
                                            centAmount: 10000,
                                            currencyCode: 'EUR',
                                        },
                                        id: '753472a3-ddff-4e0f-a93b-2eb29c90ba54',
                                    },
                                ],
                                sku: 'sku_MB_PREMIUM_TECH_T_variant1_1369226795424',
                            },
                            name: {
                                en: 'MB PREMIUM TECH T',
                                ru: 'Ru name',
                            },
                            slug: {
                                en: 'mb-premium-tech-t1369226795424',
                                ru: 'ru slug',
                            },
                            variants: [],
                            searchKeywords: [],
                        },
                        hasStagedChanges: false,
                        published: true,
                        staged: {
                            categories: [
                                {
                                    id: 'cf6d790a-f027-4f46-9a2b-4bc9a31066fb',
                                    typeId: 'category',
                                },
                            ],
                            description: {
                                en: 'Sample description',
                                ru: 'ru description',
                            },
                            masterVariant: {
                                attributes: [],
                                id: 1,
                                images: [
                                    {
                                        dimensions: {
                                            h: 1400,
                                            w: 1400,
                                        },
                                        url: 'https://commercetools.com/cli/data/253245821_1.jpg',
                                    },
                                ],
                                prices: [
                                    {
                                        value: {
                                            type: 'centPrecision',
                                            fractionDigits: 2,
                                            centAmount: 10000,
                                            currencyCode: 'EUR',
                                        },
                                        id: '753472a3-ddff-4e0f-a93b-2eb29c90ba54',
                                    },
                                ],
                                sku: 'sku_MB_PREMIUM_TECH_T_variant1_1369226795424',
                            },
                            name: {
                                en: 'MB PREMIUM TECH T',
                                ru: 'ru name',
                            },
                            slug: {
                                en: 'mb-premium-tech-t1369226795424',
                                ru: 'ru slug',
                            },
                            variants: [],
                            searchKeywords: '',
                        },
                    },
                    productType: {
                        id: '24f510c3-f334-4099-94e2-d6224a8eb919',
                        typeId: 'product-type',
                    },
                    taxCategory: {
                        id: 'f1e10e3a-45eb-49d8-ad0b-fdf984202f59',
                        typeId: 'tax-category',
                    },
                    version: 2,
                    createdAt: '1970-01-01T00:00:00.001Z',
                    lastModifiedAt: '1970-01-01T00:00:00.001Z',
                },
            ],
        };

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        } as Response);

        const result = await ProductListService.getProductList('test-bearer-token');
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

        const result = await ProductListService.getProductList('test-bearer-token');
        expect(result).toEqual({
            statusCode: mockErrorResponse.statusCode,
            msg: mockErrorResponse.message,
        } as IResponseFailed);
    });

    test('should throw an error on fetch failure', async () => {
        const mockError = new Error('network error');
        (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(mockError);
        await expect(ProductListService.getProductList('test-bearer-token')).rejects.toThrow(
            mockError
        );
    });

    test('should return product with id response on successful fetch', async () => {
        const mockResponse = {
            id: 'e7ba4c75-b1bb-483d-94d8-2c4a10f78472',
            masterData: {
                current: {
                    categories: [
                        {
                            id: 'cf6d790a-f027-4f46-9a2b-4bc9a31066fb',
                            typeId: 'category',
                        },
                    ],
                    description: {
                        en: 'Sample description',
                        ru: 'Ru description',
                    },
                    masterVariant: {
                        attributes: [],
                        id: 1,
                        images: [
                            {
                                dimensions: {
                                    h: 1400,
                                    w: 1400,
                                },
                                url: 'https://commercetools.com/cli/data/253245821_1.jpg',
                            },
                        ],
                        prices: [
                            {
                                value: {
                                    type: 'centPrecision',
                                    fractionDigits: 2,
                                    centAmount: 10000,
                                    currencyCode: 'EUR',
                                },
                                id: '753472a3-ddff-4e0f-a93b-2eb29c90ba54',
                            },
                        ],
                        sku: 'sku_MB_PREMIUM_TECH_T_variant1_1369226795424',
                    },
                    name: {
                        en: 'MB PREMIUM TECH T',
                        ru: 'Ru name',
                    },
                    slug: {
                        en: 'mb-premium-tech-t1369226795424',
                        ru: 'ru slug',
                    },
                    variants: [],
                    searchKeywords: [],
                },
                hasStagedChanges: false,
                published: true,
                staged: {
                    categories: [
                        {
                            id: 'cf6d790a-f027-4f46-9a2b-4bc9a31066fb',
                            typeId: 'category',
                        },
                    ],
                    description: {
                        en: 'Sample description',
                        ru: 'ru description',
                    },
                    masterVariant: {
                        attributes: [],
                        id: 1,
                        images: [
                            {
                                dimensions: {
                                    h: 1400,
                                    w: 1400,
                                },
                                url: 'https://commercetools.com/cli/data/253245821_1.jpg',
                            },
                        ],
                        prices: [
                            {
                                value: {
                                    type: 'centPrecision',
                                    fractionDigits: 2,
                                    centAmount: 10000,
                                    currencyCode: 'EUR',
                                },
                                id: '753472a3-ddff-4e0f-a93b-2eb29c90ba54',
                            },
                        ],
                        sku: 'sku_MB_PREMIUM_TECH_T_variant1_1369226795424',
                    },
                    name: {
                        en: 'MB PREMIUM TECH T',
                        ru: 'ru name',
                    },
                    slug: {
                        en: 'mb-premium-tech-t1369226795424',
                        ru: 'ru slug',
                    },
                    variants: [],
                    searchKeywords: '',
                },
            },
            productType: {
                id: '24f510c3-f334-4099-94e2-d6224a8eb919',
                typeId: 'product-type',
            },
            taxCategory: {
                id: 'f1e10e3a-45eb-49d8-ad0b-fdf984202f59',
                typeId: 'tax-category',
            },
            version: 2,
            createdAt: '1970-01-01T00:00:00.001Z',
            lastModifiedAt: '1970-01-01T00:00:00.001Z',
        };

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        } as Response);

        const result = await ProductListService.getProductList('test-bearer-token', 'id');
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

        const result = await ProductListService.getProductList('test-bearer-token', 'id');
        expect(result).toEqual({
            statusCode: mockErrorResponse.statusCode,
            msg: mockErrorResponse.message,
        } as IResponseFailed);
    });

    test('should throw an error on fetch failure', async () => {
        const mockError = new Error('network error');
        (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(mockError);
        await expect(ProductListService.getProductList('test-bearer-token', 'id')).rejects.toThrow(
            mockError
        );
    });
});
