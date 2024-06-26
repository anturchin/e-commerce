/* eslint-disable object-curly-newline */
import { View } from '../../../View';
import { Card } from '../card/Card';
import { ICards } from '../Products';
import './CardList.scss';

export class CardList extends View {
    private cards: Card[] = [];

    constructor(props: ICards[]) {
        super({ tag: 'div', classNames: ['card-list-bag'] });
        this.setupCardList(props);
    }

    public getCardList(): Card[] {
        return this.cards;
    }

    public setupCardList(props: ICards[]): void {
        this.cards = [];
        props.forEach((item) => {
            const { url, name, description, price, sale, id } = item;
            const cardItem = new Card(url, name, description, price, sale, id);
            this.cards.push(cardItem);
        });
        this.getElement().append(
            ...this.cards.map((item) => {
                return item.getElement();
            })
        );
    }
}
