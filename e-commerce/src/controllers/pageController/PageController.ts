import { Publisher } from '../../observers/Publisher';
import { Router } from '../../router/Router';
import { ProductType } from '../../router/types';
import { Wrapper } from '../../views/pages/Wrapper';
import { ControllerName, IController } from './PageController.interface';

export class PageController {
    private wrapper: Wrapper;

    private router: Router | null = null;

    private authPublisher: Publisher<boolean>;

    constructor(authPublisher: Publisher<boolean>) {
        this.wrapper = new Wrapper();
        this.authPublisher = authPublisher;
    }

    public setRouter(router: Router): void {
        this.router = router;
    }

    public getRouter(): Router | null {
        return this.router;
    }

    public async updateContent(
        controllerName: ControllerName,
        productType?: ProductType,
        productId?: string
    ): Promise<void> {
        try {
            let controllerInstance: IController;

            if (controllerName === ControllerName.PRODUCT_DETAIL && productType && productId) {
                controllerInstance = await this.loadProductDetailController(productType, productId);
            } else if (controllerName === ControllerName.PRODUCT && productType) {
                controllerInstance = await this.loadProductController(productType);
            } else {
                controllerInstance = await this.loadController(controllerName);
            }
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

    private async loadProductController(productType: ProductType): Promise<IController> {
        const { ProductController } = await import('./productController/ProductController');
        return new ProductController(productType);
    }

    private async loadProductDetailController(
        productType: ProductType,
        productId: string
    ): Promise<IController> {
        const { ProductDetailController } = await import(
            './productDetailController/ProductDetailController'
        );
        return new ProductDetailController(productType, productId);
    }

    private async loadController(controllerName: ControllerName): Promise<IController> {
        switch (controllerName) {
            case ControllerName.LOGIN: {
                const { LoginController } = await import('./loginController/LoginController');
                return new LoginController(this.getRouter(), this.authPublisher);
            }
            case ControllerName.REGISTRATION: {
                const { RegistrationController } = await import(
                    './registrationController/RegistrationController'
                );
                return new RegistrationController(this.getRouter(), this.authPublisher);
            }
            case ControllerName.MAIN: {
                const { MainController } = await import('./mainController/MainController');
                return new MainController();
            }
            case ControllerName.CATEGORY: {
                const { CategoryController } = await import(
                    './categoryController/CategoryController'
                );
                return new CategoryController();
            }
            case ControllerName.PROFILE: {
                const { ProfileController } = await import('./profileController/ProfileController');
                return new ProfileController();
            }
            case ControllerName.ABOUT: {
                const { AboutController } = await import('./aboutController/AboutController');
                return new AboutController();
            }
            case ControllerName.NOT_FOUND: {
                const { NotFoundController } = await import(
                    './notFoundController/NotFoundController'
                );
                return new NotFoundController();
            }
            default:
                throw new Error(`Controller ${controllerName} not found`);
        }
    }
}
