import { IProductResponse } from './types';
import { IResponseFailed } from '../types';

export class FilterService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async getFilteredList(
        BEARER_TOKEN: string,
        param: string
    ): Promise<IProductResponse | IResponseFailed> {
        const url = new URL(`${this.projectKey}/products`, `${this.API_URL}/`);
        if (param) url.searchParams.append('where', param);
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
            if (e instanceof Error) {
                console.error(e.message);
            }
            throw e;
        }
    }
}
