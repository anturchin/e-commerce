import { View } from '../../../../View';
import './ImgColab.scss';

import img from '../../../../../assets/image/colab.png';

export class ImgColab extends View {
    constructor() {
        super({ tag: 'img', classNames: ['img-colab'] });
        this.setImgPath();
    }

    private setImgPath(): void {
        const envelopeImg = this.viewHtmlElement.getElement();
        envelopeImg.setAttribute('src', img);
    }
}
