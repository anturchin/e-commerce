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
}

interface Variant {
    id: number;
    sku: string;
    prices: Price[];
    images: Image[];
    attributes: any[];
    assets: any[];
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

interface LineItem {
    id: string;
    productId: string;
    name: Record<string, string>;
    productType: ProductType;
    productSlug: Record<string, string>;
    variant: Variant;
    price: Price;
    quantity: number;
    discountedPricePerQuantity: any[];
    state: State[];
    priceMode: string;
    lineItemMode: string;
    totalPrice: Price;
    custom?: Custom;
    perMethodTaxRate: any[];
    taxedPricePortions: any[];
}

export interface ICart {
    type: string;
    id: string;
    version: number;
    createdAt: string;
    lastModifiedAt: string;
    lineItems: LineItem[];
    cartState: string;
    totalPrice: Price;
    customLineItems: any[];
    discountCodes: any[];
    directDiscounts: any[];
    inventoryMode: string;
    taxMode: string;
    taxRoundingMode: string;
    taxCalculationMode: string;
    refusedGifts: any[];
    origin: string;
    itemShippingAddresses: any[];
    shipping: any[];
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
