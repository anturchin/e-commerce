import { Button } from '../../button/Button';
import { View } from '../../View';
import { Form } from './form/Form';

import './Registration.scss';

export class Registration extends View {
    private form: Form;

    private buttonLogin: Button | null = null;

    constructor() {
        super({ tag: 'section', classNames: ['registration-page'] });
        this.form = new Form();
        this.setupRegistration();
    }

    public getForm(): Form {
        return this.form;
    }

    public getButtonLogin(): Button | null {
        return this.buttonLogin;
    }

    private setupRegistration(): void {
        const h1 = document.createElement('h1');
        h1.textContent = 'Create your account';
        this.viewHtmlElement.addInnerElement(h1);

        const formRegistration = this.form.getElement();
        this.viewHtmlElement.addInnerElement(formRegistration);

        this.buttonLogin = new Button({
            label: 'Sign in',
        });
        this.viewHtmlElement.addInnerElement(this.buttonLogin.getElement());
    }
}
