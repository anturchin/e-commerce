import { IAddress, ICustomerResponse, ICustomerResponseFailed } from '../types';

// TODO: address - response obj from addAddress().addresses[index of address]
// TODO: id - customer id
// TODO: version - customer version

export class SetDefaultAddressService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async setDefaultAddress(
        addressType: 'Shipping' | 'Billing',
        TOKEN: string,
        id: string,
        version: number,
        address: IAddress
    ): Promise<ICustomerResponse | ICustomerResponseFailed> {
        const action = `setDefault${addressType}Address`;

        const req = {
            version,
            actions: [
                {
                    action,
                    addressId: address.id,
                },
            ],
        };

        try {
            const res = await fetch(`${this.API_URL}/${this.projectKey}/customers/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify(req),
            });

            if (!res.ok) {
                const data = await res.json();
                return {
                    statusCode: data.statusCode,
                    msg: data.message,
                } as ICustomerResponseFailed;
            }

            return (await res.json()) as ICustomerResponse;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
