import { PageController } from '../../controllers/pageController/PageController';
import { ControllerName } from '../../controllers/pageController/PageController.interface';
import { Router } from '../Router';
import { IRoute, RoutePath } from '../types';

export class Routes {
    public static initialRoutes(router: Router, pageController: PageController): IRoute[] {
        const routes: IRoute[] = [
            {
                path: RoutePath.LOGIN,
                callback: async () => {
                    await pageController.updateContent(ControllerName.LOGIN);
                },
            },
            {
                path: RoutePath.REGISTRATION,
                callback: async () => {
                    await pageController.updateContent(ControllerName.REGISTRATION);
                },
            },
            {
                path: RoutePath.MAIN,
                callback: async () => {
                    await pageController.updateContent(ControllerName.MAIN);
                },
            },
            {
                path: RoutePath.NOT_FOUND,
                callback: async () => {
                    await pageController.updateContent(ControllerName.NOT_FOUND);
                },
            },
        ];
        return routes;
    }
}
