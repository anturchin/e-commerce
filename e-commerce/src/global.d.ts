declare module '*.module.scss' {
    interface IClassNames {
        [className: string]: string;
    }
    const className: IClassNames;
    export = className;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
declare module '*.webp';
