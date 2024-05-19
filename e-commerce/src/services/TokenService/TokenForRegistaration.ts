import { ITokenResponce } from './types';
import { ICustomerResponseFailed } from '../types';

export class TokenForRegistration {
    private static readonly clientID: string = 'hRGagGlXqckAWUF1-I1Hkzrk';

    private static readonly clientSecret: string = 'qCgigNxcu7qi7RyfaEX6YWF8EIIpksCT';

    private static readonly scope: string =
        'manage_project:fad-team manage_api_clients:fad-team view_api_clients:fad-team';

    private static readonly AUTH_URL: string = 'https://auth.europe-west1.gcp.commercetools.com';

    static async getToken(): Promise<ITokenResponce | ICustomerResponseFailed> {
        const URL_TOKEN = `${this.AUTH_URL}/oauth/token`;

        try {
            const resp = await fetch(URL_TOKEN, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(`${this.clientID}:${this.clientSecret}`)}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    scope: this.scope,
                }),
            });
            if (!resp.ok) {
                const data = await resp.json();
                return {
                    statusCode: data.statusCode,
                    msg: data.message,
                };
            }

            return (await resp.json()) as ITokenResponce;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
