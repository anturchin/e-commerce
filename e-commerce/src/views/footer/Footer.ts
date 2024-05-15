import { View } from '../View';
import { Contacts } from './contacts/Contacts';
import { Address } from './address/Address';
import { Support } from './support/Support';
import './Footer.scss';

export class Footer extends View {
    constructor() {
        super({ tag: 'footer', classNames: ['footer'] });
        this.setupFooterContent();
    }

    private setupFooterContent() {
        const contacts = new Contacts().getElement();
        this.viewHtmlElement.addInnerElement(contacts);
        const address = new Address().getElement();
        this.viewHtmlElement.addInnerElement(address);
        const support = new Support().getElement();
        this.viewHtmlElement.addInnerElement(support);
    }
}
