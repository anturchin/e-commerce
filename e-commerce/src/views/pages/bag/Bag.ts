import { View } from '../../View';
import { CardBagList } from './cardListBag/CardListBag';
import './Bag.scss';

export interface IBagCards {
    url: string;
    name: string;
    price: string;
    sale: string;
    id: string;
}

export class Bag extends View {
    private productBag: CardBagList | null = null;

    constructor() {
        super({ tag: 'section', classNames: ['content', 'bag'] });
    }

    public renderProductBagList(props: IBagCards[]) {
        this.productBag = new CardBagList(props);
        this.viewHtmlElement.addInnerElement(this.productBag.getElement());
    }

    public getWrapperList(): CardBagList | null {
        return this.productBag;
    }
}
