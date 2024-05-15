export const enum ControllerName {
    LOGIN = 'login',
    REGISTRATION = 'registration',
    MAIN = 'main',
    NOT_FOUND = 'notFound',
}

export interface IController {
    getElement(): HTMLElement;
}
