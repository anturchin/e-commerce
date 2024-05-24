interface Price {
    value: {
        type: string;
        fractionDigits: number;
        centAmount: number;
        currencyCode: string;
    };
    id: string;
}

interface Image {
    dimensions: {
        h: number;
        w: number;
    };
    url: string;
}

interface Variant {
    attributes: string[]; // maybe string?
    id: number;
    images: Image[];
    prices: Price[];
    sku: string;
}

interface LocalizedString {
    en: string;
}

interface CategoryReference {
    id: string;
    typeId: string;
}

interface MasterData {
    current: {
        categories: CategoryReference[];
        description: LocalizedString;
        masterVariant: Variant;
        name: LocalizedString;
        slug: LocalizedString;
        variants: string[]; // may be string?
        searchKeywords: string[]; // may be string?
    };
    hasStagedChanges: boolean;
    published: boolean;
    staged: {
        categories: CategoryReference[];
        description: LocalizedString;
        masterVariant: Variant;
        name: LocalizedString;
        slug: LocalizedString;
        variants: string[];
        searchKeywords: string;
    };
}

interface Reference {
    id: string;
    typeId: string;
}

interface Product {
    id: string;
    masterData: MasterData;
    productType: Reference;
    taxCategory: Reference;
    version: number;
    createdAt: string;
    lastModifiedAt: string;
}

export interface IProductResponse {
    limit: number;
    offset: number;
    count: number;
    total: number;
    results: Product[];
}
