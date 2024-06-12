import { View } from '../../View';
import './ImgBag.scss';
import img from '../../../assets/image/bag-shopping-solid.svg';
import { LocalStorageManager } from '../../../utils/localStorageManager/LocalStorageManager';

export class SvgBag extends View {
    constructor() {
        super({ tag: 'div', classNames: ['nav-list__item-container'] });
        this.createImg();
    }

    private createImg(): void {
        const bagImg = document.createElement('img');
        bagImg.setAttribute('src', img);
        bagImg.setAttribute('data-nav-item', 'Bag');
        bagImg.classList.add('nav-list__item-bag');
        const number = document.createElement('h5');
        number.id = 'cart_length';
        this.viewHtmlElement.addInnerElement(bagImg);
        this.viewHtmlElement.addInnerElement(number);
        this.updateNumber();
    }

    public updateNumber(): void {
        const bag = document.getElementById('cart_length');
        const cart = LocalStorageManager.getProduct();
        if (cart && bag) {
            const cartLength = JSON.parse(cart);
            bag.textContent = String(cartLength.length);
        }
    }
}
