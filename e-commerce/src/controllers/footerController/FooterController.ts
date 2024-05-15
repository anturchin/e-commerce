import { Footer } from '../../views/footer/Footer';

export class FooterController {
    private footer: Footer;

    constructor() {
        this.footer = new Footer();
    }

    public render(): HTMLElement {
        return this.footer.getElement();
    }
}
