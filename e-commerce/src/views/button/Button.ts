import { View } from '../View';
import { ButtonType } from './types';

import './Button.scss';

export class Button extends View {
    constructor(props: ButtonType) {
        super({ tag: 'button', classNames: ['custom-button'] });
        this.setupInput(props);
        this.addClickHandler(props.onClick);
    }

    private setupInput(props: ButtonType): void {
        const button = this.getElement() as HTMLButtonElement;
        button.textContent = props.label;
        if (props.disabled) {
            button.disabled = props.disabled;
        }
    }

    public addClickHandler(onClick?: () => void): void {
        if (onClick) {
            const button = this.getElement() as HTMLButtonElement;
            button.addEventListener('click', onClick);
        }
    }
}
