import { ErrorManager } from '../../../utils/errorManager/ErrorManager';
import { InputValidator } from '../../../utils/inputValidator/InputValidator';
import { Registration } from '../../../views/pages/registration/Registration';
import { IController } from '../PageController.interface';

export class RegistrationController implements IController {
    private delay: number = 5000;

    private page: Registration;

    constructor() {
        this.page = new Registration();
        this.setupFormHandler();
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }

    private setupFormHandler(): void {
        const form = this.page.getForm();
        if (form) {
            form.getElement().addEventListener('submit', (event) => {
                event.preventDefault();
                this.validateForm();
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

    private submitForm(): void {
        console.log('Form submitted successfully');
    }

    private enableBtn(switchOn: boolean): void {
        const formElements = this.page.getForm().getFormElements();
        if (!formElements) {
            return;
        }
        const btn = formElements.buttonSubmit.getElement() as HTMLButtonElement;
        btn.disabled = switchOn;
    }

    private validateForm(): void {
        const formElements = this.page.getForm().getFormElements();
        if (!formElements) {
            return;
        }

        const errors: Record<string, string> = {};

        const nameValue = formElements.inputName.getValue();
        const surnameValue = formElements.inputSurname.getValue();
        const mailValue = formElements.inputMail.getValue();
        const passwordValue = formElements.inputPassword.getValue();

        console.log(nameValue);
        console.log(surnameValue);
        console.log(mailValue);
        console.log(passwordValue);

        if (!InputValidator.isValidName(nameValue)) {
            errors.name = 'Invalid name, example: "John" or "John Doe"';
        }

        if (!InputValidator.isValidSurname(surnameValue)) {
            errors.surname = 'Invalid surname, example: "Smith" or "van der Waals"';
        }

        if (!InputValidator.isValidEmail(mailValue)) {
            errors.email = 'Invalid email, example: "user@example"';
        }

        if (!InputValidator.isValidPassword(passwordValue)) {
            errors.password = 'Invalid password, example: "Password1!"';
        }

        if (Object.keys(errors).length > 0) {
            this.showErrors(errors);
            console.log(errors);
        } else {
            this.submitForm();
        }
    }
}
