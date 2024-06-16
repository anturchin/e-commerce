import { View } from '../../../View';
import { Title } from './title/Title';
import { SubTitle } from './subtitle/Subtitle';
import { Content } from './content/Content';
import './Promo.scss';

export class Promo extends View {
    constructor() {
        super({ tag: 'div', classNames: ['promo'] });
        this.setupPromo();
    }

    setupPromo() {
        const title = new Title().getElement();
        this.viewHtmlElement.addInnerElement(title);

        const subTitle = new SubTitle().getElement();
        this.viewHtmlElement.addInnerElement(subTitle);

        const content = new Content().getElement();
        this.viewHtmlElement.addInnerElement(content);
    }
}
