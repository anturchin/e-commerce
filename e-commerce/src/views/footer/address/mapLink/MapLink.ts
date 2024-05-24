import { View } from '../../../View';
import './MapLink.scss';

export class MapLink extends View {
    constructor() {
        super({ tag: 'a', classNames: ['footer__link'], textContent: 'Location' });
        this.setLink();
    }

    private setLink(): void {
        const footerLinks = this.viewHtmlElement.getElement();
        footerLinks.setAttribute(
            'href',
            'https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%96%D1%83%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE,+%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3,+191014/@59.9323888,30.3497675,13.57z/data=!4m15!1m8!3m7!1s0x469631a3db450ec9:0x3aad5b4a38113633!2z0YPQuy4g0JbRg9C60L7QstGB0LrQvtCz0L4sINCh0LDQvdC60YIt0J_QtdGC0LXRgNCx0YPRgNCzLCAxOTEwMTQ!3b1!8m2!3d59.935874!4d30.3558349!16s%2Fg%2F122pwsld!3m5!1s0x469631a3db450ec9:0x3aad5b4a38113633!8m2!3d59.935874!4d30.3558349!16s%2Fg%2F122pwsld?entry=ttu'
        );
    }
}
