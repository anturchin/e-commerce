import { View } from '../../../../View';
import './NameUser.scss';

export class NameUser extends View {
    constructor(nameUser: string) {
        super({ tag: 'h4', classNames: ['user-card__name'], textContent: nameUser });
    }
}
