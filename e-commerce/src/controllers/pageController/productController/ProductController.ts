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
import { DiscountService } from '../../../services/DiscountService/DiscountService';
import { ICartAction } from '../../../services/CartService/types';

const productTypes: string[] = ['phone', 'laptop', 'watch', 'tablet'];

export class ProductController implements IController {
    private page: Products = new Products();

    private imgView: SvgBag = new SvgBag();

    private readonly productType: ProductType;

    private productIndex: number;

    private products: IProduct[] = [];

    private discount: number = 0;

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
            const discounts = await DiscountService.getDiscounts(token);
            if ('results' in discounts) {
                const [firstDiscount] = discounts.results;
                this.discount = 1 - firstDiscount.value.permyriad / 10000;
            }
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
            const prices = product.masterData.current.masterVariant.prices[0]?.value.centAmount;
            const price = prices !== undefined ? prices / 100 : 0;
            if (this.discount !== 0) {
                return {
                    url: product.masterData.current.masterVariant.images[0]?.url || '',
                    name: product.masterData.current.name.ru,
                    description: product.masterData.current.metaDescription.ru,
                    price: `${price}$`,
                    sale: `${Math.round(price * this.discount)}$`,
                    id: product.id,
                };
            }
            return {
                url: product.masterData.current.masterVariant.images[0]?.url || '',
                name: product.masterData.current.name.ru,
                description: product.masterData.current.metaDescription.ru,
                price: `${price}$`,
                sale: `${Math.round(Number(price) * 0.05)}$`,
                id: product.id,
            };
        });
    }

    private eventHandler(): void {
        const productListElement = this.page?.getWrapperList()?.getElement();

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
                const [addBtn, removeBtn] = this.getBtns(dataAttribute);
                if ((event.target as HTMLButtonElement) === addBtn) {
                    this.page.showLoader();
                    setTimeout(() => {
                        this.buttonClickHandler(dataAttribute, 'add');
                        this.page.hideLoader();
                    }, 1000);
                }
                if ((event.target as HTMLButtonElement) === removeBtn) {
                    this.page.showLoader();
                    setTimeout(() => {
                        this.buttonClickHandler(dataAttribute, 'remove');
                        this.page.hideLoader();
                    }, 1000);
                }
            } else {
                this.openDetailedPage(dataAttribute);
            }
        }
    }

    private openDetailedPage(id: string) {
        // TODO: develop detailed page
        console.log('detailed page for:', id);
    }

    private async buttonClickHandler(id: string, action: 'add' | 'remove') {
        const [addBtn, removeBtn] = this.getBtns(id);
        const localCartJson = LocalStorageManager.getProduct();
        let localCart: string[] = [];
        if (localCartJson) {
            localCart = JSON.parse(localCartJson);
        }
        let quantity = 1;
        let respAction: ICartAction = {
            action: 'addLineItem',
            productId: id,
            quantity,
        };
        if (action === 'add') {
            this.cart.push(id);
            localCart.push(id);
            addBtn.disabled = true;
            removeBtn.disabled = false;
        }
        if (action === 'remove') {
            const index = this.cart.indexOf(id);
            this.cart.splice(index, 1);
            localCart.splice(index, 1);
            quantity = 0;
            addBtn.disabled = false;
            removeBtn.disabled = true;
            respAction = {
                action: 'changeLineItemQuantity',
                lineItemId: id,
                quantity,
            };
        }
        LocalStorageManager.saveProduct(JSON.stringify(localCart));
        this.imgView.updateNumber();
        const token = LocalStorageManager.getToken();
        if (token) {
            const cartId = LocalStorageManager.getCartId();
            if (cartId) {
                const cart = await CartService.getCart(token, cartId);
                if ('version' in cart) {
                    const { version } = cart;
                    if (action === 'remove') {
                        const productId = cart.lineItems.find((item) => item.productId === id);
                        if (productId) {
                            respAction = {
                                action: 'changeLineItemQuantity',
                                lineItemId: productId.id,
                                quantity,
                            };
                        }
                    }
                    await CartUpdateService.updateCart(token, cartId, version, respAction);
                }
            }
        }
    }

    private disableDuplicateButtons(): void {
        const localCartJson = LocalStorageManager.getProduct();
        if (localCartJson) {
            const cartToDisable = JSON.parse(localCartJson);
            cartToDisable.forEach((cart: string) => {
                const [btn, removeBtn] = this.getBtns(cart);
                if (btn && removeBtn) {
                    btn.disabled = true;
                    removeBtn.disabled = false;
                }
            });
        }
    }

    private getBtns(parentId: string): HTMLButtonElement[] {
        const parent = document.getElementById(parentId);
        const addBtn = parent?.getElementsByClassName('custom-button')[0] as HTMLButtonElement;
        const removeBtn = parent?.getElementsByClassName('custom-button')[1] as HTMLButtonElement;
        return [addBtn, removeBtn];
    }
}
