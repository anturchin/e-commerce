import { IResponseFailed } from '../types';
import { IPromo, IPromoResponse } from './types';

export class PromoService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async getPromo(
        BEARER_TOKEN: string,
        id?: string
    ): Promise<IPromoResponse | IPromo | IResponseFailed> {
        let url = new URL(`${this.projectKey}/cart-discounts`, `${this.API_URL}/`);
        if (id) {
            url = new URL(`${this.projectKey}/cart-discounts/${id}`, `${this.API_URL}/`);
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

                return (await resp.json()) as IPromo;
            } catch (e) {
                if (e instanceof Error) {
                    console.error(e.message);
                }
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

                return (await resp.json()) as IPromoResponse;
            } catch (e) {
                if (e instanceof Error) {
                    console.error(e.message);
                }
                throw e;
            }
        }
    }
}
