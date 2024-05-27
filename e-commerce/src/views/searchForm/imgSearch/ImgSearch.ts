import { View } from '../../View';
import './ImgSearch.scss';

import img from '../../../assets/image/free-icon-magnifier-795724.png';

export class ImgSearch extends View {
    constructor() {
        super({ tag: 'img', classNames: ['search_img'] });
        this.setImgPath();
    }

    private setImgPath(): void {
        const CardImg = this.viewHtmlElement.getElement();
        CardImg.setAttribute('src', img);
    }
}
