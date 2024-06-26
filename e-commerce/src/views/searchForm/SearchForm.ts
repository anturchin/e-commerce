import { View } from '../View';
import { InputSearch } from './inputSearch/InputSearch';
import { ImgSearch } from './imgSearch/ImgSearch';
import { Button } from '../button/Button';

import './SearchForm.scss';
import { FormSearchElemntsType } from './types';

export class SearchForm extends View {
    private inputSearch: InputSearch | null = null;

    private buttonSubmit: Button | null = null;

    constructor() {
        super({ tag: 'form', classNames: ['form-search'] });
        this.setupForm();
    }

    public getFormElemnts(): FormSearchElemntsType | null {
        if (this.inputSearch && this.buttonSubmit) {
            return {
                searchInput: this.inputSearch,
                buttonSubmit: this.buttonSubmit,
            };
        }
        return null;
    }

    private setupForm(): void {
        this.inputSearch = new InputSearch({
            type: 'text',
            label: 'Search',
            required: true,
        });
        this.viewHtmlElement.addInnerElement(this.inputSearch.getElement());

        this.buttonSubmit = new Button({
            label: '',
        });

        const img = new ImgSearch().getElement();
        this.buttonSubmit.addInnerElement(img);
        this.viewHtmlElement.addInnerElement(this.buttonSubmit.getElement());
    }
}
