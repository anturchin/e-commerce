interface IAncestors {
    typeId: string;
    id: string;
}

export interface IResult {
    id: string;
    version: number;
    name: {
        ru: string;
    };
    slug: {
        ru: string;
    };
    ancestors: IAncestors[];
    orderHint: string;
    createdAt: string;
    lastModifiedAt: string;
}

export interface ICategoryResponse {
    limit: number;
    offset: number;
    count: number;
    total: number;
    results: IResult[];
}
