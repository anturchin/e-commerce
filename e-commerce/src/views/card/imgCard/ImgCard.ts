import { View } from '../../View';
import './ImgCard.scss';

import img from '../../../assets/image/phone.png';

export class ImgCard extends View {
    constructor() {
        super({ tag: 'img', classNames: ['card__img'] });
        this.setImgPath();
    }

    private setImgPath(): void {
        const CardImg = this.viewHtmlElement.getElement();
        CardImg.setAttribute('src', img);
    }
}
