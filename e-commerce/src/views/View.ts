import { HTMLElementCreator } from '../utils/HtmlElementCreator';
import { IElementParams } from '../utils/types';

export abstract class View {
    protected viewHtmlElement: HTMLElementCreator;

    constructor(props: IElementParams) {
        this.viewHtmlElement = this.createElement(props);
    }

    public createElement(params: IElementParams): HTMLElementCreator {
        const viewHtmlElement = new HTMLElementCreator(params);
        return viewHtmlElement;
    }

    public getElement(): HTMLElement {
        return this.viewHtmlElement.getElement();
    }

    public addInnerElement(innerElement: HTMLElement | HTMLElementCreator): void {
        this.viewHtmlElement.addInnerElement(innerElement);
    }

    public render(component?: View): void {
        console.log(component);
    }
}
