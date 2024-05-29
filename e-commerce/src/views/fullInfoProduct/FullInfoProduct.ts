import { View } from '../View';
import { DescriptionProduct } from './descriptionProduct/DescriptionProduct';
import { NameProduct } from './nameProduct/NameProduct';
import { ImgProduct } from './imgProduct/ImgProduct';
import { ContainerImg } from './containerForImg/ContainerForImg';
import { ContainerColumn } from './container/Container';
import { PriceProduct } from './priceProduct/PriceProduct';
import { SaleProduct } from './saleProduct/SaleProduct';

import './FullInfoProduct.scss';

export class FullInfoProduct extends View {
    constructor(
        productTitle: string,
        productImg: string,
        productDescription: string,
        productPrice: string,
        productSale: string
    ) {
        super({ tag: 'div', classNames: ['product__info'] });
        this.setupProductInfo(
            productTitle,
            productImg,
            productDescription,
            productPrice,
            productSale
        );
    }

    private setupProductInfo(
        productTitle: string,
        productImg: string,
        productDescription: string,
        productPrice: string,
        productSale: string
    ): void {
        const containerInfo = new ContainerColumn().getElement();

        const nameProduct = new NameProduct(productTitle).getElement();
        const descriptionProduct = new DescriptionProduct(productDescription).getElement();
        const price = new PriceProduct(productPrice).getElement();
        const sale = new SaleProduct(productSale).getElement();

        containerInfo.append(nameProduct, descriptionProduct, price, sale);
        this.viewHtmlElement.addInnerElement(containerInfo);

        const containerImg = new ContainerImg().getElement();

        const imgProduct = new ImgProduct(productImg).getElement();
        containerImg.append(imgProduct);
        this.viewHtmlElement.addInnerElement(containerImg);
    }
}
