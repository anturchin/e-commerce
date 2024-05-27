import { View } from '../../../View';
import { ImgCategory } from './imgCategory/ImgCategory';
import { TitleCategory } from './titleCategory/TitleCategory';
import './CardCategory.scss';

export class CardCategory extends View {
    constructor(categoryImg: string, categoryTitle: string) {
        super({ tag: 'div', classNames: ['card__category'] });
        this.setupCategory(categoryImg, categoryTitle);
    }

    private setupCategory(categoryImg: string, categoryTitle: string): void {
        const img = new ImgCategory(categoryImg).getElement();
        this.viewHtmlElement.addInnerElement(img);

        const title = new TitleCategory(categoryTitle).getElement();
        this.viewHtmlElement.addInnerElement(title);
    }
}
