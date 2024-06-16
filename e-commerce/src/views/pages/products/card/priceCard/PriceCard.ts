import { View } from '../../../../View';
import './PriceCard.scss';

export class Price extends View {
    constructor(cardPrice: string) {
        super({ tag: 'p', classNames: ['card__price'], textContent: cardPrice });
    }
}
