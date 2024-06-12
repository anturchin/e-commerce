import { View } from '../../../View';
import { Container } from '../../../div/Container';
import { TitlePrice } from './titlePrice/TitlePrice';
import { FullPrice } from './price/Price';
import { Promocode } from './promocode/Promocode';
import { PromocodeElemType } from './types';
import { BtnPrice } from './btnPrice/BtnPrice';
import './PriceContainer.scss';

export class PriceContainer extends View {
    private promo: Promocode | null = null;

    private fullPrice: FullPrice | null = null;

    constructor(fullPrice: string) {
        super({ tag: 'div', classNames: ['container-price'] });
        this.setupContainer(fullPrice);
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

    private setupContainer(fullPrice: string): void {
        const title = new TitlePrice().getElement();

        this.fullPrice = new FullPrice(fullPrice);
        const price = this.fullPrice.getElement();

        const div = new Container().getElement();
        div.append(title, price);
        this.viewHtmlElement.addInnerElement(div);

        this.promo = new Promocode({
            type: 'text',
            label: 'Promocode',
            required: false,
        });

        this.viewHtmlElement.addInnerElement(this.promo.getElement());

        const btn = new BtnPrice().getElement();
        this.viewHtmlElement.addInnerElement(btn);
    }
}
