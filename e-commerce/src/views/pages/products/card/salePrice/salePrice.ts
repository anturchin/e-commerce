import { View } from '../../../../View';
import './salePrice.scss';

export class SalePrice extends View {
    constructor(cardSale: string) {
        super({ tag: 'p', classNames: ['card__sale-price'], textContent: cardSale });
    }
}
