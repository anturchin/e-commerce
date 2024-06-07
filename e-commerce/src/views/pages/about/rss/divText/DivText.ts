import { View } from '../../../../View';
import './DivText.scss';

export class ContainerText extends View {
    constructor() {
        super({ tag: 'div', classNames: ['container-text'] });
    }
}
