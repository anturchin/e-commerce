import { View } from '../View';
import { ImgCard } from './imgCard/ImgCard';
import { TitleCard } from './titleCard/TitleCard';
import { DescriptCard } from './descriptCard/DescriptCard';
import { Container } from '../div/Container';
import { Price } from './priceCard/PriceCard';
import { SalePrice } from './salePrice/salePrice';

import './Card.scss';

export class Card extends View {
    constructor(
        cardImgSrc: string,
        cardTitle: string,
        cardDescription: string,
        cardPrice: string,
        cardSale: string
    ) {
        super({ tag: 'div', classNames: ['product__card'] });
        this.setupCard(cardImgSrc, cardTitle, cardDescription, cardPrice, cardSale);
    }

    private setupCard(
        cardImgSrc: string,
        cardTitle: string,
        cardDescription: string,
        cardPrice: string,
        cardSale: string
    ): void {
        const img = new ImgCard(cardImgSrc).getElement();
        this.viewHtmlElement.addInnerElement(img);
        const title = new TitleCard(cardTitle).getElement();
        this.viewHtmlElement.addInnerElement(title);
        const description = new DescriptCard(cardDescription).getElement();
        this.viewHtmlElement.addInnerElement(description);

        const price = new Price(cardPrice).getElement();
        const salePrice = new SalePrice(cardSale).getElement();

        const divElem = new Container().getElement();
        divElem.append(price, salePrice);

        this.viewHtmlElement.addInnerElement(divElem);
    }
}
