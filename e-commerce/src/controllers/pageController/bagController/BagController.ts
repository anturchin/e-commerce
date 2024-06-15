import { Bag } from '../../../views/pages/bag/Bag';
import { IController } from '../PageController.interface';
import { LocalStorageManager } from '../../../utils/localStorageManager/LocalStorageManager';
import { CartService } from '../../../services/CartService/CartService';
import { ProductListService } from '../../../services/ProductListService/ProductListService';
import { IProduct, IProductResponse } from '../../../services/ProductListService/types';
import { IResponseFailed } from '../../../services/types';
import { IBagCards } from './types';
import { CartUpdateService } from '../../../services/CartUpdateService/CartUpdateService';
import { Router } from '../../../router/Router';
import { CartDeleteService } from '../../../services/CartDeleteService/CartDeleteService';
import { CartCreateService } from '../../../services/CartCreateService/CartCreateService';

export class BagController implements IController {
    private page: Bag;

    private router: Router | null;

    private products: Awaited<IProductResponse | IResponseFailed | IProduct>[] = [];

    private totalPrice: number = 0;

    constructor(router: Router | null) {
        this.router = router;
        this.page = new Bag(this.router);
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
                    const productsFromStore = await Promise.all(productPromises);
                    this.products.push(...productsFromStore);
                    const props: IBagCards[] = this.getProps();
                    this.page.renderProductBagList(props);
                    this.eventHandler();
                    this.updatePrice();
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
                    id: product.id,
                };
            }
            return {
                url: '',
                name: '',
                price: '',
                sale: '',
                id: '',
            };
        });
    }

    private eventHandler(): void {
        const wrapperList = this.page.getWrapperList()?.getElement();

        if (!wrapperList) {
            console.error('Producrs list element not found!');
            return;
        }

        wrapperList.addEventListener('click', this.clickHandler.bind(this));

        const emptyCart = document.getElementsByClassName(
            'custom-button-delete'
        )[0] as HTMLButtonElement;
        if (emptyCart) {
            emptyCart.addEventListener('click', this.makeEmptyHandler.bind(this));
        }
    }

    private clickHandler(event: Event): void {
        const item = event.target as HTMLElement;
        const parent = item.closest('.cardbag');
        const itemId = parent?.getAttribute('id');
        if (itemId) {
            if (item.classList.contains('quantity-btn')) {
                if (item.id === 'quantity-btn-minus') {
                    this.changeQuantity(itemId, 'minus');
                }
                if (item.id === 'quantity-btn-plus') {
                    this.changeQuantity(itemId, 'plus');
                }
            }
            if (item.classList.contains('btn-delete')) {
                this.changeQuantity(itemId, 'delete');
            }
        }
    }

    private async changeQuantity(id: string, act: 'minus' | 'plus' | 'delete'): Promise<void> {
        const token = LocalStorageManager.getToken();
        if (token) {
            const cart = LocalStorageManager.getCartId();
            if (cart) {
                const respCart = await CartService.getCart(token, cart);
                if ('lineItems' in respCart) {
                    const product = respCart.lineItems.find((elem) => elem.productId === id);
                    if (product) {
                        let { quantity } = product;
                        if (act === 'minus') {
                            quantity -= 1;
                        }
                        if (act === 'plus') {
                            quantity += 1;
                        }
                        if (act === 'delete') {
                            quantity = 0;
                        }
                        const { version } = respCart;
                        const action = {
                            action: 'changeLineItemQuantity',
                            lineItemId: product.id,
                            quantity,
                        };
                        await CartUpdateService.updateCart(token, cart, version, action);
                        const cartResp = await CartService.getCart(token, cart);
                        if ('lineItems' in cartResp) {
                            LocalStorageManager.removeProduct();
                            const productsToSave: string[] = [];
                            cartResp.lineItems.forEach((product) => {
                                productsToSave.push(product.productId);
                            });
                            LocalStorageManager.saveProduct(JSON.stringify(productsToSave));
                            const productPromises = cartResp.lineItems.map((item) => {
                                return ProductListService.getProductList(token, item.productId);
                            });
                            const productsFromStore = await Promise.all(productPromises);
                            this.products = [];
                            this.products.push(...productsFromStore);
                        }
                        this.updatePrice();
                        const wrapperList = this.page.getWrapperList();
                        if (wrapperList) {
                            wrapperList.getElement().innerHTML = '';
                        }
                        const props = this.getProps();
                        this.page.renderProductBagList(props);
                    }
                }
            }
        }
    }

    private async updatePrice(): Promise<void> {
        const token = await LocalStorageManager.getToken();
        if (token) {
            const cartId = LocalStorageManager.getCartId();
            if (cartId) {
                const carts = await CartService.getCart(token, cartId);
                if ('totalPrice' in carts) {
                    this.totalPrice = Math.floor(carts.totalPrice.centAmount / 100);
                    this.page.updatePrice(`${this.totalPrice}$`);
                }
            }
        }
    }

    private async makeEmptyHandler(): Promise<void> {
        const token = LocalStorageManager.getToken();
        if (token) {
            console.log('1if');
            const cartId = LocalStorageManager.getCartId();
            if (cartId) {
                console.log('2if');
                LocalStorageManager.removeCart();
                LocalStorageManager.removeProduct();
                const cart = await CartService.getCart(token, cartId);
                if ('version' in cart) {
                    console.log('3if');
                    const { version } = cart;
                    await CartDeleteService.deleteCart(token, cartId, version);
                }
                const cartCreate = await CartCreateService.createCart(token);
                if ('id' in cartCreate) {
                    console.log('4if');
                    LocalStorageManager.saveCartId(cartCreate.id);
                }
                // TODO: show empty page
            }
        }
    }
}
