import { View } from '../../View';
import './PriceCard.scss';

export class Price extends View {
    constructor() {
        super({ tag: 'p', classNames: ['card__price'], textContent: '$1000' });
    }
}
