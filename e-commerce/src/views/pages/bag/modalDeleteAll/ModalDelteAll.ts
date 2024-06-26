import { View } from '../../../View';
import { Subtitle } from './subtitle/Subtitle';
import { ModalBtn } from './btn/Btn';
import { Container } from '../../about/collaboration/container/Container';
import './ModalDeleteAll.scss';

export class ModalDeleteAll extends View {
    constructor() {
        super({ tag: 'div', classNames: ['modal-delete-all'] });
        this.setupModal();
    }

    setupModal() {
        const valueY = 'Yes';
        const valueN = 'No';
        const title = new Subtitle().getElement();
        this.viewHtmlElement.addInnerElement(title);

        const div = new Container().getElement();

        const btnY = new ModalBtn(valueY).getElement();
        const btnN = new ModalBtn(valueN).getElement();

        div.append(btnY, btnN);
        this.viewHtmlElement.addInnerElement(div);
    }
}
