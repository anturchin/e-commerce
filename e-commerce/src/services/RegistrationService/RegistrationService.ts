import { ICustomer } from './types';
import { ICustomerResponse, ICustomerResponseFailed } from '../types';

export class RegistrationService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async registration(
        BEARER_TOKEN: string,
        customer: ICustomer
    ): Promise<ICustomerResponse | ICustomerResponseFailed> {
        const REG_URL = `${this.API_URL}/${this.projectKey}/customers`;

        try {
            const resp = await fetch(REG_URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(customer),
            });

            if (!resp.ok) {
                const data = await resp.json();
                return {
                    statusCode: data.statusCode,
                    msg: data.message,
                } as ICustomerResponseFailed;
            }

            return (await resp.json()) as ICustomerResponse;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
