import { View } from '../../View';
import './ModalWin.scss';

import { Button } from '../../button/Button';
import { SlidesShow } from '../../slidesShow/SlidesShow';

export class ModalWin extends View {
    private slidesShow: SlidesShow;

    constructor(modalImg: string[]) {
        super({ tag: 'div', classNames: ['modal-win'] });
        this.slidesShow = new SlidesShow(modalImg);
        this.setModalWin();
        this.getElement().style.display = 'none';
    }

    setModalWin(): void {
        this.viewHtmlElement.setInnerHtml('');
        const btnClose = new Button({
            label: 'Close',
            onClick: () => this.closeModal(),
        }).getElement();

        this.viewHtmlElement.addInnerElement(btnClose);
        this.viewHtmlElement.addInnerElement(this.slidesShow.getElement());
    }

    public showModal(): void {
        this.changeImageStyle();
        this.getElement().style.display = 'block';
    }

    public closeModal(): void {
        this.getElement().style.display = 'none';
    }

    private changeImageStyle(): void {
        const images = this.slidesShow.getElement().querySelectorAll('img');
        images.forEach((img) => {
            img.classList.remove('img-slide');
        });
    }
}
