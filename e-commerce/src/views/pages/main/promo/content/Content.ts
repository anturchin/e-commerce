import { View } from '../../../../View';
import './Content.scss';

export class Content extends View {
    constructor() {
        super({
            tag: 'p',
            classNames: ['promo__content'],
            textContent:
                'You can use the following promotional codes: "Spring", "Summer", "Autumn", "Winter"',
        });
    }
}
