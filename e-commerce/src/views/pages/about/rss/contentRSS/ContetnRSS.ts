import { View } from '../../../../View';
import './ContentRSS.scss';

export class ContentRSS extends View {
    constructor() {
        super({
            tag: 'p',
            classNames: ['content-colab'],
            textContent:
                'If you want to learn frontend development and many other things, click on the logo and follow this link. You will discover the fascinating world of programming.',
        });
    }
}
