import { View } from '../../View';
import './LinkPrev.scss';

export class LinkPrev extends View {
    constructor() {
        super({ tag: 'button', classNames: ['prev'], textContent: 'prev' });
    }
}
