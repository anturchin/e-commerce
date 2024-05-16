export interface IRegistrationResponse {
    customer: {
        addresses: [];
        email: string;
        firstName: string;
        id: string;
        isEmailVerified: boolean;
        lastName: string;
        password: string;
        version: null;
        createdAt: string;
        lastModifiedAt: string;
        authenticationMode: string;
        stores: [];
    };
}
