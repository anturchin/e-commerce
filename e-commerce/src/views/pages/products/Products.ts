import { View } from '../../View';
import { CardList } from './cardList/CardList';
import './Products.scss';

export interface ICards {
    url: string;
    name: string;
    description: string;
    price: string;
    sale: string;
}

const cardsProduct: ICards[] = [
    {
        url: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/iphone-14-pro-max-colors.png',
        name: 'Iphone 15',
        description: 'The iPhone 15 comes with 128 GB of storage and is available in black.',
        price: '900$',
        sale: '899$',
    },
];

export class Products extends View {
    private productList: CardList | null = null;

    constructor() {
        super({ tag: 'section', classNames: ['products'] });
    }

    public renderProductList(props: ICards[] = cardsProduct) {
        this.productList = new CardList(props);
        this.viewHtmlElement.addInnerElement(this.productList.getElement());
    }

    public getWrapperList(): CardList | null {
        return this.productList;
    }
}
