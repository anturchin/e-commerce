import { View } from '../View';
import { TitleLoad } from './title/Title';
import './Load.scss';

export class Load extends View {
    constructor() {
        super({ tag: 'div', classNames: ['loading'] });
        this.setupLoad();
        this.hide();
    }

    private setupLoad(): void {
        const title = new TitleLoad().getElement();
        this.viewHtmlElement.addInnerElement(title);
    }

    public show(): void {
        this.viewHtmlElement.getElement().style.display = 'flex';
    }

    public hide(): void {
        this.viewHtmlElement.getElement().style.display = 'none';
    }
}
