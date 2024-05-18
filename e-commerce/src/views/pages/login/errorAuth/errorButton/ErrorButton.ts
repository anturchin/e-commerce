import { View } from '../../../../View';

import './ErrorButton.scss';

export class ErrorButton extends View {
    constructor() {
        super({ tag: 'button', classNames: ['error__close'], textContent: 'close' });
    }
}
