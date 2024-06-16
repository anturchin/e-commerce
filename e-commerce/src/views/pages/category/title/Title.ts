import { View } from '../../../View';
import './Title.scss';

export class TitleCategory extends View {
    constructor() {
        super({
            tag: 'H1',
            classNames: ['title-category'],
            textContent: 'Explore Our Product Categories',
        });
    }
}
