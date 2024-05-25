import { View } from '../../View';
import { Card } from '../../card/Card';
import { SearchForm } from '../../searchForm/SearchForm';

export class Main extends View {
    constructor() {
        super({ tag: 'section', classNames: ['content'] });
        this.setupMain();
    }

    private setupMain(): void {
        const search = new SearchForm().getElement();
        this.viewHtmlElement.addInnerElement(search);
        const cardProduct = new Card().getElement();
        this.viewHtmlElement.addInnerElement(cardProduct);
    }
}
