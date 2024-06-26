import { RoutePath, IRoute } from './types';

export interface IRouter {
    addRoute: (router: IRoute[]) => void;
    navigate: (path: RoutePath) => void;
}
