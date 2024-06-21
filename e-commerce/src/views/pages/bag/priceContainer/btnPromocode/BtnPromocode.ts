import { View } from '../../../../View';
import './BtnPromocode.scss';

export class BtnPromocode extends View {
    constructor() {
        super({ tag: 'button', classNames: ['custom-button'], textContent: 'Check' });
    }
}
