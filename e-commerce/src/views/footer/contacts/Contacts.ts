import { View } from '../../View';
import { Mail } from './mail/Mail';
import { ImgEnvelope } from '../contacts/imgEnvelop/ImgEnvelop';
import { Subtitle } from './subtitle/Subtitle';
import './Contacts.scss';

export class Contacts extends View {
    constructor() {
        super({ tag: 'div', classNames: ['footer__container'] });
        this.setupContacts();
    }

    setupContacts() {
        const envelopeImg = new ImgEnvelope().getElement();
        this.viewHtmlElement.addInnerElement(envelopeImg);
        const subContact = new Subtitle().getElement();
        this.viewHtmlElement.addInnerElement(subContact);
        const mail = new Mail().getElement();
        this.viewHtmlElement.addInnerElement(mail);
    }
}
