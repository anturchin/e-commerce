import { View } from '../../../../View';
import './salePrice.scss';

export class SalePrice extends View {
    constructor(cardSale: string) {
        super({ tag: 'p', classNames: ['cards__sale-price'], textContent: cardSale });
    }
}
