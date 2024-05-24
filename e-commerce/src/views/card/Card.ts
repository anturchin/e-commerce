import { View } from '../View';
import { ImgCard } from './imgCard/ImgCard';
import { TitleCard } from './titleCard/TitleCard';
import { DescriptCard } from './descriptCard/DescriptCard';
import { Container } from '../div/Container';
import { Price } from './priceCard/PriceCard';
import { SalePrice } from './salePrice/salePrice';

import './Card.scss';

export class Card extends View {
    constructor() {
        super({ tag: 'div', classNames: ['product__card'] });
        this.setupCard();
    }

    private setupCard(): void {
        const img = new ImgCard().getElement();
        this.viewHtmlElement.addInnerElement(img);
        const title = new TitleCard().getElement();
        this.viewHtmlElement.addInnerElement(title);
        const description = new DescriptCard().getElement();
        this.viewHtmlElement.addInnerElement(description);

        const price = new Price().getElement();
        const salePrice = new SalePrice().getElement();

        const divElem = new Container().getElement();
        divElem.append(price, salePrice);

        this.viewHtmlElement.addInnerElement(divElem);
    }
}
