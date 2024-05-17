import { View } from '../../../../View';
import './inputPassword.scss';

export class Password extends View {
    constructor(options: { type: string; label: string; required: boolean }) {
        super({ tag: 'input', classNames: ['input'] });
        this.setupInput(options);
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
