import { Router } from '../../router/Router';
import { RoutePath } from '../../router/types';
import { LocalStorageManager } from '../../utils/localStorageManager/LocalStorageManager';
import { Header } from '../../views/header/Header';
import { OptionsName } from './types';

export class HeaderController {
    private header: Header;

    private router: Router;

    constructor(router: Router) {
        this.header = new Header();
        this.router = router;
        this.onClick = this.onClick.bind(this);
        this.setEventListener();
    }

    public render(): HTMLElement {
        return this.header.getElement();
    }

    private onClick(event: Event): void {
        const item = event.target as HTMLElement;
        const dataAttribute = item.getAttribute('data-nav-item');
        if (dataAttribute && dataAttribute === OptionsName.HOME) {
            this.router.navigate(RoutePath.MAIN);
        }
        if (dataAttribute && dataAttribute === OptionsName.SIGN_IN) {
            this.router.navigate(RoutePath.LOGIN);
        }
        if (dataAttribute && dataAttribute === OptionsName.SIGN_UP) {
            this.router.navigate(RoutePath.REGISTRATION);
        }
        if (dataAttribute && dataAttribute === OptionsName.LOGOUT) {
            const userData = LocalStorageManager.getUserData();
            if (userData) {
                LocalStorageManager.removeUserData();
                this.router.navigate(RoutePath.LOGIN);
            }
        }
    }

    private setEventListener(): void {
        const navList = this.header.getNavList();
        navList?.getElement().addEventListener('click', this.onClick);
    }
}
