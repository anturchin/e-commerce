import { View } from '../../View';
import './LinkNext.scss';

export class LinkNext extends View {
    constructor() {
        super({ tag: 'a', classNames: ['next'] });
        this.getElement().innerHTML = '&#10095;';
    }
}
