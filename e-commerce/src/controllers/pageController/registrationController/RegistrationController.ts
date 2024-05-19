import { Router } from '../../../router/Router';
import { RoutePath } from '../../../router/types';
import { RegistrationService } from '../../../services/RegistrationService/RegistrationService';
import { ICustomer } from '../../../services/RegistrationService/types';
import { ErrorManager } from '../../../utils/errorManager/ErrorManager';
import { InputValidator } from '../../../utils/inputValidator/InputValidator';
import { LocalStorageManager } from '../../../utils/localStorageManager/LocalStorageManager';
import { Registration } from '../../../views/pages/registration/Registration';
import { IController } from '../PageController.interface';

export class RegistrationController implements IController {
    private delay: number = 5000;

    private page: Registration;

    private router: Router | null;

    constructor(router: Router | null) {
        this.router = router;
        this.page = new Registration();
        this.setupFormHandler();
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.onClickToLogin();
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }

    private async redirectToLogin(): Promise<void> {
        await this.router?.navigate(RoutePath.LOGIN);
    }

    private onClickToLogin(): void {
        const btnLogin = this.page.getButtonLogin();
        if (btnLogin) btnLogin.getElement().addEventListener('click', this.redirectToLogin);
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
            this.showError(emailError, formElements.inputMail.getElement());
        }
        if ('name' in errors) {
            const nameError = new ErrorManager(errors.name);
            this.showError(nameError, formElements.inputName.getElement());
        }
        if ('surname' in errors) {
            const surnameError = new ErrorManager(errors.surname);
            this.showError(surnameError, formElements.inputSurname.getElement());
        }
        if ('password' in errors) {
            const passwordError = new ErrorManager(errors.password);
            this.showError(passwordError, formElements.inputPassword.getElement());
        }
    }

    private async submitForm(customer: ICustomer): Promise<void> {
        const token = LocalStorageManager.getToken();
        if (token) {
            const customerResponse = await RegistrationService.registration(token, customer);
            const { firstName } = customerResponse.customer;
            const { id } = customerResponse.customer;
            LocalStorageManager.saveUserData({ firstName, id });
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

    private async validateForm(): Promise<void> {
        const formElements = this.page.getForm().getFormElements();
        if (!formElements) {
            return;
        }

        const errors: Record<string, string> = {};

        const firstName = formElements.inputName.getValue();
        const lastName = formElements.inputSurname.getValue();
        const email = formElements.inputMail.getValue();
        const password = formElements.inputPassword.getValue();

        if (!InputValidator.isValidName(firstName)) {
            errors.name = 'Invalid name, example: "John" or "John Doe"';
        }

        if (!InputValidator.isValidSurname(lastName)) {
            errors.surname = 'Invalid surname, example: "Smith" or "van der Waals"';
        }

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
                    firstName,
                    lastName,
                    password,
                });
                if (this.router) await this.router.navigate(RoutePath.MAIN);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        }
    }
}
