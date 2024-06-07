import { View } from '../../../../View';
import './TitleRSS.scss';

export class TitleRSS extends View {
    constructor() {
        super({ tag: 'h2', classNames: ['title-RSS'], textContent: 'The Rolling Scopes School' });
    }
}
