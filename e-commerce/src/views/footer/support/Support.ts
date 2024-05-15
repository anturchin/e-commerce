import { View } from '../../View';
import { Subtitle } from './subtitle/Subtitle';
import { SupLink } from './supLink/SupLink';
import { ImgSup } from './imgSup/ImgSup';
import './Support.scss';

export class Support extends View {
    constructor() {
        super({ tag: 'div', classNames: ['footer__container'] });
        this.setupSupport();
    }

    setupSupport() {
        const imgSupport = new ImgSup().getElement();
        this.viewHtmlElement.addInnerElement(imgSupport);
        const subSuport = new Subtitle().getElement();
        this.viewHtmlElement.addInnerElement(subSuport);
        const footerLink = new SupLink().getElement();
        this.viewHtmlElement.addInnerElement(footerLink);
    }
}
