import { View } from '../../../../View';
import './Container.scss';

export class ContainerRSS extends View {
    constructor() {
        super({ tag: 'div', classNames: ['container-rss'] });
    }
}
