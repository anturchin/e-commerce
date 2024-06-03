import { View } from '../../View';
import './ImgProduct.scss';

export class ImgProduct extends View {
    constructor(productImg: string) {
        super({ tag: 'img', classNames: ['product__img'] });
        this.setImgPath(productImg);
    }

    private setImgPath(productImg: string): void {
        const productImage = this.viewHtmlElement.getElement();
        productImage.setAttribute('src', productImg);
    }
}
