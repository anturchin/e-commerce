import { View } from '../../../View';
import './ImgEnvelop.scss';

import img from '../../../../assets/image/envelope-solid.svg';

export class ImgEnvelope extends View {
    constructor() {
        super({ tag: 'img', classNames: ['footer__img'] });
        this.setSvgPath();
    }

    private setSvgPath(): void {
        const envelopeImg = this.viewHtmlElement.getElement();
        envelopeImg.setAttribute('src', img);
    }
}
