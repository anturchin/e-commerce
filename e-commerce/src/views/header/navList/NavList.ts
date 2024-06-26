import { View } from '../../View';
import { NavItem } from '../navItem/NavItem';

import './NavList.scss';

const options: string[] = ['Home', 'Category', 'Sign in', 'Sign up', 'Profile', 'About', 'Logout'];

export class NavList extends View {
    private navItems: NavItem[] = [];

    constructor() {
        super({ tag: 'ul', classNames: ['nav-list', 'hidden'] });
        this.setupNavList();
    }

    public getNavItems(): NavItem[] {
        return this.navItems;
    }

    private setupNavList(): void {
        options.forEach((item) => {
            const navItem = new NavItem(item);
            this.navItems.push(navItem);
            this.viewHtmlElement.addInnerElement(navItem.getElement());
        });
    }
}
