import { View } from '../../../../View';
import './Price.scss';

export class FullPrice extends View {
    constructor(fullPrice: string) {
        super({ tag: 'p', classNames: ['price'], textContent: fullPrice });
    }

    public updatePrice(price: string): void {
        this.viewHtmlElement.getElement().textContent = price;
    }
}
