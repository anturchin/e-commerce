import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { SetAddressService } from '../SetAddressService/SetAddressService';
import { ICustomerUpdateAddress } from '../SetAddressService/types';
import { IResponseFailed } from '../types';

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('SetDefaultAddressService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return update default address response on successful fetch', async () => {
        const mockResponse: ICustomerUpdateAddress = {
            id: '3cdcdcc8-80c5-41bb-abb5-ac8772c9cc24',
            version: 1,
            createdAt: '2022-09-19T14:34:35.843Z',
            lastModifiedAt: '2022-09-19T14:34:35.843Z',
            lastModifiedBy: {
                clientId: 'P1Xf1NG2YsFqH2LC31oveDWT',
                isPlatformClient: false,
            },
            createdBy: {
                clientId: 'P1Xf1NG2YsFqH2LC31oveDWT',
                isPlatformClient: false,
            },
            email: 'johndoe@example.com',
            firstName: 'John',
            lastName: 'Doe',
            password: '****aGg=',
            addresses: [],
            shippingAddressIds: [],
            billingAddressIds: [],
            isEmailVerified: false,
            stores: [],
            authenticationMode: 'Password',
        };

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        } as Response);

        const result = await SetAddressService.addAddress(
            'test-bearer-token',
            '3cdcdcc8-80c5-41bb-abb5-ac8772c9cc24',
            1,
            {
                streetName: 'big-street',
                streetNumber: '13',
                postalCode: '123654',
                city: 'spb',
                country: 'RU',
            }
        );
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

        const result = await SetAddressService.addAddress(
            'test-bearer-token',
            '3cdcdcc8-80c5-41bb-abb5-ac8772c9cc24',
            1,
            {
                streetName: 'big-street',
                streetNumber: '13',
                postalCode: '123654',
                city: 'spb',
                country: 'RU',
            }
        );
        expect(result).toEqual({
            statusCode: mockErrorResponse.statusCode,
            msg: mockErrorResponse.message,
        } as IResponseFailed);
    });

    test('should throw an error on fetch failure', async () => {
        const mockError = new Error('network error');
        (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(mockError);
        await expect(
            SetAddressService.addAddress(
                'test-bearer-token',
                '3cdcdcc8-80c5-41bb-abb5-ac8772c9cc24',
                1,
                {
                    streetName: 'big-street',
                    streetNumber: '13',
                    postalCode: '123654',
                    city: 'spb',
                    country: 'RU',
                }
            )
        ).rejects.toThrow(mockError);
    });
});
