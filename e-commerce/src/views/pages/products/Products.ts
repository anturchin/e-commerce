import { View } from '../../View';
import { Card } from './card/Card';
import './Products.scss';

export class Products extends View {
    private productList: Card | null = null;

    constructor() {
        super({ tag: 'section', classNames: ['products'] });
    }

    public renderProductList(props: Record<string, string>[]) {
        console.log(props);
    }

    public getProductList(): Card | null {
        return this.productList;
    }
}
