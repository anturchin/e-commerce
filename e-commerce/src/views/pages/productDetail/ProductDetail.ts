import { View } from '../../View';
import { FullInfoProduct } from '../../fullInfoProduct/FullInfoProduct';

export interface IFullInfoProduct {
    name: string;
    img: string[];
    description: string;
    price: string;
    sale: string;
}

const fullInfo: IFullInfoProduct[] = [
    {
        name: 'Apple MacBook Pro 14" (2023), Apple M2 Max 12 Core/30-core GPU/32GB/1TB SSD/Space Gray, Space Gray (MPHG3)',
        img: [
            'https://pitergsm.ru/upload/iblock/32f/jxv26m6rxnio8qzuhubxokr0brfxuyar.png',
            'https://pitergsm.ru/upload/iblock/827/827d130979a21ed75343f71baef30066.jpg',
            'https://pitergsm.ru/upload/iblock/0d8/0d832faa4502f28fdf477bc77b5fe73e.jpg',
        ],
        description:
            'This laptop features a 14-inch display with a resolution of 3024 × 1964 pixels, providing an exceptionally clear image that is perfect for professional designers and video editors. It is equipped with 32 GB of RAM, making it extremely powerful for multitasking and processing large volumes of data. With 12 processor cores, this computer is capable of handling the most complex tasks and software. The laptop weighs just 1630 grams, making it surprisingly light and portable for such impressive specifications.',
        price: '$3000.00',
        sale: '$2500.00',
    },
];

export class ProductDetail extends View {
    constructor(props: IFullInfoProduct[] = fullInfo) {
        super({ tag: 'section', classNames: ['content'] });
        props.forEach((product) => {
            const productView = new FullInfoProduct(
                product.name,
                product.img,
                product.description,
                product.price,
                product.sale
            );
            this.viewHtmlElement.addInnerElement(productView.getElement());
        });
    }
}
