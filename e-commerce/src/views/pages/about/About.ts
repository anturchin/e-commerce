import { View } from '../../View';
import './About.scss';

export class About extends View {
    constructor() {
        super({ tag: 'section', classNames: ['content', 'about'] });
    }
}
