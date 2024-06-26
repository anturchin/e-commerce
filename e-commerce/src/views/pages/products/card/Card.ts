import { View } from '../../../View';
import { ImgCard } from './imgCard/ImgCard';
import { TitleCard } from './titleCard/TitleCard';
import { DescriptCard } from './descriptCard/DescriptCard';
import { Container } from '../../../div/Container';
import { Price } from './priceCard/PriceCard';
import { SalePrice } from './salePrice/salePrice';
import { BagBtn } from './bagBtn/BagBtn';
import { DeleteBtn } from './deleteBtn/DeleteBtn';

import './Card.scss';

export class Card extends View {
    constructor(
        cardImgSrc: string,
        cardTitle: string,
        cardDescription: string,
        cardPrice: string,
        cardSale: string,
        cardId: string
    ) {
        super({ tag: 'div', classNames: ['product__card'], id: cardId });
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

        const deleteBtn = new DeleteBtn().getElement();
        const btn = new BagBtn().getElement();

        const divBtn = new Container().getElement();
        divBtn.append(btn, deleteBtn);
        this.viewHtmlElement.addInnerElement(divElem);
        this.viewHtmlElement.addInnerElement(divBtn);
    }
}
