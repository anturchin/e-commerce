import { View } from '../../../View';
import { ImgCardBag } from './imgCardBag/ImgCardBag';
import { TitleProduct } from './titleProduct/TitleProduct';
import { BtnCount } from './btnCount/BtnCount';
import { PriceBag } from './priceBag/PriceBag';
import { SalePriceBag } from './salePrice/SalePrice';
import { DeleteBtn } from './deleteBtn/DeleteBtn';

import './CardBag.scss';

export class CardBag extends View {
    constructor(
        cardImg: string,
        cardTitle: string,
        cardPrice: string,
        cardSale: string,
        cardId: string,
        cardQuantity: number
    ) {
        super({ tag: 'div', classNames: ['cardbag'], id: cardId });
        this.setupCardBag(cardImg, cardTitle, cardPrice, cardSale, cardQuantity);
    }

    private setupCardBag(
        cardImg: string,
        cardTitle: string,
        cardPrice: string,
        cardSale: string,
        cardQuantity: number
    ): void {
        const img = new ImgCardBag(cardImg).getElement();
        this.viewHtmlElement.addInnerElement(img);

        const title = new TitleProduct(cardTitle).getElement();
        this.viewHtmlElement.addInnerElement(title);

        const initialQuantity = cardQuantity;
        const minQuantity = 0;
        const maxQuantity = 100;

        const countProduct = new BtnCount(initialQuantity, minQuantity, maxQuantity).getElement();
        this.viewHtmlElement.addInnerElement(countProduct);

        const price = new PriceBag(cardPrice).getElement();
        this.viewHtmlElement.addInnerElement(price);

        const salePrice = new SalePriceBag(cardSale).getElement();
        this.viewHtmlElement.addInnerElement(salePrice);

        const deleteButton = new DeleteBtn().getElement();
        this.viewHtmlElement.addInnerElement(deleteButton);
    }
}
