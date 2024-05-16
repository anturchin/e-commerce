import { View } from '../../View';

export class Login extends View {
    constructor() {
        super({ tag: 'section' });
        this.setupLogin();
    }

    private setupLogin(): void {
        const h1 = document.createElement('h1');
        h1.textContent = 'Login';
        this.viewHtmlElement.addInnerElement(h1);
    }
}
