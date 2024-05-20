import { View } from '../../View';

export class Main extends View {
    constructor() {
        super({ tag: 'section', classNames: ['content'] });
        this.setupMain();
    }

    private setupMain(): void {}
}
