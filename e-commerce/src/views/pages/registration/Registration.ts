import { Button } from '../../button/Button';
import { ErrorAuth } from '../../errorAuth/ErrorAuth';
import { View } from '../../View';
import { Form } from './form/Form';
import { FormAddress } from './formAddress/FormAddress';
import { Container } from '../../div/Container';

import './Registration.scss';

export class Registration extends View {
    private form: Form;

    private addressForm: FormAddress;

    private buttonLogin: Button | null = null;

    private errorAuth: ErrorAuth = new ErrorAuth();

    private container: Container | null = null;

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

    public getFormAddress(): FormAddress {
        return this.addressForm;
    }

    public getButtonLogin(): Button | null {
        return this.buttonLogin;
    }

    public getContainer(): Container | null {
        return this.container;
    }

    private setupRegistration(): void {
        const formRegistration = this.form.getElement();
        this.viewHtmlElement.addInnerElement(formRegistration);

        this.buttonLogin = new Button({
            label: 'Add address',
            onClick: () => {
                this.addressForm.toggleVisibility();
                this.viewHtmlElement.addInnerElement(this.addressForm.getElement());
            },
        });

        this.container = new Container();
        this.container.addInnerElement(this.buttonLogin.getElement());
        this.buttonLogin = new Button({
            label: 'Sign in',
        });
        this.container.addInnerElement(this.buttonLogin.getElement());
        this.viewHtmlElement.addInnerElement(this.container.getElement());
        this.viewHtmlElement.addInnerElement(this.errorAuth.getElement());
    }
}
