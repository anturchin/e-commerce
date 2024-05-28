import { View } from '../../../../View';
import { Container } from '../../../../div/Container';
import { IFilter } from '../Filter';
import './RadioFilter.scss';

export class RadioFilter extends View {
    private value: string = '';

    private wrapper: Array<HTMLElement | HTMLLabelElement> = [];

    constructor(param: IFilter) {
        super({ tag: 'div', classNames: ['input-radio'] });
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
            input.setAttribute('type', 'radio');
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
