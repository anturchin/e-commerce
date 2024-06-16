import { View } from '../../../../View';
import './Subtitle.scss';

export class Subtitle extends View {
    constructor() {
        super({
            tag: 'p',
            classNames: ['modal-delete__subtitle'],
            textContent: 'Successfully deleted',
        });
    }
}
