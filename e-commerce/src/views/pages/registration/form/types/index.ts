import { Button } from '../../../../button/Button';
import { Mail } from '../inputMail/InputMail';
import { Name } from '../inputName/InputName';
import { Surname } from '../inputSurname/InputSurname';
import { Password } from '../password/Password';

export type FormElementsType = {
    inputName: Name;
    inputMail: Mail;
    inputSurname: Surname;
    inputPassword: Password;
    buttonSubmit: Button;
};
