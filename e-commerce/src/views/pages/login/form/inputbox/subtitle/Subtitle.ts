import { View } from '../../../../../View';
import './Subtitle.scss';

export class SubTitle extends View {
    constructor() {
        super({ tag: 'H1', classNames: ['subtitle'], textContent: 'Show password' });
    }
}
