import { View } from '../../../../View';
import './ImgCategory.scss';

export class ImgCategory extends View {
    constructor(categoryCard: string) {
        super({ tag: 'img', classNames: ['img__category'] });
        this.setImgPath(categoryCard);
    }

    private setImgPath(categoryCard: string): void {
        const cardCategory = this.viewHtmlElement.getElement();
        cardCategory.setAttribute('src', categoryCard);
    }
}
