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
        this.clearContainer();
        const img = new ImgEmptyBag().getElement();
        this.viewHtmlElement.addInnerElement(img);

        const title = new TitleEmpty().getElement();
        this.viewHtmlElement.addInnerElement(title);

        const btn = new BtnProduct(router).getElement();
        this.viewHtmlElement.addInnerElement(btn);
    }

    private clearContainer() {
        this.getElement().innerHTML = '';
    }

    public hide(): void {
        this.getElement().style.display = 'none';
    }

    public show(): void {
        this.getElement().style.display = '';
    }
}
