import { ICustomerForLogin, ILoginResponse } from './types';

export class AuthService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async login(BEARER_TOKEN: string, customer: ICustomerForLogin): Promise<ILoginResponse> {
        const LOGIN_URL = `${this.API_URL}/${this.projectKey}/login`;

        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
            });

            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
