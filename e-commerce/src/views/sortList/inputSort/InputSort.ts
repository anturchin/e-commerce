import { View } from '../../View';
import { Option } from '../../pages/registration/formAddress/inputCountry/option/Option';

import './InputSort.scss';

export class InputSort extends View {
    private value: string = '';

    constructor(options: { label: string; required: boolean; options: string[] }) {
        super({ tag: 'select', classNames: ['input'] });
        this.setupInput(options);
        this.onChange = this.onChange.bind(this);
        this.setEventListener();
    }

    public getValue(): string {
        return this.value;
    }

    private onChange(event: Event): void {
        this.value = (event.target as HTMLSelectElement).value;
    }

    private setEventListener(): void {
        this.getElement().addEventListener('change', this.onChange);
    }

    private setupInput(options: { label: string; required: boolean; options: string[] }): void {
        const select = this.getElement() as HTMLSelectElement;
        select.name = 'Sorting';
        if (options.required) {
            select.setAttribute('required', 'true');
        }
        options.options.forEach((optionValue) => {
            const option = new Option();
            option.getElement().setAttribute('value', optionValue);
            option.getElement().textContent = optionValue;
            select.appendChild(option.getElement());
        });
    }
}
