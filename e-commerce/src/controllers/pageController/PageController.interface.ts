export const enum ControllerName {
    LOGIN = 'login',
    REGISTRATION = 'registration',
    MAIN = 'main',
    NOT_FOUND = 'notFound',
    CATEGORY = 'category',
    PRODUCT = 'product',
    PRODUCT_DETAIL = 'product-detail',
    PROFILE = 'profile',
    ABOUT = 'about',
    BAG = 'bag',
}

export interface IController {
    getElement(): HTMLElement;
}
