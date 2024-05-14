import { View } from '../../../View';
import './Subtitle.scss';

export class Subtitle extends View {
    constructor() {
        super({ tag: 'p', classNames: ['subtitle'], textContent: 'Support' });
    }
}
