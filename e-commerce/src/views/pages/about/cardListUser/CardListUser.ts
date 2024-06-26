import { View } from '../../../View';
import { CardUser } from '../cardUser/CardUser';
import { IUserCards } from '../About';

import './CardListUser.scss';

export class CardUserList extends View {
    private cards: CardUser[] = [];

    constructor(props: IUserCards[]) {
        super({ tag: 'div', classNames: ['card-list'] });
        this.setupCardUserList(props);
    }

    public getCardUserList(): CardUser[] {
        return this.cards;
    }

    private setupCardUserList(props: IUserCards[]): void {
        props.forEach((item) => {
            const { imgUrl, role, letter, name, bio, contribution, git } = item;
            const cardItem = new CardUser(imgUrl, role, letter, name, bio, contribution, git);
            this.cards.push(cardItem);
        });
        this.getElement().append(
            ...this.cards.map((item) => {
                return item.getElement();
            })
        );
    }
}
