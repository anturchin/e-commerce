import { PageController } from '../controllers/pageController/PageController';
import { LocalStorageManager } from '../utils/localStorageManager/LocalStorageManager';
import { IRouter } from './Router.interface';
import { Routes } from './routes/Routes';
import { IRoute, RoutePath } from './types';

export class Router implements IRouter {
    private routes: IRoute[] = [];

    constructor(pageController: PageController) {
        this.addRoute(Routes.initialRoutes(this, pageController));

        window.addEventListener('popstate', () => {
            this.navigate(this.getUrl());
        });

        window.addEventListener('hashchange', () => {
            this.navigate(this.getUrl());
        });
    }

    public getUrl(): RoutePath {
        return (window.location.hash.slice(1) as RoutePath) || RoutePath.MAIN;
    }

    public addRoute(routes: IRoute[]): void {
        routes.forEach((route) => this.routes.push(route));
    }

    public findRoute(path: RoutePath): IRoute | undefined {
        return this.routes.find((r) => r.path === path);
    }

    public updateUrl(path: RoutePath): void {
        window.location.hash = `#${path}`;
    }

    public async showNotFoundPage(): Promise<void> {
        await this.findRoute(RoutePath.NOT_FOUND)?.callback();
    }

    public async navigate(path: RoutePath): Promise<void> {
        const route = this.findRoute(path);
        if (route) {
            const isLoggedIn = !!LocalStorageManager.getUserData();
            if (
                isLoggedIn &&
                (route.path === RoutePath.LOGIN || route.path === RoutePath.REGISTRATION)
            ) {
                this.updateUrl(RoutePath.MAIN);
                return;
            }

            await route.callback();
            this.updateUrl(path);
        } else {
            await this.showNotFoundPage();
            // this.updateUrl(RoutePath.NOT_FOUND);
        }
    }
}
