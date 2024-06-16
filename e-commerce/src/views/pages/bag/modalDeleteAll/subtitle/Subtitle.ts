import { View } from '../../../../View';
import './Subtitle.scss';

export class Subtitle extends View {
    constructor() {
        super({
            tag: 'p',
            classNames: ['modal-delete-all__subtitle'],
            textContent: 'Are you sure you want to remove all items from your cart?',
        });
    }
}
