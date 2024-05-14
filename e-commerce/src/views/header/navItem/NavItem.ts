import { View } from '../../View';
import './NavItem.scss';

export class NavItem extends View {
    constructor(item: string) {
        super({ tag: 'li', classNames: ['nav-list_item'], textContent: item });
    }
}
