import { ICartResponse } from '../CartService/types';
import { IResponseFailed } from '../types';

export class CartDeleteService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async deleteCart(
        BEARER_TOKEN: string,
        id: string,
        version: number
    ): Promise<ICartResponse | IResponseFailed> {
        const URL = `${this.API_URL}/${this.projectKey}/carts/${id}?version=${version}`;
        try {
            const resp = await fetch(URL, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
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
            if (e instanceof Error) {
                console.error(e.message);
            }
            throw e;
        }
    }
}
