import { View } from '../../View';
import { CardBagList } from './cardListBag/CardListBag';
import { EmptyBag } from './emptyBag/EmptyBag';
import './Bag.scss';

export interface IBagCards {
    url: string;
    name: string;
    price: string;
    sale: string;
}

export class Bag extends View {
    private productBag: CardBagList | null = null;

    constructor() {
        super({ tag: 'section', classNames: ['content', 'bag'] });
        const empty = new EmptyBag().getElement();
        this.viewHtmlElement.addInnerElement(empty);
    }

    public renderProductBagList(props: IBagCards[]) {
        this.productBag = new CardBagList(props);
        this.viewHtmlElement.addInnerElement(this.productBag.getElement());
    }

    public getWrapperList(): CardBagList | null {
        return this.productBag;
    }
}
