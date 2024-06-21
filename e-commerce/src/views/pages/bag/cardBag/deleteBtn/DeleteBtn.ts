import { View } from '../../../../View';
import './DeleteBtn.scss';

export class DeleteBtn extends View {
    constructor() {
        super({ tag: 'button', classNames: ['btn-delete'], textContent: 'X' });
    }
}
