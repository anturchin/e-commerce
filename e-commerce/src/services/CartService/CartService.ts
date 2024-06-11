import { ICart, ICartResponse } from './types';
import { IResponseFailed } from '../types';

export class CartService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async getCart(
        BEARER_TOKEN: string,
        id?: string
    ): Promise<ICartResponse | IResponseFailed | ICart> {
        let url = new URL(`${this.projectKey}/carts`, `${this.API_URL}/`);
        if (id) {
            url = new URL(`${this.projectKey}/carts/${id}`, `${this.API_URL}/`);
            try {
                const resp = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${BEARER_TOKEN}`,
                        'Content-type': 'application/json',
                    },
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
        } else {
            try {
                const resp = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${BEARER_TOKEN}`,
                        'Content-type': 'application/json',
                    },
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
}
