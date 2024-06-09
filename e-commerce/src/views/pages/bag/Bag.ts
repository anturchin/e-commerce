import { View } from '../../View';
import { CardBagList } from './cardListBag/CardListBag';
import './Bag.scss';

export interface IBagCards {
    url: string;
    name: string;
    price: string;
    sale: string;
}

const cardsProduct: IBagCards[] = [
    {
        url: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/iphone-14-pro-max-colors.png',
        name: 'Iphone 15',
        price: '900$',
        sale: '899$',
    },
    {
        url: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/iphone-14-pro-max-colors.png',
        name: 'Iphone 15',
        price: '900$',
        sale: '899$',
    },
];

export class Bag extends View {
    private productBag: CardBagList | null = null;

    constructor() {
        super({ tag: 'section', classNames: ['content', 'bag'] });
        this.renderProductBagList();
    }

    public renderProductBagList(props: IBagCards[] = cardsProduct) {
        this.productBag = new CardBagList(props);
        this.viewHtmlElement.addInnerElement(this.productBag.getElement());
    }

    public getWrapperList(): CardBagList | null {
        return this.productBag;
    }
}
