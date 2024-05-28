import { View } from '../View';
import './Filter.scss';

export class Filter extends View {
    constructor() {
        super({ tag: 'div', classNames: ['filer__content'] });
    }
}
