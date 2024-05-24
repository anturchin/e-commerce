import { Publisher } from '../../../observers/Publisher';
import { Router } from '../../../router/Router';
import { RoutePath } from '../../../router/types';
import { AuthService } from '../../../services/AuthService/AuthService';
import { ICustomerForLogin } from '../../../services/AuthService/types';
import { ErrorManager } from '../../../utils/errorManager/ErrorManager';
import { InputValidator } from '../../../utils/inputValidator/InputValidator';
import { LocalStorageManager } from '../../../utils/localStorageManager/LocalStorageManager';
import { Login } from '../../../views/pages/login/Login';
import { IController } from '../PageController.interface';

export class LoginController implements IController {
    private delay: number = 5000;

    private page: Login;

    private router: Router | null;

    private authPublisher: Publisher<boolean>;

    constructor(router: Router | null, authPublisher: Publisher<boolean>) {
        this.router = router;
        this.authPublisher = authPublisher;
        this.page = new Login();
        this.setupFormHandler();
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.onClickToLogin();
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }

    private async redirectToLogin(): Promise<void> {
        await this.router?.navigate(RoutePath.REGISTRATION);
    }

    private onClickToLogin(): void {
        const buttonRegistration = this.page.getButtonRegistration();
        if (buttonRegistration) {
            buttonRegistration.getElement().addEventListener('click', this.redirectToLogin);
        }
    }

    private setupFormHandler(): void {
        const form = this.page.getForm();
        if (form) {
            form.getElement().addEventListener('submit', async (event) => {
                event.preventDefault();
                await this.validateForm();
            });
        }
    }

    private enableBtn(switchOn: boolean): void {
        const formElements = this.page.getForm().getFormElements();
        if (!formElements) {
            return;
        }
        const btn = formElements.buttonSubmit.getElement() as HTMLButtonElement;
        btn.disabled = switchOn;
    }

    private closeErrorMessage(error: ErrorManager): void {
        const timerId = setTimeout(() => {
            error.hideError();
            this.enableBtn(false);
            clearTimeout(timerId);
        }, this.delay);
    }

    private showError(error: ErrorManager, element: HTMLElement): void {
        error.showError(element);
        this.enableBtn(true);
        this.closeErrorMessage(error);
    }

    private showErrors(errors: Record<string, string>): void {
        const formElements = this.page.getForm().getFormElements();
        if (!formElements) {
            return;
        }
        if ('email' in errors) {
            const emailError = new ErrorManager(errors.email);
            this.showError(emailError, formElements.inputLogin.getElement());
        }
        if ('password' in errors) {
            const passwordError = new ErrorManager(errors.password);
            this.showError(passwordError, formElements.inputPassword.getElement());
        }
    }

    private async submitForm(customer: ICustomerForLogin): Promise<void> {
        const token = LocalStorageManager.getToken();
        if (token) {
            const customerResponse = await AuthService.login(token, customer);
            if ('customer' in customerResponse) {
                const { firstName } = customerResponse.customer;
                const { id } = customerResponse.customer;
                LocalStorageManager.saveUserData({ firstName, id });
                this.authPublisher.notifyObservers(true);
                if (this.router) await this.router.navigate(RoutePath.MAIN);
                return;
            }
            if ('msg' in customerResponse) {
                const errorAuth = this.page.getErrorAuth();
                errorAuth.showMessage(customerResponse.msg, customerResponse.statusCode);
            }
        }
    }

    private async validateForm(): Promise<void> {
        const formElements = this.page.getForm().getFormElements();
        if (!formElements) {
            return;
        }

        const errors: Record<string, string> = {};

        const email = formElements.inputLogin.getValue();
        const password = formElements.inputPassword.getValue();

        if (!InputValidator.isValidEmail(email)) {
            errors.email = 'Invalid email, example: "user@example.com"';
        }

        if (!InputValidator.isValidPassword(password)) {
            errors.password = 'Invalid password, example: "Password1!"';
        }

        if (Object.keys(errors).length > 0) {
            this.showErrors(errors);
        } else {
            try {
                await this.submitForm({
                    email,
                    password,
                });
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        }
    }
}
