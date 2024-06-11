import { IProduct, IProductResponse } from './types';
import { IResponseFailed } from '../types';

export class ProductListService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async getProductList(
        BEARER_TOKEN: string,
        id?: string
    ): Promise<IProductResponse | IResponseFailed | IProduct> {
        let url = new URL(`${this.projectKey}/products`, `${this.API_URL}/`);
        if (id) {
            url = new URL(`${this.projectKey}/products/${id}`, `${this.API_URL}/`);
            try {
                const resp = await fetch(url, {
                    method: 'GET',
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

                return (await resp.json()) as IProductResponse;
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

                return (await resp.json()) as IProductResponse;
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    }
}
