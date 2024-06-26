import { View } from '../../../../View';
import './Title.scss';

export class Title extends View {
    constructor() {
        super({ tag: 'h2', classNames: ['title-colab'], textContent: 'Collaboration' });
    }
}
