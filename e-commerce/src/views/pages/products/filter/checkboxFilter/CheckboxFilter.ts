import { View } from '../../../../View';
import { IFilter } from '../Filter';
import { Container } from '../../../../div/Container';
import './CheckboxFilter.scss';

export class CheckboxFilter extends View {
    private value: string = '';

    private wrapper: Array<HTMLElement | HTMLLabelElement> = [];

    constructor(param: IFilter) {
        super({ tag: 'div', classNames: ['input-checkbox'] });
        this.setupInput(param);
        this.onChange = this.onChange.bind(this);
        this.setEventListener();
    }

    public getValue(): string {
        return this.value;
    }

    private onChange(event: Event): void {
        this.value = (event.target as HTMLInputElement).value;
    }

    private setEventListener(): void {
        this.getElement().addEventListener('change', this.onChange);
    }

    private setupInput(param: IFilter): void {
        const label = document.createElement('label');
        label.innerHTML = param.label;
        this.wrapper.push(label);

        param.options.forEach((item) => {
            const containerInput = new Container().getElement();
            const input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', item);

            const label = document.createElement('label');
            label.setAttribute('for', item);
            label.innerHTML = item;

            containerInput.append(input, label);
            this.wrapper.push(containerInput);
        });
        this.getElement().append(
            ...this.wrapper.map((item) => {
                return item;
            })
        );
    }
}
