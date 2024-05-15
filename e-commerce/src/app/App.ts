import { Router } from '../router/Router';
import { RoutePath } from '../router/types';
import { FooterController } from '../controllers/footerController/FooterController';
import { HeaderController } from '../controllers/headerController/HeaderController';
import { PageController } from '../controllers/pageController/PageController';

export class App {
    private pageController: PageController;

    private router: Router;

    private headerController: HeaderController;

    private footerController: FooterController;

    constructor() {
        this.pageController = new PageController();
        this.router = new Router(this.pageController);
        this.headerController = new HeaderController();
        this.footerController = new FooterController();
    }

    public render(): void {
        if (!this.router.getUrl()) {
            this.router.navigate(RoutePath.MAIN);
        } else {
            this.router.navigate(this.router.getUrl());
        }
        const header = this.headerController.render();
        const wrapper = this.pageController.render();
        const footer = this.footerController.render();
        const body: HTMLElement | null = document.querySelector('body');
        if (body) {
            body.append(...[header, wrapper, footer]);
        }
    }
}
