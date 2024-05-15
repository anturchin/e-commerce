import { NotFound } from '../../../views/pages/404/NotFound';
import { IController } from '../PageController.interface';

export class NotFoundController implements IController {
    private page: NotFound;

    constructor() {
        this.page = new NotFound();
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }
}
