import { View } from '../../../../View';
import './ImgUser.scss';

export class ImgUser extends View {
    constructor(imgUser: string) {
        super({ tag: 'img', classNames: ['user-card__img'] });
        this.setSvgPath(imgUser);
    }

    private setSvgPath(imgUser: string): void {
        const bagImg = this.viewHtmlElement.getElement();
        bagImg.setAttribute('src', imgUser);
    }
}
