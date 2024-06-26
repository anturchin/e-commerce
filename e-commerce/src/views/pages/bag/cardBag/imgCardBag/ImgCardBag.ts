import { View } from '../../../../View';
import './ImgCardBag.scss';

export class ImgCardBag extends View {
    constructor(cardImgBag: string) {
        super({ tag: 'img', classNames: ['cardbag-img'] });
        this.setImgPath(cardImgBag);
    }

    private setImgPath(cardImgBag: string): void {
        const CardImgBag = this.viewHtmlElement.getElement();
        CardImgBag.setAttribute('src', cardImgBag);
    }
}
