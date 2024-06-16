import { View } from '../View';
import './Wrapper.scss';

export class Wrapper extends View {
    constructor() {
        super({ tag: 'main', classNames: ['wrapper'] });
    }

    public updateContent(component: HTMLElement): void {
        this.getElement().innerHTML = '';
        this.getElement().append(component);
    }
}
