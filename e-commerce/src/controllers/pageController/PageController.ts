import { Router } from '../../router/Router';
import { Wrapper } from '../../views/pages/Wrapper';
import { ControllerName, IController } from './PageController.interface';

export class PageController {
    private wrapper: Wrapper;

    private router: Router | null = null;

    constructor() {
        this.wrapper = new Wrapper();
    }

    public setRouter(router: Router): void {
        this.router = router;
    }

    public getRouter(): Router | null {
        return this.router;
    }

    public async updateContent(controllerName: ControllerName): Promise<void> {
        try {
            const controllerInstance = await this.loadController(controllerName);
            const content = await controllerInstance.getElement();
            this.wrapper.updateContent(content);
        } catch (error) {
            console.error(error);
            const content = document.createElement('div');
            content.innerHTML = '<h1>Page Not Found</h1>';
            this.wrapper.updateContent(content);
        }
    }

    public render(): HTMLElement {
        return this.wrapper.getElement();
    }

    private async loadController(controllerName: ControllerName): Promise<IController> {
        switch (controllerName) {
            case ControllerName.LOGIN: {
                const { LoginController } = await import('./loginController/LoginController');
                return new LoginController(this.getRouter());
            }
            case ControllerName.REGISTRATION: {
                const { RegistrationController } = await import(
                    './registrationController/RegistrationController'
                );
                return new RegistrationController(this.getRouter());
            }
            case ControllerName.MAIN: {
                const { MainController } = await import('./mainController/MainController');
                return new MainController();
            }
            case ControllerName.NOT_FOUND: {
                const { MainController } = await import('./mainController/MainController');
                return new MainController();
            }
            default:
                throw new Error(`Controller ${controllerName} not found`);
        }
    }
}
