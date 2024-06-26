import { View } from '../../../../View';
import './SalePrice.scss';

export class SalePriceBag extends View {
    constructor(cardSale: string) {
        super({ tag: 'p', classNames: ['card__sale-price'], textContent: cardSale });
    }
}
