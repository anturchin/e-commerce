import { View } from '../../../../View';
import './ImgEmpty.scss';

import img from '../../../../../assets/image/3225130.svg';

export class ImgEmptyBag extends View {
    constructor() {
        super({ tag: 'img', classNames: ['empty__img'] });
        this.setImgPath();
    }

    private setImgPath(): void {
        const emptyBagImg = this.viewHtmlElement.getElement();
        emptyBagImg.setAttribute('src', img);
    }
}
