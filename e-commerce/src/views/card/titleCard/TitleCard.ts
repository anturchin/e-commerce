import { View } from '../../View';
import './TitleCard.scss';

export class TitleCard extends View {
    constructor(cardTitle: string) {
        super({ tag: 'h4', classNames: ['card__title'], textContent: cardTitle });
    }
}
