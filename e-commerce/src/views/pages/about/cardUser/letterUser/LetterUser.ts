import { View } from '../../../../View';
import './LettersUser.scss';

export class LettersUser extends View {
    constructor(letterUser: string) {
        super({ tag: 'h4', classNames: ['user-card__letter'], textContent: letterUser });
    }
}
