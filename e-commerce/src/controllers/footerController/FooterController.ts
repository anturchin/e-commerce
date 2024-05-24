import { Router } from '../../router/Router';
import { Footer } from '../../views/footer/Footer';

export class FooterController {
    private footer: Footer;

    private router: Router;

    constructor(router: Router) {
        this.footer = new Footer();
        this.router = router;
    }

    public render(): HTMLElement {
        return this.footer.getElement();
    }
}
