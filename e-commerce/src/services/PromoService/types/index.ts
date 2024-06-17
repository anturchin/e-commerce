interface Name {
    en: string;
    ru: string;
}

interface Value {
    type: string;
    permyriad: number;
}

interface Target {
    type: string;
    predicate: string;
}

interface Store {
    key: string;
    typeId: string;
}

export interface IPromo {
    id: string;
    version: number;
    code: string;
    createdAt: string;
    lastModifiedAt: string;
    name: Name;
    value: Value;
    cartPredicate: string;
    target: Target;
    sortOrder: string;
    stores: Store[];
    isActive: boolean;
    requiresDiscountCode: boolean;
    references: string[];
    stackingMode: string;
}

export interface IPromoResponse {
    limit: number;
    offset: number;
    count: number;
    total: number;
    results: IPromo[];
}
