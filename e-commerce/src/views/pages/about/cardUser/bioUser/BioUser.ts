import { View } from '../../../../View';
import './BioUser.scss';

export class BioUser extends View {
    constructor(bioUser: string) {
        super({ tag: 'h4', classNames: ['user-card__bio'], textContent: bioUser });
    }
}
