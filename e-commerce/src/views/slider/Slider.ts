import { View } from '../View';
import { ImgSlider } from './imgSlider/ImgSlider';
import { LinkPrev } from '../slidesShow/linkPrev/LinkPrev';
import { LinkNext } from '../slidesShow/linkNext/LinkNext';
import './Slider.scss';

export class Slider extends View {
    constructor() {
        super({ tag: 'div', classNames: ['mySlides', 'fade'] });
        this.setupSlider();
    }

    setupSlider() {
        const currentImg = new ImgSlider().getElement();
        this.viewHtmlElement.addInnerElement(currentImg);

        const prev = new LinkPrev().getElement();
        this.viewHtmlElement.addInnerElement(prev);

        const next = new LinkNext().getElement();
        this.viewHtmlElement.addInnerElement(next);
    }
}
