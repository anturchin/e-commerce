import { View } from '../../View';
import { Form } from './form/Form';
import { ErrorAuth } from './errorAuth/ErrorAuth';

export class Login extends View {
    constructor() {
        super({ tag: 'section' });
        this.setupLogin();
    }

    private setupLogin(): void {
        const h1 = document.createElement('h1');
        h1.textContent = 'Login';
        this.viewHtmlElement.addInnerElement(h1);

        const errorAuth = new ErrorAuth().getElement();
        this.viewHtmlElement.addInnerElement(errorAuth);
        const loginForm = new Form().getElement();
        this.viewHtmlElement.addInnerElement(loginForm);
    }
}
