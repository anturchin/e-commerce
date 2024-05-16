import { View } from '../../View';

export class Main extends View {
    constructor() {
        super({ tag: 'section' });
        this.setupMain();
    }

    private setupMain(): void {
        const h1 = document.createElement('h1');
        h1.textContent = 'Home';
        this.viewHtmlElement.addInnerElement(h1);
    }
}
