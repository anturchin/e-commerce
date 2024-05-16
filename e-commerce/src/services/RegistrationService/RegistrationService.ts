import { ICustomer, IRegistrationResponse } from './types';

// TODO: getToken() (from TokenForRegistration!!!) returns {} with TOKEN
// in field .access_token, we need it in registration()
// as BEARER_TOKEN
// for registration we need BEARER_TOKEN (see above) and customer object like that
// {
//     email: string;
//     firstName: string;
//     lastName: string;
//     password: string;
// }
// all fields are necessary for registration in ct

export default class RegistrationService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async registration(
        BEARER_TOKEN: string,
        customer: ICustomer
    ): Promise<IRegistrationResponse> {
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
                throw new Error(`${resp.status}`);
            }

            return await resp.json();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
