import { View } from '../../View';
import './DescriptCard.scss';

export class DescriptCard extends View {
    constructor(cardDescription: string) {
        super({
            tag: 'p',
            classNames: ['card__description'],
            textContent: cardDescription,
        });
    }
}
