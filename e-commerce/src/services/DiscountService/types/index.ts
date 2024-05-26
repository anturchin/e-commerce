interface Money {
    type: string;
    fractionDigits: number;
    currencyCode: string;
    centAmount: number;
}

interface Value {
    type: string;
    money: Money[];
}

interface LocalizedString {
    en: string;
}

interface References {
    typeId: string;
    id: string;
}

interface Result {
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
    results: Result[];
}
