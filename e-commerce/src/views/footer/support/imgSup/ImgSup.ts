import { View } from '../../../View';
import './ImgSup.scss';

import img from '../../../../assets/image/person-solid.svg';

export class ImgSup extends View {
    constructor() {
        super({ tag: 'img', classNames: ['footer__img'] });
        this.setSvgPath();
    }

    private setSvgPath(): void {
        const envelopeImg = this.viewHtmlElement.getElement();
        envelopeImg.setAttribute('src', img);
    }
}
