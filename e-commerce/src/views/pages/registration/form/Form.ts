import { View } from '../../../View';
import { Mail } from './inputMail/InputMail';
import { Name } from './inputName/InputName';
import { Surname } from './inputSurname/InputSurname';
import { Password } from './password/Password';
import { Button } from '../../../button/Button';
import { FormElementsType } from './types';
import { TitleForm } from './titleForm/TitleForm';

import './Form.scss';

export class Form extends View {
    private inputName: Name | null = null;

    private inputMail: Mail | null = null;

    private inputSurname: Surname | null = null;

    private inputPassword: Password | null = null;

    private buttonSubmit: Button | null = null;

    private titleForm: TitleForm | null = null;

    constructor() {
        super({ tag: 'form', classNames: ['form-registration'] });
        this.setupForm();
    }

    public getFormElements(): FormElementsType | null {
        if (
            this.titleForm &&
            this.inputName &&
            this.inputMail &&
            this.inputSurname &&
            this.inputPassword &&
            this.buttonSubmit
        ) {
            return {
                titleForm: this.titleForm,
                inputName: this.inputName,
                inputMail: this.inputMail,
                inputSurname: this.inputSurname,
                inputPassword: this.inputPassword,
                buttonSubmit: this.buttonSubmit,
            };
        }
        return null;
    }

    private setupForm(): void {
        this.titleForm = new TitleForm();
        this.viewHtmlElement.addInnerElement(this.titleForm.getElement());
        this.inputMail = new Mail({
            type: 'text',
            label: 'fad@gmail.com',
            required: false,
        });
        this.viewHtmlElement.addInnerElement(this.inputMail.getElement());

        this.inputName = new Name({
            type: 'text',
            label: 'Your Name',
            required: false,
        });
        this.viewHtmlElement.addInnerElement(this.inputName.getElement());

        this.inputSurname = new Surname({
            type: 'text',
            label: 'Your Surname',
            required: false,
        });
        this.viewHtmlElement.addInnerElement(this.inputSurname.getElement());

        this.inputPassword = new Password({
            type: 'text',
            label: 'Password',
            required: false,
        });
        this.viewHtmlElement.addInnerElement(this.inputPassword.getElement());

        this.buttonSubmit = new Button({
            label: 'Submit',
        });
        this.viewHtmlElement.addInnerElement(this.buttonSubmit.getElement());
    }
}
