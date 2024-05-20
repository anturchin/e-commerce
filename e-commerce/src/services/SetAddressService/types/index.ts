import { IAddress, IStore } from '../../types';

export interface ILastModifiedBy {
    clientId: string;
    isPlatformClient: boolean;
}

export interface ICreatedBy {
    clientId: string;
    isPlatformClient: boolean;
}

export interface ICustomerUpdateAddress {
    id: string;
    version: number;
    createdAt: string;
    lastModifiedAt: string;
    lastModifiedBy: ILastModifiedBy;
    createdBy: ICreatedBy;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    addresses: IAddress[];
    shippingAddressIds: string[];
    billingAddressIds: string[];
    isEmailVerified: boolean;
    stores: IStore[];
    authenticationMode: string;
}
