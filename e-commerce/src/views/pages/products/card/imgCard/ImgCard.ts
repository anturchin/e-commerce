import { View } from '../../../../View';
import './ImgCard.scss';

export class ImgCard extends View {
    constructor(cardImg: string) {
        super({ tag: 'img', classNames: ['card__img'] });
        this.setImgPath(cardImg);
    }

    private setImgPath(cardImg: string): void {
        const CardImg = this.viewHtmlElement.getElement();
        CardImg.setAttribute('src', cardImg);
    }
}
