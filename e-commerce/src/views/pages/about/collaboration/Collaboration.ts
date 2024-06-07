import { View } from '../../../View';
import { Title } from './title/Ttile';
import { ImgColab } from './imgColab/ImgColab';
import { Container } from './container/Container';
import { ContentText } from './contentText/ContentText';
import './Collaboration.scss';

export class Collaboration extends View {
    constructor() {
        super({ tag: 'section', classNames: ['collabaration'] });
        this.setContent();
    }

    setContent() {
        const titleContent = new Title().getElement();
        this.viewHtmlElement.addInnerElement(titleContent);

        const div = new Container().getElement();
        const img = new ImgColab().getElement();
        const contentText = new ContentText().getElement();
        div.append(contentText, img);

        this.viewHtmlElement.addInnerElement(div);
    }
}
