import { View } from '../../../../View';
import './Btn.scss';

export class ModalBtn extends View {
    constructor(content: string) {
        super({ tag: 'button', classNames: ['modal__btn'], textContent: content });
    }
}
