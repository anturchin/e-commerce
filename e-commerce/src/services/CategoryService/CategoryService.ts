import { ICategoryResponse } from './types';
import { IResponseFailed } from '../types';

export class CategoryService {
    private static readonly projectKey: string = 'fad-team';

    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async getCategoryList(
        BEARER_TOKEN: string
    ): Promise<ICategoryResponse | IResponseFailed> {
        const URL = `${this.API_URL}/${this.projectKey}/categories`;
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

            return (await resp.json()) as ICategoryResponse;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
