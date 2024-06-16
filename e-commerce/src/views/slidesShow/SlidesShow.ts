import { View } from '../View';
import { SliesItem } from './slidesItem/SlidesItem';
import { LinkPrev } from './linkPrev/LinkPrev';
import { LinkNext } from './linkNext/LinkNext';

export class SlidesShow extends View {
    private items: SliesItem[] = [];

    private slideIndex: number = 1;

    constructor(urls: string[]) {
        super({ tag: 'div', classNames: ['mySlides', 'fade'] });
        this.setupSlidesShow(urls);
        this.showSlides(this.slideIndex);
    }

    private setupSlidesShow(urls: string[]): void {
        this.items = urls.map((url) => new SliesItem(url));
        this.getElement().append(...this.items.map((item) => item.getElement()));

        const prevBtn = new LinkPrev().getElement();
        const nextBtn = new LinkNext().getElement();

        prevBtn.addEventListener('click', () => this.plusSlides(-1));
        nextBtn.addEventListener('click', () => this.plusSlides(1));

        this.getElement().append(prevBtn, nextBtn);
    }

    plusSlides(n: number) {
        this.showSlides((this.slideIndex += n));
    }

    currentSlide(n: number) {
        this.showSlides((this.slideIndex = n));
    }

    showSlides(n: number) {
        if (n > this.items.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.items.length;
        }
        this.items.forEach((item) => {
            const element = item.getElement();
            element.style.display = 'none';
        });
        this.items[this.slideIndex - 1].getElement().style.display = 'block';
    }
}
