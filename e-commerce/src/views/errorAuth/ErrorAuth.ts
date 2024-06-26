import { View } from '../View';
import { ErrorButton } from './errorButton/ErrorButton';
import { ErrorMessage } from './errorMessage/ErrorMessage';
import { ErrorWrapper } from './errorWrapper/ErrorWrapper';

import './ErrorAuth.scss';

export class ErrorAuth extends View {
    private errorMessage: ErrorMessage;

    private errorWrapper: ErrorWrapper;

    private errorButton: ErrorButton;

    constructor() {
        super({ tag: 'div', classNames: ['overlay', 'hidden'] });

        this.errorMessage = new ErrorMessage();
        this.errorWrapper = new ErrorWrapper();
        this.errorButton = new ErrorButton();

        this.setupErrorAuth();
        this.setupEvent();
    }

    public showMessage(message: string, status: number): void {
        this.errorMessage.getElement().textContent = ` [ ${status} ]: ${message}`;
        this.getElement().classList.remove('hidden');
    }

    public hideMessage(): void {
        this.getElement().classList.add('hidden');
    }

    private setupEvent(): void {
        this.errorButton.getElement().addEventListener('click', () => this.hideMessage());
    }

    private setupErrorAuth(): void {
        this.errorWrapper
            .getElement()
            .append(this.errorMessage.getElement(), this.errorButton.getElement());
        this.addInnerElement(this.errorWrapper.getElement());
    }
}
