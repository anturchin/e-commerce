import { View } from '../../../View';
import './ImgMap.scss';

import img from '../../../../assets/image/map-pin-solid.svg';

export class ImgMap extends View {
    constructor() {
        super({ tag: 'img', classNames: ['footer__img'] });
        this.setSvgPath();
    }

    private setSvgPath(): void {
        const envelopeImg = this.viewHtmlElement.getElement();
        envelopeImg.setAttribute('src', img);
    }
}
