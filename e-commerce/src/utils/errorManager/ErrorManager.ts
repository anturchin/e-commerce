import { HTMLElementCreator } from '../HtmlElementCreator';
import './ErrorManager.scss';

export class ErrorManager {
    private errorMessageElement: HTMLElementCreator | null;

    constructor(message: string) {
        const props = {
            tag: 'div',
            classNames: ['error__massage'],
            textContent: message,
        };
        this.errorMessageElement = new HTMLElementCreator(props);
    }

    public showError(targetElement: HTMLElement): void {
        if (this.errorMessageElement) {
            targetElement.after(this.errorMessageElement.getElement());
        }
    }

    public hideError(): void {
        if (this.errorMessageElement) {
            this.errorMessageElement.getElement().remove();
            this.errorMessageElement = null;
        }
    }
}
