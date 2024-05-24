import { View } from '../../../../View';
import './Title.scss';

export class Title extends View {
    constructor() {
        super({ tag: 'H1', classNames: ['title'], textContent: 'Sign in' });
    }
}
