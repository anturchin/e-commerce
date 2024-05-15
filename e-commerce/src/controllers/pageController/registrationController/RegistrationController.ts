import { Registration } from '../../../views/pages/registration/Registration';
import { IController } from '../PageController.interface';

export class RegistrationController implements IController {
    private page: Registration;

    constructor() {
        this.page = new Registration();
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }
}
