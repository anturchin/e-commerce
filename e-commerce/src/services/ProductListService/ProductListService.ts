import { IProductResponse } from './types';
import { ICustomerResponseFailed } from '../types';

export class ProductListService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async getProductList(
        BEARER_TOKEN: string
    ): Promise<IProductResponse | ICustomerResponseFailed> {
        const URL = `${this.API_URL}/${this.projectKey}/products`;

        try {
            const resp = await fetch(URL, {
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
                } as ICustomerResponseFailed;
            }

            return (await resp.json()) as IProductResponse;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
