import { ICart } from '../CartService/types';
import { IResponseFailed } from '../types';

export class CartCreateService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async createCart(BEARER_TOKEN: string): Promise<ICart | IResponseFailed> {
        const URL = `${this.API_URL}/${this.projectKey}/carts`;

        const currency = {
            currency: 'USD',
        };

        try {
            const resp = await fetch(URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(currency),
            });

            if (!resp.ok) {
                const data = await resp.json();
                return {
                    statusCode: data.statusCode,
                    msg: data.message,
                } as IResponseFailed;
            }

            return (await resp.json()) as ICart;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
