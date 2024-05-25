import { View } from '../../View';
import { Card } from '../../card/Card';
import { FormSort } from '../../sortList/SortList';

export class Main extends View {
    constructor() {
        super({ tag: 'section', classNames: ['content'] });
        this.setupMain();
    }

    private setupMain(): void {
        const sort = new FormSort().getElement();
        this.viewHtmlElement.addInnerElement(sort);
        const cardProduct = new Card().getElement();
        this.viewHtmlElement.addInnerElement(cardProduct);
    }
}
