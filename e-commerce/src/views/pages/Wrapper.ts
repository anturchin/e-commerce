import { View } from '../View';

export class Wrapper extends View {
    constructor() {
        super({ tag: 'main' });
    }

    public updateContent(component: HTMLElement): void {
        this.getElement().innerHTML = '';
        this.getElement().append(component);
    }
}
