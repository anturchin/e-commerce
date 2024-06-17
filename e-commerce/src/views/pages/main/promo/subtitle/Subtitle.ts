import { View } from '../../../../View';
import './Subtitle.scss';

export class SubTitle extends View {
    constructor() {
        super({ tag: 'p', classNames: ['promo__subtitle'], textContent: 'Only until June 23' });
    }
}
