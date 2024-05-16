import { View } from '../View';
import { NavList } from './navList/NavList';
import { SvgBag } from './imgBag/ImgBag';
import './Header.scss';

export class Header extends View {
    private navList: NavList | null = null;

    constructor() {
        super({ tag: 'header', classNames: ['header'] });
        this.setupHeaderContent();
    }

    public getNavList(): NavList | null {
        return this.navList;
    }

    private setupHeaderContent(): void {
        this.navList = new NavList();
        const img = new SvgBag().getElement();
        this.viewHtmlElement.addInnerElement(this.navList.getElement());
        this.viewHtmlElement.addInnerElement(img);
    }
}
