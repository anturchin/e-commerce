import { View } from '../../../../View';
import './BtnPrice.scss';

export class BtnPrice extends View {
    constructor() {
        super({ tag: 'button', classNames: ['custom-button'], textContent: 'Make an order' });
    }
}
