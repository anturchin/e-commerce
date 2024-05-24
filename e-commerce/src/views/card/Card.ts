import { View } from '../View';
import { ImgCard } from './imgCard/ImgCard';
import { TitleCard } from './titleCard/TitleCard';
import { DescriptCard } from './descriptCard/DescriptCard';
import './Card.scss';

export class Card extends View {
    constructor() {
        super({ tag: 'div', classNames: ['product__card'] });
        this.setupCard();
    }

    private setupCard(): void {
        const img = new ImgCard().getElement();
        this.viewHtmlElement.addInnerElement(img);
        const title = new TitleCard().getElement();
        this.viewHtmlElement.addInnerElement(title);
        const description = new DescriptCard().getElement();
        this.viewHtmlElement.addInnerElement(description);
    }
}
