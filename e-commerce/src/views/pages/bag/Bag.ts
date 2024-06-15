import { View } from '../../View';
import { CardBagList } from './cardListBag/CardListBag';
import { BtnDeleteAll } from './btnDeleteAll/BtnDeleteAll';
import './Bag.scss';
import { Router } from '../../../router/Router';
import { PriceContainer } from './priceContainer/PriceContainer';
import { EmptyBag } from './emptyBag/EmptyBag';

export interface IBagCards {
    url: string;
    name: string;
    price: string;
    sale: string;
    id: string;
}

export class Bag extends View {
    private productBag: CardBagList = new CardBagList();

    private emptyBagMessage: EmptyBag = new EmptyBag();

    private router: Router | null;

    private priceContainer: PriceContainer | null = null;

    private btnDelete: BtnDeleteAll;

    constructor(router: Router | null) {
        super({ tag: 'section', classNames: ['content', 'bag'] });
        const fullPrice = '0$';
        this.router = router;
        this.createPriceContainer(fullPrice);

        this.btnDelete = new BtnDeleteAll();
        this.btnDelete.hide();
        this.viewHtmlElement.addInnerElement(this.btnDelete.getElement());

        this.viewHtmlElement.addInnerElement(this.emptyBagMessage.getElement());
    }

    public renderProductBagList(props: IBagCards[]) {
        if (props.length === 0) {
            this.emptyBagMessage?.setupContainer(this.router);
            this.emptyBagMessage.show();
            this.productBag.hide();
            if (this.priceContainer) {
                this.priceContainer.hide();
            }
            if (this.btnDelete) {
                this.btnDelete.hide();
            }
        } else {
            this.emptyBagMessage.hide();
            this.productBag.setupCardListBag(props);
            this.viewHtmlElement.addInnerElement(this.productBag.getElement());
            if (this.priceContainer) {
                this.priceContainer.show();
            }
            if (this.btnDelete) {
                this.btnDelete.show();
            }
        }
    }

    public getWrapperList(): CardBagList | null {
        return this.productBag;
    }

    public createPriceContainer(fullPrice: string): void {
        this.priceContainer = new PriceContainer(fullPrice);
        this.priceContainer.hide();
        const price = this.priceContainer.getElement();
        this.viewHtmlElement.addInnerElement(price);
    }

    public updatePrice(price: string): void {
        if (this.priceContainer) {
            this.priceContainer.updatePrice(price);
        }
    }
}
