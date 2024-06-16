import { View } from '../../View';
import './PriceProduct.scss';

export class PriceProduct extends View {
    constructor(productPrice: string) {
        super({ tag: 'p', classNames: ['product__price'], textContent: productPrice });
    }
}
