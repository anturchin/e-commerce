import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { ICart } from '../CartService/types';
import { CartCreateService } from './CartCreateService';
import { IResponseFailed } from '../types';

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('AuthService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return cart response on successful', async () => {
        const stateType = {
            typeId: 'string',
            id: 'string',
        };

        const state = {
            quantity: 1,
            state: stateType,
        };

        const dimensions = {
            w: 1,
            h: 1,
        };

        const image = {
            url: 'string',
            dimensions,
        };

        const value = {
            type: 'string',
            fractionDigits: 1,
            currencyCode: 'string',
            centAmount: 1,
        };

        const price = {
            value,
            id: 'string',
            centAmount: 1,
        };

        const variant = {
            id: 1,
            sku: 'string',
            prices: [price],
            images: [image],
            attributes: [''],
            assets: [''],
        };

        const productType = {
            typeId: 'string',
            id: 'string',
            version: 1,
        };

        const lineItem = {
            id: 'string',
            productId: 'string',
            name: { name: 'name' },
            productType,
            productSlug: { product: 'product' },
            variant,
            price,
            quantity: 1,
            discountedPricePerQuantity: [''],
            state: [state],
            priceMode: 'string',
            lineItemMode: 'string',
            totalPrice: price,
            perMethodTaxRate: [''],
            taxedPricePortions: [''],
        };

        const mockResponse: ICart = {
            type: 'string',
            id: 'string',
            version: 1,
            createdAt: 'string',
            lastModifiedAt: 'string',
            lineItems: [lineItem],
            cartState: 'string',
            totalPrice: price,
            customLineItems: [''],
            discountCodes: [''],
            directDiscounts: [''],
            inventoryMode: 'string',
            taxMode: 'string',
            taxRoundingMode: 'string',
            taxCalculationMode: 'string',
            refusedGifts: [''],
            origin: 'string',
            itemShippingAddresses: [''],
            shipping: [''],
            shippingMode: 'string',
        };

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        } as Response);

        const result = await CartCreateService.createCart('test-bearer-token');
        expect(result).toEqual(mockResponse);
    });

    test('should return error response on failed cart', async () => {
        const mockErrorResponse = {
            statusCode: 404,
            message: 'not found',
        };

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: false,
            json: async () => mockErrorResponse,
        } as Response);

        const result = await CartCreateService.createCart('test-bearer-token');
        expect(result).toEqual({
            statusCode: mockErrorResponse.statusCode,
            msg: mockErrorResponse.message,
        } as IResponseFailed);
    });

    test('should throw an error on fetch failure', async () => {
        const mockError = new Error('Network error');
        (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(mockError);
        await expect(CartCreateService.createCart('test-bearer-token')).rejects.toThrow(mockError);
    });
});
