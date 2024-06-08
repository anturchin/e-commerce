import { ICartResponse } from '../CartService/types';
import { IResponseFailed } from '../types';

export class CartUpdateService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async updateCart(
        BEARER_TOKEN: string,
        cartId: string,
        version: number,
        action: string,
        productId: string,
        quantity: number
    ): Promise<ICartResponse | IResponseFailed> {
        const URL = `${this.API_URL}/${this.projectKey}/carts/${cartId}`;

        const param = {
            version,
            actions: [
                {
                    action,
                    productId,
                    quantity,
                },
            ],
        };

        try {
            const resp = await fetch(URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(param),
            });

            if (!resp.ok) {
                const data = await resp.json();
                return {
                    statusCode: data.statusCode,
                    msg: data.message,
                } as IResponseFailed;
            }

            return (await resp.json()) as ICartResponse;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}