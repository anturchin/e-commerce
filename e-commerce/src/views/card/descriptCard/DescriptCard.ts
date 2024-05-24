import { View } from '../../View';
import './DescriptCard.scss';

export class DescriptCard extends View {
    constructor() {
        super({
            tag: 'p',
            classNames: ['card__description'],
            textContent: 'Sleek iPhone 15 with 128GB of storage',
        });
    }
}
