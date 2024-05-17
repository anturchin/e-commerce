export interface ICustomerForLogin {
    email: string;
    password: string;
}

export interface ILoginResponse {
    customer: {
        addresses: [];
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
        stores: [];
    };
}
