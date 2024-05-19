import { View } from '../../../View';
import { InputLogin } from './inputLogin/InputLogin';
import { Password } from './inputPassword/InputPassword';
import { Box } from './inputbox/Inputbox';
import { Button } from '../../../button/Button';

import './Form.scss';

export class Form extends View {
    private inputLogin: InputLogin | null = null;

    private inputPassword: Password | null = null;

    private inputBox: Box | null = null;

    private buttonSubmit: Button | null = null;

    constructor() {
        super({ tag: 'form', classNames: ['form'] });
        this.setupForm();
    }

    private setupForm(): void {
        this.inputLogin = new InputLogin({
            type: 'text',
            label: 'Login',
            required: true,
        });
        this.viewHtmlElement.addInnerElement(this.inputLogin.getElement());

        this.inputPassword = new Password({
            type: 'password',
            label: 'Password',
            required: true,
        });
        this.viewHtmlElement.addInnerElement(this.inputPassword.getElement());

        this.inputBox = new Box(
            {
                type: 'checkbox',
                label: '',
                required: true,
            },
            this.inputPassword
        );
        this.viewHtmlElement.addInnerElement(this.inputBox.getElement());

        this.buttonSubmit = new Button({
            label: 'Submit',
            disabled: true,
        });
        this.viewHtmlElement.addInnerElement(this.buttonSubmit.getElement());
    }
}
