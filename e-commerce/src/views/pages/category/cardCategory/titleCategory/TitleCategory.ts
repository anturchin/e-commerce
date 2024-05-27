import { View } from '../../../../View';
import './TitleCategory.scss';

export class TitleCategory extends View {
    constructor(categoryTitle: string) {
        super({ tag: 'p', classNames: ['title__category'], textContent: categoryTitle });
    }
}
