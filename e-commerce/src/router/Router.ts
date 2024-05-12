import { IRouter } from './Router.interface';
import { IRoute, RoutePath } from './types';

export class Router implements IRouter {
    private routes: IRoute[] = [];

    constructor(routes: IRoute[]) {
        this.addRoute(routes);
    }

    public addRoute(routes: IRoute[]): void {
        routes.forEach((route) => this.routes.push(route));
    }

    public findRoute(path: RoutePath): IRoute | undefined {
        return this.routes.find((r) => r.path === path);
    }

    public async showNotFoundPage(): Promise<void> {
        this.findRoute(RoutePath.NOT_FOUND)?.callback();
    }

    public async navigate(path: RoutePath): Promise<void> {
        const route = this.findRoute(path);
        if (route) {
            await route.callback();
        } else {
            await this.showNotFoundPage();
        }
    }
}
