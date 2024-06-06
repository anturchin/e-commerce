export type CallbackType = (event: Event) => void;

export interface IElementParams {
    tag: string;
    classNames?: string[];
    textContent?: string;
    innerHtml?: string;
    callback?: CallbackType | null;
    id?: string;
}
