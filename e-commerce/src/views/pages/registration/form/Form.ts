import { View } from '../../../View';
import { Mail } from './inputMail/InputMail';
import { Name } from './inputName/InputName';
import { Surname } from './inputSurname/InputSurname';
import { Password } from './password/Password';
import { Button } from '../../../button/Button';

import './Form.scss';

export class Form extends View {
    private inputName: Name | null = null;

    private inputMail: Mail | null = null;

    private inputSurname: Surname | null = null;

    private inputPassword: Password | null = null;

    private buttonSubmit: Button | null = null;

    constructor() {
        super({ tag: 'form', classNames: ['form'] });
        this.setupForm();
    }

    private setupForm(): void {
        this.inputMail = new Mail({
            type: 'email',
            label: 'fad@gmail.com',
            required: true,
        });
        this.viewHtmlElement.addInnerElement(this.inputMail.getElement());

        this.inputName = new Name({
            type: 'text',
            label: 'Your Name',
            required: true,
        });
        this.viewHtmlElement.addInnerElement(this.inputName.getElement());

        this.inputSurname = new Surname({
            type: 'text',
            label: 'Your Surname',
            required: true,
        });
        this.viewHtmlElement.addInnerElement(this.inputSurname.getElement());

        this.inputPassword = new Password({
            type: 'text',
            label: 'Password',
            required: true,
        });
        this.viewHtmlElement.addInnerElement(this.inputPassword.getElement());

        this.buttonSubmit = new Button({
            label: 'Submit',
            disabled: true,
        });
        this.viewHtmlElement.addInnerElement(this.buttonSubmit.getElement());
    }
}
