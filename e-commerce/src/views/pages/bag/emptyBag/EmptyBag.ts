import { View } from '../../../View';
import { ImgEmptyBag } from './imgEmpty/ImgEmpty';
import { TitleEmpty } from './titleEmpty/TitleEmpty';

import './EmptyBag.scss';

export class EmptyBag extends View {
    constructor() {
        super({ tag: 'div', classNames: ['container__empty-bag'] });
        this.setupContainer();
    }

    setupContainer() {
        const img = new ImgEmptyBag().getElement();
        this.viewHtmlElement.addInnerElement(img);

        const title = new TitleEmpty().getElement();
        this.viewHtmlElement.addInnerElement(title);
    }
}
