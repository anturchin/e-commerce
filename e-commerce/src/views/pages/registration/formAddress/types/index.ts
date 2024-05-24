import { AddressType } from '../inputAddressType/InputAddressType';
import { City } from '../inputCity/InputCity';
import { Country } from '../inputCountry/InputCountry';
import { Street } from '../inputNameStr/InputNameStr';
import { House } from '../inputNumberStr/InputNumberStr';
import { Postal } from '../inputPostal/InputPostal';

export type FormElementsAddressType = {
    inputCountry: Country;
    inputCity: City;
    inputStreet: Street;
    inputHouse: House;
    inputPostal: Postal;
    inputAddressType: AddressType;
};
