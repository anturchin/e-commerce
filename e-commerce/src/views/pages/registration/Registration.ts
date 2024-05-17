import { View } from '../../View';
import './Registration.scss';
import { Form } from './form/Form';

export class Registration extends View {
    constructor() {
        super({ tag: 'section', classNames: ['registration-page'] });
        this.setupRegistration();
    }

    private setupRegistration(): void {
        const h1 = document.createElement('h1');
        h1.textContent = 'Create your account';
        this.viewHtmlElement.addInnerElement(h1);

        const formRegistration = new Form().getElement();
        this.viewHtmlElement.addInnerElement(formRegistration);
    }
}
