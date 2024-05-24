import { View } from '../../View';
import './ErrorWrapper.scss';

export class ErrorWrapper extends View {
    constructor() {
        super({ tag: 'div', classNames: ['modal-error'] });
    }
}
