import { View } from '../../View';

export class Registration extends View {
    constructor() {
        super({ tag: 'section' });
        this.setupRegistration();
    }

    private setupRegistration(): void {
        const h1 = document.createElement('h1');
        h1.textContent = 'Registration';
        this.viewHtmlElement.addInnerElement(h1);
    }
}
