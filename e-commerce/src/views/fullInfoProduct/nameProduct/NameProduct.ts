import { View } from '../../View';
import './NameProduct.scss';

export class NameProduct extends View {
    constructor(nameProduct: string) {
        super({ tag: 'h4', classNames: ['product__title'], textContent: nameProduct });
    }
}
