import { Publisher } from '../../../observers/Publisher';
import { Router } from '../../../router/Router';
import { RoutePath } from '../../../router/types';
import { RegistrationService } from '../../../services/RegistrationService/RegistrationService';
import { ICustomer } from '../../../services/RegistrationService/types';
import { SetAddressService } from '../../../services/SetAddressService/SetAddressService';
import { SetDefaultAddressService } from '../../../services/SetDefaultAddressService/SetDefaultAddressService';
import { IAddress, ICustomerResponse } from '../../../services/types';
import { ErrorManager } from '../../../utils/errorManager/ErrorManager';
import { InputValidator } from '../../../utils/inputValidator/InputValidator';
import { LocalStorageManager } from '../../../utils/localStorageManager/LocalStorageManager';
import { Registration } from '../../../views/pages/registration/Registration';
import { IController } from '../PageController.interface';

export class RegistrationController implements IController {
    private delay: number = 5000;

    private page: Registration;

    private router: Router | null;

    private authPublisher: Publisher<boolean>;

    constructor(router: Router | null, authPublisher: Publisher<boolean>) {
        this.router = router;
        this.authPublisher = authPublisher;
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
        const formElementsAddress = this.page.getFormAddress().getFormElements();
        if (!formElements || !formElementsAddress) {
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
        if ('country' in errors) {
            const passwordError = new ErrorManager(errors.country);
            this.showError(passwordError, formElementsAddress.inputCountry.getElement());
        }
        if ('city' in errors) {
            const passwordError = new ErrorManager(errors.city);
            this.showError(passwordError, formElementsAddress.inputCity.getElement());
        }
        if ('addressType' in errors) {
            const passwordError = new ErrorManager(errors.addressType);
            this.showError(passwordError, formElementsAddress.inputAddressType.getElement());
        }
        if ('street' in errors) {
            const passwordError = new ErrorManager(errors.street);
            this.showError(passwordError, formElementsAddress.inputStreet.getElement());
        }
        if ('house' in errors) {
            const passwordError = new ErrorManager(errors.house);
            this.showError(passwordError, formElementsAddress.inputHouse.getElement());
        }
        if ('postalCode' in errors) {
            const passwordError = new ErrorManager(errors.postalCode);
            this.showError(passwordError, formElementsAddress.inputPostal.getElement());
        }
    }

    private async updateCustomerById(
        inputCountry: string,
        inputCity: string,
        inputAddressType: string,
        inputStreet: string,
        inputHouse: string,
        inputPostal: string,
        customerResponse: ICustomerResponse,
        token: string
    ): Promise<void> {
        const address: IAddress = {
            streetName: inputStreet,
            streetNumber: inputHouse,
            postalCode: inputPostal,
            city: inputCity,
            country: inputCountry,
        };

        const { id } = customerResponse.customer;
        const { version } = customerResponse.customer;

        const addressResponse = await SetAddressService.addAddress(token, id, version, address);

        if ('addresses' in addressResponse) {
            const setDefaultAddress = await SetDefaultAddressService.setDefaultAddress(
                inputAddressType,
                token,
                id,
                addressResponse.version,
                addressResponse.addresses[0]
            );
            if ('msg' in setDefaultAddress) {
                const errorAuth = this.page.getErrorAuth();
                errorAuth.showMessage(setDefaultAddress.msg, setDefaultAddress.statusCode);
            }
        }

        if ('msg' in addressResponse) {
            const errorAuth = this.page.getErrorAuth();
            errorAuth.showMessage(addressResponse.msg, addressResponse.statusCode);
        }
    }

    private async submitForm(customer: ICustomer): Promise<void> {
        const token = LocalStorageManager.getToken();
        if (token) {
            const customerResponse = await RegistrationService.registration(token, customer);
            if ('customer' in customerResponse) {
                const { firstName } = customerResponse.customer;
                const { id } = customerResponse.customer;
                LocalStorageManager.saveUserData({ firstName, id });
                this.authPublisher.notifyObservers(true);
                const formElementsAddress = this.page.getFormAddress().getFormElements();
                if (formElementsAddress) {
                    const inputCountry = formElementsAddress.inputCountry.getValue();
                    const inputCity = formElementsAddress.inputCity.getValue();
                    const inputAddressType = formElementsAddress.inputAddressType.getValue();
                    const inputStreet = formElementsAddress.inputStreet.getValue();
                    const inputHouse = formElementsAddress.inputHouse.getValue();
                    const inputPostal = formElementsAddress.inputPostal.getValue();

                    if (
                        inputCountry &&
                        inputCity &&
                        inputAddressType &&
                        inputStreet &&
                        inputHouse &&
                        inputPostal
                    ) {
                        await this.updateCustomerById(
                            inputCountry,
                            inputCity,
                            inputAddressType,
                            inputStreet,
                            inputHouse,
                            inputPostal,
                            customerResponse,
                            token
                        );
                    }
                }

                if (this.router) await this.router.navigate(RoutePath.MAIN);
                return;
            }
            if ('msg' in customerResponse) {
                const errorAuth = this.page.getErrorAuth();
                errorAuth.showMessage(customerResponse.msg, customerResponse.statusCode);
            }
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

        const errorsFormAndAddress = {
            ...errors,
            ...this.validateFormAddress(),
        };

        if (Object.keys(errorsFormAndAddress).length > 0) {
            this.showErrors(errorsFormAndAddress);
        } else {
            try {
                await this.submitForm({
                    email,
                    firstName,
                    lastName,
                    password,
                });
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        }
    }

    private validateFormAddress(): Record<string, string> {
        const errors: Record<string, string> = {};

        const formElements = this.page.getFormAddress().getFormElements();
        if (!formElements) {
            return errors;
        }

        const inputCountry = formElements.inputCountry.getValue();
        const inputCity = formElements.inputCity.getValue();
        const inputAddressType = formElements.inputAddressType.getValue();
        const inputStreet = formElements.inputStreet.getValue();
        const inputHouse = formElements.inputHouse.getValue();
        const inputPostal = formElements.inputPostal.getValue();

        if (
            inputCountry ||
            inputCity ||
            inputAddressType ||
            inputStreet ||
            inputHouse ||
            inputPostal
        ) {
            if (!InputValidator.isValidCountry(inputCountry)) {
                errors.country = 'Invalid country, example: "USA" or "Russia"';
            }
            if (!InputValidator.isValidCity(inputCity)) {
                errors.city = 'Invalid city, example: "USA" or "Russia"';
            }
            if (!InputValidator.isValidAddressType(inputAddressType)) {
                errors.addressType = 'Invalid address type, example: "Shipping" or "Billing"';
            }
            if (!InputValidator.isValidStreet(inputStreet)) {
                errors.street = 'Invalid street, example: "123 Main St"';
            }
            if (!InputValidator.isValidHouse(inputHouse)) {
                errors.house = 'Invalid house, example: "123, 123A, 123/4, 123A/4B"';
            }
            if (!InputValidator.isValidPostalCode(inputCountry, inputPostal)) {
                errors.postalCode = 'Invalid postal code, example: "12345, 12345-6789, 101000"';
            }
        }
        return errors;
    }
}
