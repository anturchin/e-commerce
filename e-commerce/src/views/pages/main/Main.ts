import { View } from '../../View';
import { Filter, TFilters } from '../products/filter/Filter';

const filters: TFilters = [
    {
        type: 'checkbox',
        label: 'test',
        options: ['Blue', 'Black', 'White'],
    },

    {
        type: 'radioBtn',
        label: 'test2',
        options: ['3', '2', 'Red'],
    },
];

export class Main extends View {
    constructor() {
        super({ tag: 'section', classNames: ['content'] });
        this.setupInputFilters();
    }

    setupInputFilters() {
        const filter = new Filter(filters).getElement();
        this.viewHtmlElement.addInnerElement(filter);
    }
}
