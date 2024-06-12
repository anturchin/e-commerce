import { View } from '../../../../View';
import './TitleEmpty.scss';

export class TitleEmpty extends View {
    constructor() {
        super({
            tag: 'h3',
            classNames: ['subtitle-empty'],
            textContent: 'Your cart is currently empty. Would you like to do some shopping?',
        });
    }
}
