import { Router } from '../router/Router';
import { RoutePath } from '../router/types';
import { FooterController } from '../controllers/footerController/FooterController';
import { HeaderController } from '../controllers/headerController/HeaderController';
import { PageController } from '../controllers/pageController/PageController';
import { TokenForRegistration } from '../services/TokenService/TokenForRegistration';
import { LocalStorageManager } from '../utils/localStorageManager/LocalStorageManager';

export class App {
    private pageController: PageController;

    private router: Router;

    private headerController: HeaderController;

    private footerController: FooterController;

    constructor() {
        this.pageController = new PageController();
        this.router = new Router(this.pageController);
        this.pageController.setRouter(this.router);
        this.headerController = new HeaderController(this.router);
        this.footerController = new FooterController(this.router);

        this.initializeApp();
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

    private async initializeApp(): Promise<void> {
        try {
            const tokenResponse = await TokenForRegistration.getToken();
            if ('access_token' in tokenResponse) {
                LocalStorageManager.saveToken(tokenResponse.access_token);
            }
        } catch (error) {
            console.error('Failed to fetch token:', error);
        }
    }
}
