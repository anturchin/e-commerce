import { View } from '../../../../View';
import './Title.scss';

export class Title extends View {
    constructor() {
        super({ tag: 'H3', classNames: ['promo__title'], textContent: 'Promocode' });
    }
}
