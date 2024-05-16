import { TOKEN_RESPONCE } from './types/TokenResponce';
import { CUSTOMER } from './types/CustomerType';

const projectKey = 'fad-team';
const clientID = 'GZh-zb2_-LVjIg7hwuK_hZMb';
const clientSecret = '5nQ2RJtIs1z58PEfMGQIbUB3ROxQsCUL';
const scope = 'manage_customers:fad-team';
const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com';

// TODO: getToken() returns {} with TOKEN in field .access_token, we need it in registration()
// as BEARER_TOKEN
// for registration we need BEARER_TOKEN (see above) and customer object like that
// {
//     email: string;
//     firstName: string;
//     lastName: string;
//     password: string;
// }
// all fields are necessary for registration in ct

export default class RegistrationService {
    static async getToken(): Promise<TOKEN_RESPONCE> {
        const URL_TOKEN = `${AUTH_URL}/oauth/token`;

        try {
            const resp = await fetch(URL_TOKEN, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(`${clientID}:${clientSecret}`)}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    scope,
                }),
            });
            if (!resp.ok) {
                throw new Error(`${resp.status}`);
            }

            return await resp.json();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    static async registration(BEARER_TOKEN: string, customer: CUSTOMER): Promise<JSON> {
        const REG_URL = `${API_URL}/${projectKey}/customers`;

        try {
            const resp = await fetch(REG_URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(customer),
            });

            if (!resp.ok) {
                throw new Error(`${resp.status}`);
            }

            this.showMsg();

            return await resp.json();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    static showMsg(): void {
        const body = document.body;

        const msgCon = document.createElement('section');
        msgCon.style.margin = '0 auto';

        const mes = document.createElement('h2');
        mes.innerHTML = 'Registration success!';

        msgCon.append(mes);
        body.append(msgCon);

        setTimeout(() => {
            msgCon.remove();
        }, 10000);
    }
}
