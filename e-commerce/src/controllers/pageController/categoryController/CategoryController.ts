import { Category } from '../../../views/pages/category/Category';
import { IController } from '../PageController.interface';

export class CategoryController implements IController {
    private page: Category;

    constructor() {
        this.page = new Category();
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }
}
