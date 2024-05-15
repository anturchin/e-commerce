import { Login } from '../../../views/pages/login/Login';
import { IController } from '../PageController.interface';

export class LoginController implements IController {
    private page: Login;

    constructor() {
        this.page = new Login();
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }
}
