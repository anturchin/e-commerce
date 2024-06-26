interface Money {
    type: string;
    fractionDigits: number;
    currencyCode: string;
    centAmount: number;
}

interface Value {
    type: string;
    money: Money[];
    permyriad: number;
}

interface LocalizedString {
    en: string;
}

interface References {
    typeId: string;
    id: string;
}

export interface IDiscountResult {
    id: string;
    version: number;
    value: Value;
    predicate: string;
    name: LocalizedString;
    description: LocalizedString;
    isActive: boolean;
    sortOrder: string;
    references: References[];
    createdAt: string;
    lastModifiedAt: string;
}

export interface IDiscountResponse {
    limit: number;
    offset: number;
    count: number;
    total: number;
    results: IDiscountResult[];
}
