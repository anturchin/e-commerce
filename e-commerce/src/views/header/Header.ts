import { View } from '../View';
import { NavList } from './navList/NavList';
import { SvgBag } from './imgBag/ImgBag';
import './Header.scss';

export class Header extends View {
    constructor() {
        super({ tag: 'header', classNames: ['header'] });
        this.setupHeaderContent();
    }

    private setupHeaderContent(): void {
        const navContent = new NavList().getElement();
        const img = new SvgBag().getElement();
        this.viewHtmlElement.addInnerElement(navContent);
        this.viewHtmlElement.addInnerElement(img);
    }
}
