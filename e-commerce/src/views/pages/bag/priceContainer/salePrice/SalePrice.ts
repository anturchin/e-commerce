import { View } from '../../../../View';
import './SalePrice.scss';

export class SalePrice extends View {
    constructor(salePrice: string) {
        super({ tag: 'p', classNames: ['sale-price'], textContent: salePrice });
    }

    public updatePrice(price: string): void {
        this.viewHtmlElement.getElement().textContent = price;
    }
}
