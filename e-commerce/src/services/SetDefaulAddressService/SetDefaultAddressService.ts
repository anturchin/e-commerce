import { IAddress } from '../types';

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
    ) {
        const action = `setDefault${addressType}Address`;

        const req = {
            version: version + 1,
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
                throw new Error(`${res.status}`);
            }

            return res.json();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
