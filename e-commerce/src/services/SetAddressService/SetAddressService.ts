import { IAddress, ICustomerResponse, ICustomerResponseFailed } from '../types';

// TODO: TOKEN - bearer token from TokerForRegistration
// TODO: id - customer id from customer auth or registration (obj.customer.id)
// TODO: version - customer from customer auth or registration (obj.customer.version)
// TODO: address - address to add

export class SetAddressService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async addAddress(
        TOKEN: string,
        id: string,
        version: number,
        address: IAddress
    ): Promise<ICustomerResponseFailed | ICustomerResponse> {
        try {
            const addAddress = {
                version,
                actions: [
                    {
                        action: 'addAddress',
                        address: {
                            streetName: address.streetName,
                            streetNumber: address.streetNumber,
                            postalCode: address.postalCode,
                            city: address.city,
                            country: address.country,
                        },
                    },
                ],
            };
            const res = await fetch(`${this.API_URL}/${this.projectKey}/customers/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify(addAddress),
            });
            if (!res.ok) {
                const data = await res.json();
                return {
                    statusCode: data.statusCode,
                    msg: data.message,
                } as ICustomerResponseFailed;
            }

            return (await res.json()) as ICustomerResponse;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
