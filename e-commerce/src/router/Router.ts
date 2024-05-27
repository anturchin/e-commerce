import { PageController } from '../controllers/pageController/PageController';
import { LocalStorageManager } from '../utils/localStorageManager/LocalStorageManager';
import { IRouter } from './Router.interface';
import { Routes } from './routes/Routes';
import { IRoute, IRouteWithParams, RoutePath } from './types';

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

    public findRoute(path: RoutePath): IRouteWithParams | undefined {
        const segments = path.split('/');
        return this.routes.reduce<IRouteWithParams | undefined>((foundRoute, route) => {
            if (foundRoute) {
                return foundRoute;
            }

            const routeSegments = route.path.split('/');
            if (routeSegments.length === segments.length) {
                const params: string[] = [];
                const match = routeSegments.every((segment, i) => {
                    if (segment.startsWith(':')) {
                        params.push(segments[i]);
                        return true;
                    }
                    return segment === segments[i];
                });

                if (match) {
                    return {
                        ...route,
                        params,
                    };
                }
            }

            return undefined;
        }, undefined);
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

            if (route.params && route.params.length) {
                await route.callback(...route.params);
            } else {
                await route.callback();
            }
            this.updateUrl(path);
        } else {
            await this.showNotFoundPage();
        }
    }
}
