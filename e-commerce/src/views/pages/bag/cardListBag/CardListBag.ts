import { View } from '../../../View';
import { CardBag } from '../cardBag/CardBag';
import { IBagCards } from '../Bag';

import './CardListBag.scss';

export class CardBagList extends View {
    private cardsBag: CardBag[] = [];

    constructor(props: IBagCards[]) {
        super({ tag: 'div', classNames: ['card-list__bag'] });
        this.setupCardListBag(props);
    }

    public getCardBagList(): CardBag[] {
        return this.cardsBag;
    }

    private setupCardListBag(props: IBagCards[]): void {
        props.forEach((item) => {
            const { url, name, price, sale, id } = item;
            const cardItem = new CardBag(url, name, price, sale, id);
            this.cardsBag.push(cardItem);
        });
        this.getElement().append(
            ...this.cardsBag.map((item) => {
                return item.getElement();
            })
        );
    }
}
