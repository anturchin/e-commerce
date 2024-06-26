import { View } from '../../../../View';
import './BagBtn.scss';

export class BagBtn extends View {
    constructor() {
        super({ tag: 'button', classNames: ['custom-button'], textContent: 'Add bag' });
    }
}
