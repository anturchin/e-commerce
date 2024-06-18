import { View } from '../../View';
import './Title.scss';

export class TitleLoad extends View {
    constructor() {
        super({ tag: 'p', classNames: ['title-load'], textContent: 'Loading...' });
    }
}
