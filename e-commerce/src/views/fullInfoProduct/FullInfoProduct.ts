import { View } from '../View';
import { DescriptionProduct } from './descriptionProduct/DescriptionProduct';
import { NameProduct } from './nameProduct/NameProduct';
import { ImgProduct } from './imgProduct/ImgProduct';
import { ContainerImg } from './containerForImg/ContainerForImg';
import { ContainerColumn } from './container/Container';

import './FullInfoProduct.scss';

export class FullInfoProduct extends View {
    constructor(productTitle: string, productImg: string, productDescription: string) {
        super({ tag: 'div', classNames: ['product__info'] });
        this.setupProductInfo(productTitle, productImg, productDescription);
    }

    private setupProductInfo(
        productTitle: string,
        productImg: string,
        productDescription: string
    ): void {
        const containerInfo = new ContainerColumn().getElement();

        const nameProduct = new NameProduct(productTitle).getElement();
        const descriptionProduct = new DescriptionProduct(productDescription).getElement();

        containerInfo.append(nameProduct, descriptionProduct);
        this.viewHtmlElement.addInnerElement(containerInfo);

        const containerImg = new ContainerImg().getElement();

        const imgProduct = new ImgProduct(productImg).getElement();
        containerImg.append(imgProduct);
        this.viewHtmlElement.addInnerElement(containerImg);
    }
}
