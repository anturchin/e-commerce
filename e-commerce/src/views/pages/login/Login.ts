import { View } from '../../View';
import { Form } from './form/Form';
import { ErrorAuth } from '../../errorAuth/ErrorAuth';

export class Login extends View {
    private errorAuth: ErrorAuth = new ErrorAuth();

    constructor() {
        super({ tag: 'section' });
        this.setupLogin();
    }

    public getErrorAuth(): ErrorAuth {
        return this.errorAuth;
    }

    private setupLogin(): void {
        const h1 = document.createElement('h1');
        h1.textContent = 'Login';
        this.viewHtmlElement.addInnerElement(h1);
        this.viewHtmlElement.addInnerElement(this.errorAuth.getElement());
        const loginForm = new Form().getElement();
        this.viewHtmlElement.addInnerElement(loginForm);
    }
}
