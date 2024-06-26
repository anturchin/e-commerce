import { View } from '../../View';
import { Subtitle } from './subtitle/Subtitle';
import { ImgMap } from './imgMap/ImgMap';
import { MapLink } from './mapLink/MapLink';

import './Adress.scss';

export class Address extends View {
    constructor() {
        super({ tag: 'div', classNames: ['footer__container'] });
        this.setupAddress();
    }

    setupAddress() {
        const envelopeImg = new ImgMap().getElement();
        this.viewHtmlElement.addInnerElement(envelopeImg);
        const subAddress = new Subtitle().getElement();
        this.viewHtmlElement.addInnerElement(subAddress);
        const mapAddress = new MapLink().getElement();
        this.viewHtmlElement.addInnerElement(mapAddress);
    }
}
