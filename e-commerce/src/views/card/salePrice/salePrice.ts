import { View } from '../../View';
import './salePrice.scss';

export class SalePrice extends View {
    constructor() {
        super({ tag: 'p', classNames: ['card__sale-price'], textContent: '$999' });
    }
}
