import { View } from '../../../View';
import './ModalDelete.scss';

export class ModalDelete extends View {
    constructor() {
        super({ tag: 'div', classNames: ['modal-delete'] });
    }
}
