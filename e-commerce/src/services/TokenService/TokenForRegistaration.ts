import { ITokenResponce } from './types/TokenResponce';

export default class TokenForRegistration {
    private static readonly clientID: string = 'GZh-zb2_-LVjIg7hwuK_hZMb';

    private static readonly clientSecret: string = '5nQ2RJtIs1z58PEfMGQIbUB3ROxQsCUL';

    private static readonly scope: string = 'manage_customers:fad-team';

    private static readonly AUTH_URL: string = 'https://auth.europe-west1.gcp.commercetools.com';

    static async getToken(): Promise<ITokenResponce> {
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
                throw new Error(`${resp.status}`);
            }

            return await resp.json();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
