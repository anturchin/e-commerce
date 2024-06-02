import { View } from '../../View';
import './LinkNext.scss';

export class LinkNext extends View {
    constructor() {
        super({ tag: 'button', classNames: ['next'], textContent: 'next' });
    }
}
