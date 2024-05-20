import { Button } from '../../button/Button';
import { ErrorAuth } from '../../errorAuth/ErrorAuth';
import { View } from '../../View';
import { Form } from './form/Form';
import { FormAddress } from './formAddress/FormAddress';

import './Registration.scss';

export class Registration extends View {
    private form: Form;

    private addressForm: FormAddress;

    private buttonLogin: Button | null = null;

    private errorAuth: ErrorAuth = new ErrorAuth();

    constructor() {
        super({ tag: 'section', classNames: ['registration-page'] });
        this.form = new Form();
        this.addressForm = new FormAddress();
        this.setupRegistration();
    }

    public getErrorAuth(): ErrorAuth {
        return this.errorAuth;
    }

    public getForm(): Form {
        return this.form;
    }

    public getFormReg(): FormAddress {
        return this.addressForm;
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

        const formAddressReg = this.addressForm.getElement();
        this.viewHtmlElement.addInnerElement(formAddressReg);

        this.buttonLogin = new Button({
            label: 'Sign in',
        });
        this.viewHtmlElement.addInnerElement(this.buttonLogin.getElement());
        this.viewHtmlElement.addInnerElement(this.errorAuth.getElement());
    }
}
