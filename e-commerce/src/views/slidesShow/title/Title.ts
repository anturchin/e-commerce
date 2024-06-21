import { View } from '../../View';
import './Title.scss';

export class TitleSlide extends View {
    constructor() {
        super({
            tag: 'H1',
            classNames: ['title-slide'],
            textContent: 'Discover the Latest Innovations in Technology',
        });
    }
}
