import { View } from '../../View';
import { Card } from '../../card/Card';

export class Main extends View {
    constructor() {
        super({ tag: 'section', classNames: ['content'] });
        this.setupMain();
    }

    private setupMain(): void {
        const cardProduct = new Card().getElement();
        this.viewHtmlElement.addInnerElement(cardProduct);
    }
}
