import { View } from '../../View';
import './ContainerForImg.scss';

export class ContainerImg extends View {
    constructor() {
        super({ tag: 'div', classNames: ['conteiner__img'] });
    }
}
