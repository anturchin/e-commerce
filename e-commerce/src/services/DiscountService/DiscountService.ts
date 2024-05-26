import { IResponseFailed } from '../types';
import { IDiscountResponse } from './types';

export class DiscountService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async getDiscounts(BEARER_TOKEN: string): Promise<IDiscountResponse | IResponseFailed> {
        const URL = `${this.API_URL}/${this.projectKey}/product-discounts`;

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
                } as IResponseFailed;
            }

            return (await resp.json()) as IDiscountResponse;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
