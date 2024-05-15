import { Header } from '../../views/header/Header';

export class HeaderController {
    private header: Header;

    constructor() {
        this.header = new Header();
    }

    public render(): HTMLElement {
        return this.header.getElement();
    }
}
