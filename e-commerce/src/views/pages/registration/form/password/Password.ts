import { View } from '../../../../View';
import './Password.scss';

export class Password extends View {
    private value: string = '';

    constructor(options: { type: string; label: string; required: boolean }) {
        super({ tag: 'input', classNames: ['input'] });
        this.setupInput(options);
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

    private setupInput(options: { type: string; label: string; required: boolean }): void {
        const input = this.getElement();
        input.setAttribute('type', options.type);
        input.setAttribute('placeholder', options.label);
        if (options.required) {
            input.setAttribute('required', 'true');
        }
    }
}
