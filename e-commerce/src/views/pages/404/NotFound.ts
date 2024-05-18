import { View } from '../../View';
import { ErrorMessage } from './errorMessage/ErrorMessage';
import { ErrorWrapper } from './errorWrapper/ErrorWrapper';

export class NotFound extends View {
    constructor() {
        super({ tag: 'section' });
        this.setupNotFound();
    }

    private setupNotFound(): void {
        const h1 = document.createElement('h1');
        h1.textContent = 'NotFound';
        this.viewHtmlElement.addInnerElement(h1);

        const wrapper = new ErrorWrapper().getElement();
        const message = new ErrorMessage().getElement();

        wrapper.append(message);
        this.addInnerElement(wrapper);
    }
}
