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

interface ProductType {
    typeId: string;
    id: string;
    version: number;
}

interface Variant {
    id: number;
    sku: string;
    prices: Price[];
    images: Image[];
    attributes: any[];
    assets: any[];
}

interface Price {
    value: Value;
    id: string;
}

interface Value {
    type: string;
    fractionDigits: number;
    currencyCode: string;
    centAmount: number;
}

interface Image {
    url: string;
    dimensions: Dimensions;
}

interface Dimensions {
    w: number;
    h: number;
}

interface State {
    quantity: number;
    state: StateType;
}

interface StateType {
    typeId: string;
    id: string;
}

interface Custom {
    type: CustomType;
    fields: Record<string, string>;
}

interface CustomType {
    typeId: string;
    id: string;
}

export interface ICartResponse {
    limit: number;
    offset: number;
    count: number;
    total: number;
    results: ICart[];
}
