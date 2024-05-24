import { View } from '../../../View';
import './SupLink.scss';

export class SupLink extends View {
    constructor() {
        super({ tag: 'a', classNames: ['footer__link'], textContent: 'Reference' });
        this.setupLink();
    }

    private setupLink(): void {
        const footerLinks = this.viewHtmlElement.getElement();
        footerLinks.setAttribute('href', '#');
    }
}
