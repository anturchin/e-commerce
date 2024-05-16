import { View } from '../../View';

export class NotFound extends View {
    constructor() {
        super({ tag: 'section' });
        this.setupNotFound();
    }

    private setupNotFound(): void {
        const h1 = document.createElement('h1');
        h1.textContent = 'NotFound';
        this.viewHtmlElement.addInnerElement(h1);
    }
}
