import { View } from '../../View';
import './ImgProduct.scss';

export class ImgProduct extends View {
    constructor(productImg: string[]) {
        super({ tag: 'img', classNames: ['product__img'] });
        this.setImgPath(productImg);
    }

    private setImgPath(productImg: string[]): void {
        productImg.forEach((imgUrl) => {
            const img = document.createElement('img');
            img.src = imgUrl;
            this.viewHtmlElement.addInnerElement(img);
        });
    }
}
