import { Button } from '../../../../button/Button';
import { InputLogin } from '../inputLogin/InputLogin';
import { Password } from '../inputPassword/InputPassword';
import { Box } from '../inputbox/Inputbox';

export type FormLoginElementsType = {
    inputLogin: InputLogin;
    inputPassword: Password;
    inputBox: Box;
    buttonSubmit: Button;
};
