import { View } from '../../../View';
import './Container.scss';

export class ContainerUser extends View {
    constructor() {
        super({ tag: 'div', classNames: ['container-user'] });
    }
}
