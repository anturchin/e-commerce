import { View } from '../../View';
import { NavItem } from '../navItem/NavItem';
import './NavList.scss';

const options: string[] = ['Home', 'Sign in', 'Sign up'];

export class NavList extends View {
    private navItems: NavItem[] = [];

    constructor() {
        super({ tag: 'ul', classNames: ['nav-list'] });
        this.setupNavList();
    }

    private setupNavList(): void {
        options.forEach((item) => {
            const navItem = new NavItem(item);
            this.navItems.push(navItem);
            this.viewHtmlElement.addInnerElement(navItem.getElement());
        });
    }
}
