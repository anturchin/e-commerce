import { ICustomerForLogin } from './types';
import { ICustomerResponse, IResponseFailed } from '../types';

export class AuthService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async login(
        BEARER_TOKEN: string,
        customer: ICustomerForLogin
    ): Promise<ICustomerResponse | IResponseFailed> {
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
                const data = await response.json();
                return {
                    statusCode: data.statusCode,
                    msg: data.message,
                } as IResponseFailed;
            }

            return (await response.json()) as ICustomerResponse;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
