import { Bag } from '../../../views/pages/bag/Bag';
import { IController } from '../PageController.interface';

export class BagController implements IController {
    private page: Bag;

    constructor() {
        this.page = new Bag();
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }
}
