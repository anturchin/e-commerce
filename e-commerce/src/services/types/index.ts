export interface IAddress {
    country: string;
    id?: string;
    streetName?: string;
    streetNumber?: string;
    postalCode?: string;
    city?: string;
}

export interface IStore {
    typeId: string;
    key: string;
}

export interface ICustomerResponse {
    customer: {
        addresses: IAddress[];
        email: string;
        firstName: string;
        id: string;
        isEmailVerified: boolean;
        lastName: string;
        password: string;
        version: number;
        createdAt: string;
        lastModifiedAt: string;
        authenticationMode: string;
        stores: IStore[];
    };
}

export interface ICustomerResponseFailed {
    statusCode: number;
    msg: string;
}
