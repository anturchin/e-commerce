import { View } from '../../../View';
import './Mail.scss';

export class Mail extends View {
    constructor() {
        super({ tag: 'a', classNames: ['footer__link'], textContent: 'E-Mail' });
        this.setupLink();
    }

    private setupLink(): void {
        const footerLinks = this.viewHtmlElement.getElement();
        footerLinks.setAttribute('href', 'mailto:FadStore@gmail.com');
    }
}
