import { View } from '../../../../View';
import './TitleForm.scss';

export class TitleForm extends View {
    constructor() {
        super({ tag: 'H1', classNames: ['title-form'], textContent: 'Create your account' });
    }
}
