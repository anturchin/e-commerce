import { View } from '../../../View';
import { Mail } from './inputMail/inputMail';
import { Name } from './inputName/InputName';
import { Surname } from './inputSurname/InputSurname';
import { Password } from './password/Password';
import './Form.scss';

export class Form extends View {
    private inputName: Name | null = null;

    constructor() {
        super({ tag: 'form', classNames: ['form'] });
        this.setupForm();
    }

    private setupForm(): void {
        const inputMail = new Mail({
            type: 'email',
            label: 'fad@gmail.com',
            required: true,
        }).getElement();
        this.viewHtmlElement.addInnerElement(inputMail);

        const inputName = new Name({
            type: 'text',
            label: 'Your Name',
            required: true,
        }).getElement();
        this.viewHtmlElement.addInnerElement(inputName);

        const inputSurname = new Surname({
            type: 'text',
            label: 'Your Surname',
            required: true,
        }).getElement();
        this.viewHtmlElement.addInnerElement(inputSurname);

        const inputPassword = new Password({
            type: 'text',
            label: 'Password',
            required: true,
        }).getElement();
        this.viewHtmlElement.addInnerElement(inputPassword);
    }
}
