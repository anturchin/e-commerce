import { View } from '../../../View';
import { InputLogin } from './inputLogin/inputLogin';
import { Password } from './inputPassword/inputPassword';
import { Box } from './inputbox/Inputbox';
import './Form.scss';

export class Form extends View {
    private inputLogin: InputLogin | null = null;

    private inputPassword: Password | null = null;

    private inputBox: Box | null = null;

    constructor() {
        super({ tag: 'form', classNames: ['form'] });
        this.setupForm();
    }

    private setupForm(): void {
        const inputLogin = new InputLogin({
            type: 'text',
            label: 'Login',
            required: true,
        }).getElement();
        this.viewHtmlElement.addInnerElement(inputLogin);

        const inputPassword = new Password({
            type: 'password',
            label: 'Password',
            required: true,
        }).getElement();
        this.viewHtmlElement.addInnerElement(inputPassword);

        const inputBox = new Box({
            type: 'checkbox',
            label: '',
            required: true,
        }).getElement();
        this.viewHtmlElement.addInnerElement(inputBox);

        inputBox.addEventListener('click', () => {
            if ((inputBox as HTMLInputElement).checked) {
                (inputPassword as HTMLInputElement).type = 'text';
            } else {
                (inputPassword as HTMLInputElement).type = 'password';
            }
        });
    }
}
