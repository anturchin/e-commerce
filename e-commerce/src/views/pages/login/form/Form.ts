import { View } from '../../../View';
import { InputLogin } from './inputLogin/InputLogin';
import { Password } from './inputPassword/InputPassword';
import { Box } from './inputbox/Inputbox';
import { Button } from '../../../button/Button';
import { Title } from './title/Title';
import { SubTitle } from './inputbox/subtitle/Subtitle';

import './Form.scss';
import { FormLoginElementsType } from './types';

export class Form extends View {
    private title: Title | null = null;

    private inputLogin: InputLogin | null = null;

    private inputPassword: Password | null = null;

    private inputBox: Box | null = null;

    private subtitle: SubTitle | null = null;

    private buttonSubmit: Button | null = null;

    constructor() {
        super({ tag: 'form', classNames: ['form'] });
        this.setupForm();
    }

    public getFormElements(): FormLoginElementsType | null {
        if (
            this.title &&
            this.inputLogin &&
            this.inputPassword &&
            this.inputBox &&
            this.subtitle &&
            this.buttonSubmit
        ) {
            return {
                inputLogin: this.inputLogin,
                inputPassword: this.inputPassword,
                inputBox: this.inputBox,
                buttonSubmit: this.buttonSubmit,
                title: this.title,
                subtitle: this.subtitle,
            };
        }
        return null;
    }

    private setupForm(): void {
        this.title = new Title();
        this.viewHtmlElement.addInnerElement(this.title.getElement());

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

        this.subtitle = new SubTitle();
        this.viewHtmlElement.addInnerElement(this.subtitle.getElement());

        this.buttonSubmit = new Button({
            label: 'Submit',
        });
        this.viewHtmlElement.addInnerElement(this.buttonSubmit.getElement());
    }
}
