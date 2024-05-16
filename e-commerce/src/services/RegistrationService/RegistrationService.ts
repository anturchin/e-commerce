import { ICustomer } from './types/CustomerType';
import { IToken_responce } from '../TokenService/types/TokenResponce';
import { IRegistration_Response } from './types/RegistrationResponse';

// TODO: getToken() (from TokenForRegistration!!!) returns {} with TOKEN
// in field .access_token, we need it in registration()
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
    private static readonly projectKey: string = 'fad-team';
    private static readonly API_URL: string = 'https://api.europe-west1.gcp.commercetools.com';

    static async registration(
        BEARER_TOKEN: string,
        customer: ICustomer
    ): Promise<IRegistration_Response> {
        const REG_URL = `${this.API_URL}/${this.projectKey}/customers`;

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
        const msgCon = document.createElement('section');
        msgCon.style.margin = '0 auto';

        const mes = document.createElement('h2');
        mes.innerHTML = 'Registration success!';

        msgCon.append(mes);
        document.body.append(msgCon);

        setTimeout(() => {
            msgCon.remove();
        }, 10000);
    }
}
