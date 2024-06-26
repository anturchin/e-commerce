import { View } from '../../../../View';
import './RoleUser.scss';

export class RoleUser extends View {
    constructor(roleUser: string) {
        super({ tag: 'h4', classNames: ['user-card__role'], textContent: roleUser });
    }
}
