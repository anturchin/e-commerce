import { View } from '../../View';
import { NavItem } from '../navItem/NavItem';
import './NavList.scss';

const str: string[] = ['About', 'Contacts', 'Product', 'Support'];

export class NavList extends View {
    private navItems: NavItem[] = [];

    constructor() {
        super({ tag: 'ul', classNames: ['nav-list'] });
        this.setupNavList();
    }

    private setupNavList(): void {
        str.forEach((item) => {
            const navItem = new NavItem(item);
            this.navItems.push(navItem);
            this.viewHtmlElement.addInnerElement(navItem.getElement());
        });
    }
}
