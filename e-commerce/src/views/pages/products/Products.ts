import { View } from '../../View';
import { CardList } from './cardList/CardList';
import './Products.scss';

export interface ICards {
    url: string;
    name: string;
    description: string;
    price: string;
    sale: string;
    id: string;
}

export class Products extends View {
    private productList: CardList | null = null;

    constructor() {
        super({ tag: 'section', classNames: ['products'] });
    }

    public renderProductList(props: ICards[]) {
        this.productList = new CardList(props);
        this.viewHtmlElement.addInnerElement(this.productList.getElement());
    }

    public getWrapperList(): CardList | null {
        return this.productList;
    }
}
