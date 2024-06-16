import { View } from '../../../View';
import { CardBag } from '../cardBag/CardBag';
import { IBagCards } from '../Bag';

import './CardListBag.scss';

export class CardBagList extends View {
    private cardsBag: CardBag[] = [];

    constructor() {
        super({ tag: 'div', classNames: ['card-list__bag'] });
    }

    public getCardBagList(): CardBag[] {
        return this.cardsBag;
    }

    public clearBag(): void {
        this.cardsBag = [];
        this.getElement().innerHTML = '';
    }

    public setupCardListBag(props: IBagCards[]): void {
        this.clearBag();
        props.forEach((item) => {
            const { url, name, price, sale, id, quantity } = item;
            const cardItem = new CardBag(url, name, price, sale, id, quantity);
            this.cardsBag.push(cardItem);
        });
        this.getElement().append(
            ...this.cardsBag.map((item) => {
                return item.getElement();
            })
        );
    }

    public hide(): void {
        this.getElement().style.display = 'none';
    }

    public show(): void {
        this.getElement().style.display = '';
    }
}
