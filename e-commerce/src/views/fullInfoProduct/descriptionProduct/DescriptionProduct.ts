import { View } from '../../View';
import './DescriptionProduct.scss';

export class DescriptionProduct extends View {
    constructor(productDescription: string) {
        super({
            tag: 'p',
            classNames: ['product__description'],
            textContent: productDescription,
        });
    }
}
