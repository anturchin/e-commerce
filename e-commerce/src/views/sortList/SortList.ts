import { View } from '../View';
import { InputSort } from './inputSort/InputSort';
import { FormElemetSorting } from './type';

import './SortList.scss';

export class FormSort extends View {
    private inputSort: InputSort | null = null;

    constructor() {
        super({ tag: 'form', classNames: ['form-sort'] });
        this.setupForm();
    }

    public getFormElements(): FormElemetSorting | null {
        if (this.inputSort) {
            return {
                inputSort: this.inputSort,
            };
        }
        return null;
    }

    private setupForm(): void {
        this.inputSort = new InputSort({
            label: 'Sort',
            required: false,
            options: ['By popularity', 'By discount size', 'Ascending price', 'Descending price'],
        });
        this.viewHtmlElement.addInnerElement(this.inputSort.getElement());
    }
}
