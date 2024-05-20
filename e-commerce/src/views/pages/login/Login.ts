import { View } from '../../View';
import { Form } from './form/Form';
import { ErrorAuth } from '../../errorAuth/ErrorAuth';
import { Button } from '../../button/Button';

import './Login.scss';

export class Login extends View {
    private errorAuth: ErrorAuth = new ErrorAuth();

    private buttonRegistration: Button | null = null;

    private loginForm: Form;

    constructor() {
        super({ tag: 'section', classNames: ['content'] });
        this.loginForm = new Form();
        this.setupLogin();
    }

    public getForm(): Form {
        return this.loginForm;
    }

    public getErrorAuth(): ErrorAuth {
        return this.errorAuth;
    }

    public getButtonRegistration(): Button | null {
        return this.buttonRegistration;
    }

    private setupLogin(): void {
        this.viewHtmlElement.addInnerElement(this.loginForm.getElement());

        this.buttonRegistration = new Button({
            label: 'Sign un',
        });
        this.viewHtmlElement.addInnerElement(this.buttonRegistration.getElement());

        this.viewHtmlElement.addInnerElement(this.errorAuth.getElement());
    }
}
