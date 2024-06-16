import { View } from '../../../View';
import './BtnDeleteAll.scss';

export class BtnDeleteAll extends View {
    constructor() {
        super({ tag: 'button', classNames: ['custom-button-delete'], textContent: 'Empty trash' });
    }

    public hide(): void {
        this.getElement().style.display = 'none';
    }

    public show(): void {
        this.getElement().style.display = 'block';
    }
}
