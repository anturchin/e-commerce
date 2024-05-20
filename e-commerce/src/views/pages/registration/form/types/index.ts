import { Button } from '../../../../button/Button';
import { Mail } from '../inputMail/InputMail';
import { Name } from '../inputName/InputName';
import { Surname } from '../inputSurname/InputSurname';
import { Password } from '../password/Password';
import { Country } from '../../formAddress/inputCountry/InputCountry';
import { City } from '../../formAddress/inputCity/InputCity';
import { Street } from '../../formAddress/inputNameStr/InputNameStr';
import { House } from '../../formAddress/inputNumberStr/InputNumberStr';
import { Postal } from '../../formAddress/inputPostal/InputPostal';
import { AddressType } from '../../formAddress/inputAddressType/InputAddressType';
import { TitleForm } from '../titleForm/TitleForm';

export type FormElementsType = {
    titleForm: TitleForm;
    inputName: Name;
    inputMail: Mail;
    inputSurname: Surname;
    inputPassword: Password;
    buttonSubmit: Button;
};

export type FormElementsAddresType = {
    inputCountry: Country;
    inputCity: City;
    inputStreet: Street;
    inputHouse: House;
    inputPostal: Postal;
    inputAddressType: AddressType;
};
