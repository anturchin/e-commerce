import { Bag } from '../../../views/pages/bag/Bag';
import { IController } from '../PageController.interface';
import { LocalStorageManager } from '../../../utils/localStorageManager/LocalStorageManager';
import { CartService } from '../../../services/CartService/CartService';
import { ProductListService } from '../../../services/ProductListService/ProductListService';
import { IProduct, IProductResponse } from '../../../services/ProductListService/types';
import { IResponseFailed } from '../../../services/types';
import { IBagCards } from './types';

export class BagController implements IController {
    private page: Bag = new Bag();

    private products: Awaited<IProductResponse | IResponseFailed | IProduct>[] = [];

    constructor() {
        this.loadData();
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }

    private async loadData(): Promise<void> {
        const token = await LocalStorageManager.getToken();
        if (token) {
            const cartId = LocalStorageManager.getCartId();
            if (cartId) {
                const carts = await CartService.getCart(token, cartId);
                if ('lineItems' in carts) {
                    const productPromises = carts.lineItems.map((item) => {
                        return ProductListService.getProductList(token, item.productId);
                    });
                    this.products = await Promise.all(productPromises);
                    const props: IBagCards[] = this.getProps();
                    this.page.renderProductBagList(props);
                }
            }
        }
    }

    private getProps(): IBagCards[] {
        return this.products.map((product) => {
            if ('masterData' in product) {
                const urlResp = product.masterData?.current.masterVariant.images[0].url;
                const url = urlResp !== undefined ? urlResp : '';
                const pric = product.masterData.current.masterVariant.prices[0].value.centAmount;
                const price = pric !== undefined ? `${pric / 100}` : '0';
                return {
                    url,
                    name: 'masterData' in product ? product.masterData.current.name.ru : '',
                    price: `${price}$`,
                    sale: '',
                };
            }
            return {
                url: '',
                name: '',
                price: '',
                sale: '',
            };
        });
    }
}
