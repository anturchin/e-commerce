import { View } from '../../../../View';
import './PriceBag.scss';

export class PriceBag extends View {
    constructor(cardPrice: string) {
        super({ tag: 'p', classNames: ['card__price'], textContent: cardPrice });
    }
}
