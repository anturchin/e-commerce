import { View } from '../../View';
import './ModalWin.scss';

import { ImgModal } from './imgModal/ImgModal';
import { Button } from '../../button/Button';

export class ModalWin extends View {
    constructor(modalImg: string) {
        super({ tag: 'div', classNames: ['modal-win'] });
        this.setModalWin(modalImg);
        this.getElement().style.display = 'none';
    }

    private setModalWin(modalImg: string): void {
        const img = new ImgModal(modalImg).getElement();
        const btnClose = new Button({
            label: 'Close',
            onClick: () => this.closeModal(),
        }).getElement();

        this.viewHtmlElement.addInnerElement(btnClose);
        this.viewHtmlElement.addInnerElement(img);
    }

    public showModal(): void {
        this.getElement().style.display = 'block';
    }

    public closeModal(): void {
        this.getElement().style.display = 'none';
    }
}
