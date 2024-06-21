import { View } from '../../../View';
import { Container } from '../../../div/Container';
import { TitlePrice } from './titlePrice/TitlePrice';
import { FullPrice } from './price/Price';
import { Promocode } from './promocode/Promocode';
import { PromocodeElemType } from './types';
import { BtnPrice } from './btnPrice/BtnPrice';
import { BtnPromocode } from './btnPromocode/BtnPromocode';
import { SalePrice } from './salePrice/SalePrice';
import './PriceContainer.scss';

export class PriceContainer extends View {
    private promo: Promocode | null = null;

    private fullPrice: FullPrice | null = null;

    private salePrice: SalePrice | null = null;

    constructor(fullPrice: string, salePrice: string) {
        super({ tag: 'div', classNames: ['container-price'] });
        this.setupContainer(fullPrice, salePrice);
    }

    public getFormElem(): PromocodeElemType | null {
        if (this.promo) {
            return {
                promo: this.promo,
            };
        }
        return null;
    }

    public updatePrice(price: string): void {
        if (this.fullPrice) {
            this.fullPrice.updatePrice(price);
        }
    }

    public updateDiscountedPrice(price: string): void {
        if (this.fullPrice) {
            const price = this.fullPrice.getElement();
            if (!price.classList.contains('change-price')) {
                price.classList.add('change-price');
            }
        }
        if (this.salePrice) {
            this.salePrice.updatePrice(price);
        }
    }

    private setupContainer(fullPrice: string, salePrice: string): void {
        const title = new TitlePrice().getElement();

        this.fullPrice = new FullPrice(fullPrice);
        const price = this.fullPrice.getElement();

        const div = new Container().getElement();
        div.append(title, price);
        this.viewHtmlElement.addInnerElement(div);

        const divPromocode = new Container().getElement();

        this.promo = new Promocode({
            type: 'text',
            label: 'Promocode',
            required: false,
        });
        const promo = this.promo.getElement();

        const btnPromo = new BtnPromocode().getElement();

        divPromocode.append(promo, btnPromo);

        this.viewHtmlElement.addInnerElement(divPromocode);

        this.salePrice = new SalePrice(salePrice);
        const sale = this.salePrice.getElement();
        this.viewHtmlElement.addInnerElement(sale);

        const btn = new BtnPrice().getElement();
        this.viewHtmlElement.addInnerElement(btn);
    }

    public hide(): void {
        this.getElement().style.display = 'none';
    }

    public show(): void {
        this.getElement().style.display = '';
    }
}
