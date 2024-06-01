import { View } from '../../../View';
import './ImgModal.scss';

export class ImgModal extends View {
    constructor(modalImg: string) {
        super({ tag: 'img', classNames: ['modal__img'] });
        this.setImgPath(modalImg);
    }

    private setImgPath(modalImg: string): void {
        const modalImage = this.viewHtmlElement.getElement();
        modalImage.setAttribute('src', modalImg);
    }
}
