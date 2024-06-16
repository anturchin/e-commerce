import { Profile } from '../../../views/pages/profile/Profile';
import { IController } from '../PageController.interface';

export class ProfileController implements IController {
    private page: Profile;

    constructor() {
        this.page = new Profile();
    }

    getElement(): HTMLElement {
        return this.page.getElement();
    }
}
