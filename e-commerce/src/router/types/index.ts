export type ProductType = 'phone' | 'laptop' | 'watch' | 'tablet';

export const enum RoutePath {
    LOGIN = 'login',
    REGISTRATION = 'registration',
    MAIN = 'main',
    NOT_FOUND = 'not-found',
    CATEGORY = 'category',
    PRODUCT = 'product',
    PROFILE = 'profile',
}

export interface IRoute {
    path: RoutePath | string;
    callback: (params?: string) => Promise<void>;
}

export interface IRouteWithParams extends IRoute {
    params?: string[];
}
