import { Button } from '../../../../button/Button';
import { InputLogin } from '../inputLogin/InputLogin';
import { Password } from '../inputPassword/InputPassword';
import { Box } from '../inputbox/Inputbox';
import { Title } from '../title/Title';
import { SubTitle } from '../inputbox/subtitle/Subtitle';

export type FormLoginElementsType = {
    title: Title;
    inputLogin: InputLogin;
    inputPassword: Password;
    inputBox: Box;
    subtitle: SubTitle;
    buttonSubmit: Button;
};
