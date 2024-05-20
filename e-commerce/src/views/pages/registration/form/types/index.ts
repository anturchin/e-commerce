import { Button } from '../../../../button/Button';
import { Mail } from '../inputMail/InputMail';
import { Name } from '../inputName/InputName';
import { Surname } from '../inputSurname/InputSurname';
import { Password } from '../password/Password';
import { TitleForm } from '../titleForm/TitleForm';


export type FormElementsType = {
    titleForm: TitleForm;
    inputName: Name;
    inputMail: Mail;
    inputSurname: Surname;
    inputPassword: Password;
    buttonSubmit: Button;
};
