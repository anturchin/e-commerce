import { Header } from '../views/header/Header';

export class App {
    private header: Header;

    constructor() {
        this.header = new Header();
    }

    public render(): void {
        const header = this.header.getElement();
        const body: HTMLElement | null = document.querySelector('body');
        if (body) {
            body.append(...[header]);
        }
    }
}
