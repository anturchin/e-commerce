import { ProductType } from '../../../router/types';
import { Products } from '../../../views/pages/products/Products';
import { IController } from '../PageController.interface';

export class ProductController implements IController {
    private page: Products;

    private productType: ProductType;

    constructor(productType: ProductType) {
        this.page = new Products();
        this.productType = productType;
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }
}
