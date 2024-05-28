import { View } from '../../../View';
import { CheckboxFilter } from './checkboxFilter/CheckboxFilter';
import { RadioFilter } from './radioFilter/RadioFilter';
import { FormElemetFilters } from './types';
import { TitleFilter } from './titleFilter/TitleFilter';
import './Filter.scss';

export enum filterTypes {
    checkbox = 'checkbox',
    radioBtn = 'radioBtn',
}

export interface IFilter {
    type: string;
    label: string;
    options: string[];
}

export type TFilters = IFilter[];

export class Filter extends View {
    private checkboxFilter: CheckboxFilter | null = null;

    private radioFilter: RadioFilter | null = null;

    private title: TitleFilter | null = null;

    constructor(params: TFilters) {
        super({ tag: 'div', classNames: ['filter__content'] });
        this.setupFilters(params);
    }

    public getFormElements(): FormElemetFilters | null {
        if (this.checkboxFilter && this.radioFilter && this.title) {
            return {
                checkboxFilter: this.checkboxFilter,
                radioFilter: this.radioFilter,
                title: this.title,
            };
        }
        return null;
    }

    private setupFilters(params: TFilters): void {
        const titleFilter = new TitleFilter().getElement();
        this.viewHtmlElement.addInnerElement(titleFilter);

        params.forEach((item) => {
            switch (item.type) {
                case filterTypes.checkbox: {
                    const checkboxFilter = new CheckboxFilter(item).getElement();
                    this.viewHtmlElement.addInnerElement(checkboxFilter);
                    break;
                }
                case filterTypes.radioBtn: {
                    const radioFilter = new RadioFilter(item).getElement();
                    this.viewHtmlElement.addInnerElement(radioFilter);
                    break;
                }
                default:
                    break;
            }
        });
    }
}
