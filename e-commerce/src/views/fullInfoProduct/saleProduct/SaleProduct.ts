import { View } from '../../View';
import './SaleProduct.scss';

export class SaleProduct extends View {
    constructor(productSale: string) {
        super({ tag: 'p', classNames: ['product__sale-price'], textContent: productSale });
    }
}
