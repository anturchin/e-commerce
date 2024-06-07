import { View } from '../../../../View';
import './ContributionUser.scss';

export class Contribution extends View {
    constructor(contrUser: string) {
        super({ tag: 'h4', classNames: ['user-card__contr'], textContent: contrUser });
    }
}
