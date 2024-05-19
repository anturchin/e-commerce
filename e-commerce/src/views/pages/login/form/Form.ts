import { View } from '../../../View';
import { InputLogin } from './inputLogin/InputLogin';
import { Password } from './inputPassword/InputPassword';
import { Box } from './inputbox/Inputbox';
import { Button } from '../../../button/Button';

import './Form.scss';
import { FormLoginElementsType } from './types';

export class Form extends View {
    private inputLogin: InputLogin | null = null;

    private inputPassword: Password | null = null;

    private inputBox: Box | null = null;

    private buttonSubmit: Button | null = null;

    constructor() {
        super({ tag: 'form', classNames: ['form'] });
        this.setupForm();
    }

    public getFormElements(): FormLoginElementsType | null {
        if (this.inputLogin && this.inputPassword && this.inputBox && this.buttonSubmit) {
            return {
                inputLogin: this.inputLogin,
                inputPassword: this.inputPassword,
                inputBox: this.inputBox,
                buttonSubmit: this.buttonSubmit,
            };
        }
        return null;
    }

    private setupForm(): void {
        this.inputLogin = new InputLogin({
            type: 'text',
            label: 'Login',
            required: false,
        });
        this.viewHtmlElement.addInnerElement(this.inputLogin.getElement());

        this.inputPassword = new Password({
            type: 'password',
            label: 'Password',
            required: false,
        });
        this.viewHtmlElement.addInnerElement(this.inputPassword.getElement());

        this.inputBox = new Box(
            {
                type: 'checkbox',
                label: '',
                required: false,
            },
            this.inputPassword
        );
        this.viewHtmlElement.addInnerElement(this.inputBox.getElement());

        this.buttonSubmit = new Button({
            label: 'Submit',
        });
        this.viewHtmlElement.addInnerElement(this.buttonSubmit.getElement());
    }
}
