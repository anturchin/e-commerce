import { CallbackType, IElementParams } from './types';

export class HTMLElementCreator {
    private readonly element: HTMLElement;

    constructor(params: IElementParams) {
        this.element = document.createElement(params.tag);
        if (params.classNames) {
            this.setCssSelector(params.classNames);
        }
        if (params.textContent) {
            this.setTextContent(params.textContent);
        }
        if (params.callback) {
            this.setCallback(params.callback);
        }
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    public addInnerElement(innerElement: HTMLElement | HTMLElementCreator): void {
        if (innerElement instanceof HTMLElementCreator) {
            this.element.append(innerElement.getElement());
        } else {
            this.element.append(innerElement);
        }
    }

    public setCssSelector(cssClasses: string[]): void {
        cssClasses.forEach((className) => {
            this.element.classList.add(className);
        });
    }

    public setTextContent(textContent: string): void {
        this.element.textContent = textContent;
    }

    public setCallback(callback: CallbackType): void {
        this.element.addEventListener('click', callback);
    }
}
