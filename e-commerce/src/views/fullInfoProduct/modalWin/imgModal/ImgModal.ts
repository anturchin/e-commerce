import { View } from '../../../View';
import './ImgModal.scss';

export class ImgModal extends View {
    private modalImgs: string[];

    private activeIndex: number;

    constructor(modalImgs: string[], activeIndex: number) {
        super({ tag: 'div', classNames: ['modal__img'] });
        this.modalImgs = modalImgs;
        this.activeIndex = activeIndex;
        this.setupImages();
    }

    private setupImages() {
        const img = document.createElement('img');
        img.src = this.modalImgs[this.activeIndex];
        this.viewHtmlElement.addInnerElement(img);
    }
}
