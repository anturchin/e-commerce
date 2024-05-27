import { ProductType } from '../../../router/types';
import { ProductDetail } from '../../../views/pages/products/ProductDetail';
import { IController } from '../PageController.interface';

export class ProductDetailController implements IController {
    private page: ProductDetail;

    private productType: ProductType;

    private productId: string;

    constructor(productType: ProductType, productId: string) {
        this.page = new ProductDetail();
        this.productType = productType;
        this.productId = productId;
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }
}
