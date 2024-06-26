import { View } from '../../View';
import './Container.scss';

export class ContainerColumn extends View {
    constructor() {
        super({ tag: 'div', classNames: ['conteinerInfo'] });
    }
}
