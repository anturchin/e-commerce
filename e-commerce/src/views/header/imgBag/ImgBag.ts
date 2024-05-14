import { View } from '../../View';
import './ImgBag.scss';
import img from '../../../assets/image/bag-shopping-solid.svg';

export class SvgBag extends View {
    constructor() {
        super({ tag: 'img', classNames: ['nav-list__item-bag'] });
        this.setSvgPath();
    }

    private setSvgPath(): void {
        const bagImg = this.viewHtmlElement.getElement();
        bagImg.setAttribute('src', img);
    }
}
