export type CallbackType = (event: Event) => void;

export interface IElementParams {
    tag: string;
    classNames?: string[];
    textContent?: string;
    callback?: CallbackType;
}
