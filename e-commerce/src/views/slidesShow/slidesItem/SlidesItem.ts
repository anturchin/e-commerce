import { View } from '../../View';
import './SlidesItem.scss';

export class SliesItem extends View {
    constructor(url: string) {
        super({ tag: 'div', classNames: ['slides'] });
        this.setupSlidesItem(url);
    }

    setupSlidesItem(url: string) {
        const img = document.createElement('img');
        img.classList.add('img-slide', 'modal-slide');
        img.setAttribute('src', url);
        this.viewHtmlElement.addInnerElement(img);
    }
}
