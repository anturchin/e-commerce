import { View } from '../../View';
import { CardBagList } from './cardListBag/CardListBag';
import { BtnDeleteAll } from './btnDeleteAll/BtnDeleteAll';
// import { EmptyBag } from './emptyBag/EmptyBag';
import './Bag.scss';
import { Router } from '../../../router/Router';
import { PriceContainer } from './priceContainer/PriceContainer';

export interface IBagCards {
    url: string;
    name: string;
    price: string;
    sale: string;
}

export class Bag extends View {
    private productBag: CardBagList | null = null;

    private router: Router | null;

    constructor(router: Router | null) {
        const fullPrice = '5000$';
        super({ tag: 'section', classNames: ['content', 'bag'] });
        this.router = router;
        // const empty = new EmptyBag(this.router).getElement();
        // this.viewHtmlElement.addInnerElement(empty);

        const price = new PriceContainer(fullPrice).getElement();
        this.viewHtmlElement.addInnerElement(price);

        const btnDelete = new BtnDeleteAll().getElement();
        this.viewHtmlElement.addInnerElement(btnDelete);
    }

    public renderProductBagList(props: IBagCards[]) {
        this.productBag = new CardBagList(props);
        this.viewHtmlElement.addInnerElement(this.productBag.getElement());
    }

    public getWrapperList(): CardBagList | null {
        return this.productBag;
    }
}
