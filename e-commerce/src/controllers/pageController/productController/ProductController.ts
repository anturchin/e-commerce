import { ProductType } from '../../../router/types';
import { Products } from '../../../views/pages/products/Products';
import { IController } from '../PageController.interface';
import { ICards } from './types';
import { LocalStorageManager } from '../../../utils/localStorageManager/LocalStorageManager';
import { CategoryService } from '../../../services/CategoryService/CategoryService';
import { FilterService } from '../../../services/FilteringService/FilterService';
import { IProduct } from '../../../services/FilteringService/types';
import { CartUpdateService } from '../../../services/CartUpdateService/CartUpdateService';
import { CartService } from '../../../services/CartService/CartService';
import { SvgBag } from '../../../views/header/imgBag/ImgBag';

const productTypes: string[] = ['phone', 'laptop', 'watch', 'tablet'];

export class ProductController implements IController {
    private page: Products = new Products();

    private imgView: SvgBag = new SvgBag();

    private readonly productType: ProductType;

    private productIndex: number;

    private products: IProduct[] = [];

    private cart: string[] = [];

    constructor(productType: ProductType) {
        this.loadData();
        this.productType = productType;
        this.productIndex = productTypes.findIndex((e) => e === (this.productType as string));
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }

    private async loadData(): Promise<void> {
        const token = LocalStorageManager.getToken();
        if (token) {
            const categories = await CategoryService.getCategoryList(token);
            if ('results' in categories) {
                const categoryParam = `masterData(current(categories(id="${categories.results[this.productIndex].id}")))`;
                const resp = await FilterService.getFilteredList(token, categoryParam);
                if ('results' in resp) {
                    this.products = resp.results;
                    const props: ICards[] = this.getProps();
                    this.page.renderProductList(props);
                    this.disableDuplicateButtons();
                    this.eventHandler();
                }
            }
        }
    }

    private getProps(): ICards[] {
        return this.products.map((product) => {
            const price =
                `${product.masterData.current.masterVariant.prices[0]?.value.centAmount ?? '000'}`.slice(
                    0,
                    -2
                );
            return {
                url: product.masterData.current.masterVariant.images[0]?.url || '',
                name: product.masterData.current.name.ru,
                description: product.masterData.current.metaDescription.ru,
                price: `${price}$`,
                sale: `${Math.round(Number(price) * 0.8)}$`,
                id: product.id,
            };
        });
    }

    private eventHandler(): void {
        const productListElement = this.page.getWrapperList()?.getElement();

        if (!productListElement) {
            console.error('Category list element not found!');
            return;
        }

        productListElement.addEventListener('click', this.onClickHandler.bind(this));
    }

    private onClickHandler(event: Event) {
        const item = (event.target as HTMLElement).closest('.product__card') as HTMLElement;
        if (!item) return;
        const dataAttribute = item.getAttribute('id');
        if (dataAttribute) {
            if ((event.target as HTMLElement).tagName === 'BUTTON') {
                const button = event.target as HTMLButtonElement;
                button.disabled = true;
                this.buttonClickHandler(dataAttribute);
            } else {
                this.openDetailedPage(dataAttribute);
            }
        }
    }

    private openDetailedPage(id: string) {
        // TODO: develop detailed page
        console.log('detailed page for:', id);
    }

    private async buttonClickHandler(id: string) {
        this.cart.push(id);
        const localCartJson = LocalStorageManager.getProduct();
        let localCart: string[] = [];
        if (localCartJson) {
            localCart = JSON.parse(localCartJson);
        }
        localCart.push(id);
        LocalStorageManager.saveProduct(JSON.stringify(localCart));
        this.imgView.updateNumber();
        const token = LocalStorageManager.getToken();
        if (token) {
            const cartId = LocalStorageManager.getCartId();
            if (cartId) {
                const cartInfo = await CartService.getCart(token);
                if ('results' in cartInfo) {
                    const cart = cartInfo.results.find((cart) => cart.id === cartId);
                    if (cart) {
                        const { version } = cart;
                        await CartUpdateService.updateCart(
                            token,
                            cartId,
                            version,
                            'addLineItem',
                            id,
                            1
                        );
                    }
                }
            }
        }
    }

    private disableDuplicateButtons(): void {
        const localCartJson = LocalStorageManager.getProduct();
        if (localCartJson) {
            const cartToDisable = JSON.parse(localCartJson);
            cartToDisable.forEach((cart: string) => {
                const elem = document.getElementById(cart) as HTMLElement;
                if (elem) {
                    const btn = elem.getElementsByClassName(
                        'custom-button'
                    )[0] as HTMLButtonElement;
                    if (btn) {
                        btn.disabled = true;
                    }
                }
            });
        }
    }
}
