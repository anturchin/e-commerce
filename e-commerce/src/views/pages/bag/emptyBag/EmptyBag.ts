import { View } from '../../../View';
import { ImgEmptyBag } from './imgEmpty/ImgEmpty';
import { TitleEmpty } from './titleEmpty/TitleEmpty';
import { BtnProduct } from './btnProduct/BtnProduct';

import './EmptyBag.scss';
import { Router } from '../../../../router/Router';

export class EmptyBag extends View {
    constructor() {
        super({ tag: 'div', classNames: ['container__empty-bag'] });
    }

    setupContainer(router: Router | null) {
        const img = new ImgEmptyBag().getElement();
        this.viewHtmlElement.addInnerElement(img);

        const title = new TitleEmpty().getElement();
        this.viewHtmlElement.addInnerElement(title);

        const btn = new BtnProduct(router).getElement();
        this.viewHtmlElement.addInnerElement(btn);
    }
}
