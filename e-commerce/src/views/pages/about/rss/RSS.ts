import { View } from '../../../View';
import { TitleRSS } from './titleRSS/TitleRSS';
import { ContainerRSS } from './container/Container';
import { ContainerText } from './divText/DivText';
import { ContentRSS } from './contentRSS/ContetnRSS';
import { ImgRSS } from './imgRSS/ImgRSS';
import './RSS.scss';

export class RSS extends View {
    constructor() {
        super({ tag: 'section', classNames: ['section-RSS'] });
        this.setupRSS();
    }

    setupRSS() {
        const title = new TitleRSS().getElement();
        const div = new ContainerRSS().getElement();
        const divText = new ContainerText().getElement();
        const contentText = new ContentRSS().getElement();
        const img = new ImgRSS().getElement();

        divText.append(title, contentText);
        div.append(img, divText);
        this.viewHtmlElement.addInnerElement(div);
    }
}
