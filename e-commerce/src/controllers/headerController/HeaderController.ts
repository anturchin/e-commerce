import { IObserver } from '../../observers/Observer.interface';
import { Publisher } from '../../observers/Publisher';
import { Router } from '../../router/Router';
import { RoutePath } from '../../router/types';
import { LocalStorageManager } from '../../utils/localStorageManager/LocalStorageManager';
import { Header } from '../../views/header/Header';
import { OptionsName } from './types';

export class HeaderController implements IObserver<boolean> {
    private header: Header;

    private router: Router;

    private authPublisher: Publisher<boolean>;

    constructor(router: Router, authPublisher: Publisher<boolean>) {
        this.header = new Header();
        this.router = router;
        this.authPublisher = authPublisher;
        this.authPublisher.registerObserver(this.constructor.name, this);
        this.onClick = this.onClick.bind(this);
        this.setEventListener();
    }

    public updateData(isLoggedIn: boolean): void {
        this.updateHeaderOptions(isLoggedIn);
    }

    public render(): HTMLElement {
        return this.header.getElement();
    }

    private updateHeaderOptions(
        isLoggedIn: boolean = LocalStorageManager.getUserData() !== null
    ): void {
        const items = this.header.getNavList()?.getNavItems();
        items?.forEach((item) => {
            const option = item.getElement();
            const dataAttribute = option.getAttribute('data-nav-item');
            if (isLoggedIn) {
                if (
                    dataAttribute === OptionsName.LOGOUT ||
                    dataAttribute === OptionsName.HOME ||
                    dataAttribute === OptionsName.CATEGORY
                ) {
                    option.classList.remove('hidden');
                } else {
                    option.classList.add('hidden');
                }
            } else if (
                dataAttribute === OptionsName.SIGN_IN ||
                dataAttribute === OptionsName.SIGN_UP ||
                dataAttribute === OptionsName.HOME ||
                dataAttribute === OptionsName.CATEGORY
            ) {
                option.classList.remove('hidden');
            } else {
                option.classList.add('hidden');
            }
        });
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
        if (dataAttribute && dataAttribute === OptionsName.CATEGORY) {
            this.router.navigate(RoutePath.CATEGORY);
        }
        if (dataAttribute && dataAttribute === OptionsName.LOGOUT) {
            const userData = LocalStorageManager.getUserData();
            if (userData) {
                LocalStorageManager.removeUserData();
                this.router.navigate(RoutePath.LOGIN);
                this.updateHeaderOptions(false);
            }
        }
    }

    private setEventListener(): void {
        const navList = this.header.getNavList();
        navList?.getElement().addEventListener('click', this.onClick);
    }
}
