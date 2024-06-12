import { Router } from '../../../../../router/Router';
import { View } from '../../../../View';
import { RoutePath } from '../../../../../router/types';
import './BtnProduct.scss';

export class BtnProduct extends View {
    private router: Router | null;

    constructor(router: Router | null) {
        super({ tag: 'button', classNames: ['custom-button'], textContent: 'Go shopping' });
        this.router = router;
        this.redirectToCategory = this.redirectToCategory.bind(this);
        this.setupPath();
    }

    private async redirectToCategory(): Promise<void> {
        await this.router?.navigate(RoutePath.CATEGORY);
    }

    private setupPath(): void {
        this.getElement().addEventListener('click', this.redirectToCategory);
    }
}
