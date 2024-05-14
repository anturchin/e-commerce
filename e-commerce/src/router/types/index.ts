export const enum RoutePath {
    LOGIN = 'login',
    REGISTRATION = 'registration',
    MAIN = 'main',
    NOT_FOUND = 'not-found',
}

export interface IRoute {
    path: RoutePath;
    callback: () => Promise<void>;
}
