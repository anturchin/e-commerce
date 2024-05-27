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
        const cardProduct = new Card(
            'https://the-istore.ru/upload/iblock/f00/f0002b9d554706e0cafffc7f318d6fbf/4a5cbbe090879a8089739552a81d0bb1.jpeg',
            'Iphone 15',
            'Iphone 15 with 128 GB storage',
            '$1000',
            '$999'
        ).getElement();
        this.viewHtmlElement.addInnerElement(cardProduct);
    }
}
