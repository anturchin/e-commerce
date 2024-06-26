import { View } from '../../View';
import './LinkPrev.scss';

export class LinkPrev extends View {
    constructor() {
        super({ tag: 'a', classNames: ['prev'] });
        this.getElement().innerHTML = '&#10094;';
    }
}
