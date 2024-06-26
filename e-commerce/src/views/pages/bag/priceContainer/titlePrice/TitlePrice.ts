import { View } from '../../../../View';
import './TitlePrice.scss';

export class TitlePrice extends View {
    constructor() {
        super({ tag: 'h4', classNames: ['price__title'], textContent: 'Amount payable:' });
    }
}
