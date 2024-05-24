import { View } from '../../../../View';
import { Password } from '../inputPassword/InputPassword';

import './Inputbox.scss';

export class Box extends View {
    private inputPassword: Password | null = null;

    constructor(
        options: { type: string; label: string; required: boolean },
        inputPassword: Password
    ) {
        super({ tag: 'input', classNames: ['checkbox-input'] });
        this.inputPassword = inputPassword;
        this.setupInput(options);
        this.onClick = this.onClick.bind(this);
        this.setEventListener();
    }

    private setupInput(options: { type: string; label: string; required: boolean }): void {
        const input = this.getElement();
        input.setAttribute('type', options.type);
        input.setAttribute('placeholder', options.label);
        if (options.required) {
            input.setAttribute('required', 'true');
        }
    }

    private onClick(): void {
        if ((this.getElement() as HTMLInputElement).checked) {
            (this.inputPassword?.getElement() as HTMLInputElement).type = 'text';
        } else {
            (this.inputPassword?.getElement() as HTMLInputElement).type = 'password';
        }
    }

    private setEventListener(): void {
        this.getElement().addEventListener('click', this.onClick);
    }
}
