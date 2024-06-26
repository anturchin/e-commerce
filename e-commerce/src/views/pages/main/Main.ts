import { View } from '../../View';
import { SlidesShow } from '../../slidesShow/SlidesShow';
import { Promo } from './promo/Promo';
import './Main.scss';

export class Main extends View {
    constructor() {
        super({ tag: 'section', classNames: ['content-main'] });
        this.setupMain();
    }

    private setupMain() {
        const urls = [
            'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-card-40-macbook-air-m2-m3-202402?wid=1400&hei=1000&fmt=p-jpg&qlt=95&.v=1707259317253',
            'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-card-40-imac-24-202310?wid=1200&hei=1000&fmt=jpeg&qlt=95&.v=1697229623322',
            'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15hero-202309?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1693086290559',
            'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-card-40-air-202405?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1713920820139',
            'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-ultra2-202403?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1708673883590',
        ];

        const promo = new Promo().getElement();
        this.viewHtmlElement.addInnerElement(promo);

        const slidesShow = new SlidesShow(urls);
        this.viewHtmlElement.addInnerElement(slidesShow.getElement());
    }
}
