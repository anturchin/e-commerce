import { Wrapper } from '../../views/pages/Wrapper';
import { Router } from '../Router';
import { IRoute, RoutePath } from '../types';

export class Routes {
    public static initialRoutes(router: Router, wrapper: Wrapper): IRoute[] {
        const routes: IRoute[] = [
            {
                path: RoutePath.LOGIN,
                callback: async () => {
                    const { Login } = await import('../../views/pages/login/Login');
                    wrapper.updateContent(new Login());
                },
            },
            {
                path: RoutePath.REGISTRATION,
                callback: async () => {
                    const { Registration } = await import(
                        '../../views/pages/registration/Registration'
                    );
                    wrapper.updateContent(new Registration());
                },
            },
            {
                path: RoutePath.MAIN,
                callback: async () => {
                    const { Main } = await import('../../views/pages/main/Main');
                    wrapper.updateContent(new Main());
                },
            },
            {
                path: RoutePath.NOT_FOUND,
                callback: async () => {
                    const { NotFount } = await import('../../views/pages/404/NotFount');
                    wrapper.updateContent(new NotFount());
                },
            },
        ];
        return routes;
    }
}
