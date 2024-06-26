import { View } from '../../../../View';
import './ContentText.scss';

export class ContentText extends View {
    constructor() {
        super({
            tag: 'p',
            classNames: ['content-colab'],
            textContent:
                'We effectively managed the project, despite initial challenges. Things didnt go smoothly at first, but thanks to mutual support and teamwork, we were able to overcome all obstacles on the way to success. Each member of our team made a contribution: Fedor, responsible for the server side, demonstrated a high level of technical competence and the ability to adapt quickly to changes. Andrey, in turn, made a significant contribution to the architecture and code testing, ensuring the high quality of our product. Darya supported the team spirit and successfully tackled technical challenges related to the development of the user interface. Thanks to our unity and ability to work together, we achieved the set goal.',
        });
    }
}
