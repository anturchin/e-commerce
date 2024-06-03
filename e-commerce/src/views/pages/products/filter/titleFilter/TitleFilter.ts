import { View } from '../../../../View';
import './TitleFilter.scss';

export class TitleFilter extends View {
    constructor() {
        super({ tag: 'H3', classNames: ['title'], textContent: 'Filters' });
    }
}
