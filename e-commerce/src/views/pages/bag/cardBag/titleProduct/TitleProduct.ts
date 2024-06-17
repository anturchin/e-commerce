import { View } from '../../../../View';
import './TitleProduct.scss';

export class TitleProduct extends View {
    constructor(cardTitle: string) {
        super({ tag: 'h4', classNames: ['card__title-bag'], textContent: cardTitle });
    }
}
