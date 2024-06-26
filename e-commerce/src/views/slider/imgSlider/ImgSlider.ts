import { View } from '../../View';
import './ImgSlider.scss';

export class ImgSlider extends View {
    constructor() {
        super({ tag: 'img', classNames: ['slider__img'] });
    }
}
