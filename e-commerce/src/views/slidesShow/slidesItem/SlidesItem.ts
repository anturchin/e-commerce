import { View } from '../../View';

export class SliesItem extends View {
    constructor(url: string) {
        super({ tag: 'div', classNames: ['slides'] });
        this.setupSlidesItem(url);
    }

    setupSlidesItem(url: string) {
        const img = document.createElement('img');
        img.setAttribute('src', url);
        this.viewHtmlElement.addInnerElement(img);
    }
}
