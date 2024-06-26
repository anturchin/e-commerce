import { View } from '../../../../View';
import { Option } from './option/Option';
import './InputCountry.scss';

export class Country extends View {
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
        select.name = 'Country';
        if (options.required) {
            select.setAttribute('required', 'true');
        }

        const placeholderOption = new Option();
        placeholderOption.getElement().setAttribute('disabled', 'true');
        placeholderOption.getElement().setAttribute('selected', 'true');
        placeholderOption.getElement().textContent = 'Select a country';
        select.appendChild(placeholderOption.getElement());

        options.options.forEach((optionValue) => {
            const option = new Option();
            option.getElement().setAttribute('value', optionValue);
            option.getElement().textContent = optionValue;
            select.appendChild(option.getElement());
        });
    }
}
