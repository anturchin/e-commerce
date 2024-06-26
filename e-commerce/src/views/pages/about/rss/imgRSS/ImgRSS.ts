import { View } from '../../../../View';
import './ImgRSS.scss';

import img from '../../../../../assets/image/rs-school-CZS_yQWd.webp';

export class ImgRSS extends View {
    constructor() {
        super({ tag: 'a', classNames: ['img-RSS'] });
        this.setImgPath();
    }

    private setImgPath(): void {
        const linkElement = this.viewHtmlElement.getElement();
        linkElement.setAttribute('href', 'https://rs.school/');

        const imgElement = document.createElement('img');
        imgElement.classList.add('img-RSS');
        imgElement.setAttribute('src', img);
        linkElement.appendChild(imgElement);
    }
}
