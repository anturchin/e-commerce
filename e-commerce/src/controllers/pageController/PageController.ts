import { Wrapper } from '../../views/pages/Wrapper';
import { ControllerName, IController } from './PageController.interface';
import { LoginController } from './loginController/LoginController';
import { MainController } from './mainController/MainController';
import { NotFoundController } from './notFoundController/NotFoundController';
import { RegistrationController } from './registrationController/RegistrationController';

export class PageController {
    private wrapper: Wrapper;

    private loginController: LoginController;

    private registrationController: RegistrationController;

    private mainController: MainController;

    private notFoundController: NotFoundController;

    constructor() {
        this.wrapper = new Wrapper();
        this.loginController = new LoginController();
        this.registrationController = new RegistrationController();
        this.mainController = new MainController();
        this.notFoundController = new NotFoundController();
    }

    private async loadController(controllerName: ControllerName): Promise<IController> {
        switch (controllerName) {
            case ControllerName.LOGIN: {
                const { LoginController } = await import('./loginController/LoginController');
                return new LoginController();
            }
            case ControllerName.REGISTRATION: {
                const { RegistrationController } = await import(
                    './registrationController/RegistrationController'
                );
                return new RegistrationController();
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
}
