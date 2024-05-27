import { View } from '../../View';
import { CardCategory } from './cardCategory/CardCategory';

import './Category.scss';

export class Category extends View {
    constructor() {
        super({ tag: 'section', classNames: ['category'] });
        this.setupCategory();
    }

    private setupCategory(): void {
        const categoryPhone = new CardCategory(
            'https://cdsassets.apple.com/live/7WUAS350/images/iphone/iphone-14-pro-max-colors.png',
            'Iphone'
        ).getElement();
        this.viewHtmlElement.addInnerElement(categoryPhone);

        const categoryMac = new CardCategory(
            'https://www.mechta.kz/storage/description_images/1687344318_1.jpg',
            'MacBook'
        ).getElement();
        this.viewHtmlElement.addInnerElement(categoryMac);

        const categoryIpad = new CardCategory(
            'https://www.macworld.com/wp-content/uploads/2024/05/2024-ipad-family-5.jpg?quality=50&strip=all&w=1024',
            'iPad'
        ).getElement();
        this.viewHtmlElement.addInnerElement(categoryIpad);

        const categoryWatch = new CardCategory(
            'https://www.apple.com/newsroom/images/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/article/Apple-Watch-S9-hero-230912_Full-Bleed-Image.jpg.large.jpg',
            'Watch'
        ).getElement();
        this.viewHtmlElement.addInnerElement(categoryWatch);
    }
}
