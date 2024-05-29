import { View } from '../../View';
import { FullInfoProduct } from '../../fullInfoProduct/FullInfoProduct';

export class Main extends View {
    constructor() {
        super({ tag: 'section', classNames: ['content'] });
        this.setupProductInfo();
    }

    private setupProductInfo(): void {
        const infoProduct = new FullInfoProduct(
            'Apple MacBook Pro 14" (2023), Apple M2 Max 12 Core/30-core GPU/32GB/1TB SSD/Space Gray, Space Gray (MPHG3)',
            'https://pitergsm.ru/upload/iblock/32f/jxv26m6rxnio8qzuhubxokr0brfxuyar.png',
            'This laptop features a 14-inch display with a resolution of 3024 × 1964 pixels, providing an exceptionally clear image that is perfect for professional designers and video editors. It is equipped with 32 GB of RAM, making it extremely powerful for multitasking and processing large volumes of data. With 12 processor cores, this computer is capable of handling the most complex tasks and software. The laptop weighs just 1630 grams, making it surprisingly light and portable for such impressive specifications.'
        ).getElement();
        this.viewHtmlElement.addInnerElement(infoProduct);
    }
}
