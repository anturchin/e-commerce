import { View } from '../View';
import './Container.scss';

export class Container extends View {
    constructor() {
        super({ tag: 'div', classNames: ['container', 'conteinerInfo'] });
    }
}
