import { View } from '../../View';
import { Form } from './form/Form';

import './Registration.scss';

export class Registration extends View {
    private form: Form;

    constructor() {
        super({ tag: 'section', classNames: ['registration-page'] });
        this.form = new Form();
        this.setupRegistration();
    }

    private setupRegistration(): void {
        const h1 = document.createElement('h1');
        h1.textContent = 'Create your account';
        this.viewHtmlElement.addInnerElement(h1);

        const formRegistration = this.form.getElement();
        this.viewHtmlElement.addInnerElement(formRegistration);
    }
}
