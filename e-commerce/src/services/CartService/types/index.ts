interface Dimensions {
    w: number;
    h: number;
}

interface Image {
    url: string;
    dimensions: Dimensions;
}

interface Value {
    type: string;
    fractionDigits: number;
    currencyCode: string;
    centAmount: number;
}

interface Price {
    value: Value;
    id: string;
    centAmount: number;
}

interface Variant {
    id: number;
    sku: string;
    prices: Price[];
    images: Image[];
    attributes: string[];
    assets: string[];
}

interface ProductType {
    typeId: string;
    id: string;
    version: number;
}

interface StateType {
    typeId: string;
    id: string;
}

interface State {
    quantity: number;
    state: StateType;
}

interface CustomType {
    typeId: string;
    id: string;
}

interface Custom {
    type: CustomType;
    fields: Record<string, string>;
}

export interface ILineItem {
    id: string;
    productId: string;
    name: Record<string, string>;
    productType: ProductType;
    productSlug: Record<string, string>;
    variant: Variant;
    price: Price;
    quantity: number;
    discountedPricePerQuantity: string[];
    state: State[];
    priceMode: string;
    lineItemMode: string;
    totalPrice: Price;
    custom?: Custom;
    perMethodTaxRate: string[];
    taxedPricePortions: string[];
}

export interface ICart {
    type: string;
    id: string;
    version: number;
    createdAt: string;
    lastModifiedAt: string;
    lineItems: ILineItem[];
    cartState: string;
    totalPrice: Price;
    customLineItems: string[];
    discountCodes: string[];
    directDiscounts: string[];
    inventoryMode: string;
    taxMode: string;
    taxRoundingMode: string;
    taxCalculationMode: string;
    refusedGifts: string[];
    origin: string;
    itemShippingAddresses: string[];
    shipping: string[];
    shippingMode: string;
    country?: string;
}

export interface ICartResponse {
    limit: number;
    offset: number;
    count: number;
    total: number;
    results: ICart[];
}

export interface ICartAction {
    action: string;
    productId?: string;
    lineItemId?: string;
    quantity?: number;
    code?: string;
}
