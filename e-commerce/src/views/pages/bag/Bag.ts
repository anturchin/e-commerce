import { View } from '../../View';
import './Bag.scss';

export class Bag extends View {
    constructor() {
        super({ tag: 'section', classNames: ['content', 'bag'] });
    }
}
