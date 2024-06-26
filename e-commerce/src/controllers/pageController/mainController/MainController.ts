import { Main } from '../../../views/pages/main/Main';
import { IController } from '../PageController.interface';

export class MainController implements IController {
    private page: Main;

    constructor() {
        this.page = new Main();
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }
}
