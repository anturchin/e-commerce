import { View } from '../../../View';
import './BtnDeleteAll.scss';

export class BtnDeleteAll extends View {
    constructor() {
        super({ tag: 'button', classNames: ['custom-button-delete'], textContent: 'Empty trash' });
    }
}
