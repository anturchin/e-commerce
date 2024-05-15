import { Header } from '../views/header/Header';
import { Footer } from '../views/footer/Footer';

export class App {
    private header: Header;

    private footer: Footer;

    constructor() {
        this.header = new Header();
        this.footer = new Footer();
    }

    public render(): void {
        const header = this.header.getElement();
        const footer = this.footer.getElement();
        const body: HTMLElement | null = document.querySelector('body');
        if (body) {
            body.append(...[header, footer]);
        }
    }
}
