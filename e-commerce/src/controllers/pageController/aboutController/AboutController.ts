import { About } from '../../../views/pages/about/About';
import { IController } from '../PageController.interface';

export class AboutController implements IController {
    private page: About;

    constructor() {
        this.page = new About();
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }
}
