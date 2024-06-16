import { Bag } from '../../../views/pages/bag/Bag';
import { IController } from '../PageController.interface';
import { LocalStorageManager } from '../../../utils/localStorageManager/LocalStorageManager';
import { CartService } from '../../../services/CartService/CartService';
import { IBagCards } from './types';
import { CartUpdateService } from '../../../services/CartUpdateService/CartUpdateService';
import { Router } from '../../../router/Router';
import { CartDeleteService } from '../../../services/CartDeleteService/CartDeleteService';
import { CartCreateService } from '../../../services/CartCreateService/CartCreateService';
import { ILineItem } from '../../../services/CartService/types';
import { DiscountService } from '../../../services/DiscountService/DiscountService';
import { PromoService } from '../../../services/PromoService/PromoService';
import { IPromo } from '../../../services/PromoService/types';

export class BagController implements IController {
    private page: Bag;

    private router: Router | null;

    private products: ILineItem[] = [];

    private totalPrice: number = 0;

    private discount: number = 0;

    private promoCodes: string[] = []; // array for display promos

    private promos: IPromo[] = [];

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
            const discounts = await DiscountService.getDiscounts(token);
            if ('results' in discounts) {
                const [firstDiscount] = discounts.results;
                this.discount = 1 - firstDiscount.value.permyriad / 10000;
            }
            const cartId = LocalStorageManager.getCartId();
            if (cartId) {
                const carts = await CartService.getCart(token, cartId);
                if ('lineItems' in carts) {
                    const productPromises = carts.lineItems.map((item: ILineItem) => {
                        return item;
                    });
                    this.products.push(...productPromises);
                    const props: IBagCards[] = this.getProps();
                    this.page.renderProductBagList(props);
                    this.eventHandler();
                    this.updatePrice();
                    this.getPromo();
                }
            }
        }
    }

    private getProps(): IBagCards[] {
        return this.products.map((product) => {
            const urlResp = product.variant.images[0].url;
            const url = urlResp !== undefined ? urlResp : '';
            const pric = product.price.value.centAmount;
            const price = pric !== undefined ? pric / 100 : 0;
            if (this.discount !== 0) {
                return {
                    url,
                    name: product.name.ru,
                    price: `${price}$`,
                    sale: `${Math.round(price * this.discount)}$`,
                    id: product.productId,
                    quantity: product.quantity,
                };
            }
            return {
                url,
                name: product.name.ru,
                price: `${price}$`,
                sale: `${Math.round(price * 0.05)}$`,
                id: product.productId,
                quantity: product.quantity,
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

        const promoBtn = document.getElementsByClassName('custom-button')[0] as HTMLButtonElement;
        if (promoBtn) {
            promoBtn.addEventListener('click', this.checkPromo.bind(this));
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
                        if (act === 'minus' && quantity > 0) {
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
                                return item;
                            });
                            this.products = [];
                            this.products.push(...productPromises);
                        }
                        this.updatePrice();
                        if (this.products.length === 0) {
                            const wrapperList = this.page.getWrapperList();
                            if (wrapperList) {
                                wrapperList.clearBag();
                            }
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
            const cartId = LocalStorageManager.getCartId();
            if (cartId) {
                LocalStorageManager.removeCart();
                LocalStorageManager.removeProduct();
                const cart = await CartService.getCart(token, cartId);
                if ('version' in cart) {
                    const { version } = cart;
                    await CartDeleteService.deleteCart(token, cartId, version);
                }
                const cartCreate = await CartCreateService.createCart(token);
                if ('id' in cartCreate) {
                    LocalStorageManager.saveCartId(cartCreate.id);
                }
            }
        }
    }

    private async getPromo() {
        const token = LocalStorageManager.getToken();
        if (token) {
            const promos = await PromoService.getPromo(token);
            if ('results' in promos) {
                this.promos = promos.results.map((promo) => {
                    this.promoCodes.push(promo.name.ru);
                    return promo;
                });
            }
        }
    }

    private checkPromo() {
        const promoInput = document.getElementsByClassName('input-promo')[0] as HTMLInputElement;
        const promo = promoInput.value;
        if (this.promoCodes.includes(promo)) {
            this.addDiscountToCart(promo);
        } else {
            console.log(`"${promo}" promo is incorrect`);
        }
    }

    private async addDiscountToCart(discount: string) {
        // const promoToAdd = this.promos.find((item) => item.name.ru === discount);
        const token = LocalStorageManager.getToken();
        if (token) {
            const cart = LocalStorageManager.getCartId();
            if (cart) {
                const action = {
                    action: 'addDiscountCode',
                    code: discount,
                };
                const respCart = await CartService.getCart(token, cart);
                if ('version' in respCart) {
                    const { version } = respCart;
                    await CartUpdateService.updateCart(token, cart, version, action);
                    this.updatePrice();
                }
            }
        }
    }
}
