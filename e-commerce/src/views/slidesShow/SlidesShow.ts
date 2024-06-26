import { View } from '../View';
import { SliesItem } from './slidesItem/SlidesItem';
import { LinkPrev } from './linkPrev/LinkPrev';
import { LinkNext } from './linkNext/LinkNext';

import './SlidesShow.scss';

export class SlidesShow extends View {
    private items: SliesItem[] = [];

    private dots: HTMLElement[] = [];

    private slideIndex: number = 1;

    constructor(urls: string[]) {
        super({ tag: 'div', classNames: ['slideshow-container'] });
        this.setupSlidesShow(urls);
        this.showSlides(this.slideIndex);
    }

    private setupSlidesShow(urls: string[]): void {
        const slidesWrapper = document.createElement('div');
        slidesWrapper.classList.add('slides-wrapper');

        this.items = urls.map((url) => new SliesItem(url));

        const prevBtn = new LinkPrev().getElement();
        const nextBtn = new LinkNext().getElement();

        prevBtn.addEventListener('click', () => this.plusSlides(-1));
        nextBtn.addEventListener('click', () => this.plusSlides(1));

        this.getElement().append(prevBtn, slidesWrapper, nextBtn);

        const dotContainer = document.createElement('div');
        dotContainer.classList.add('dot-container');

        this.dots = this.items.map((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.currentSlide(index + 1));
            dotContainer.append(dot);
            return dot;
        });
        slidesWrapper.append(...this.items.map((item) => item.getElement()));
        slidesWrapper.append(dotContainer);
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
        this.items.forEach((item, i) => {
            const element = item.getElement();
            element.style.display = 'none';
            this.dots[i].classList.remove('active');
        });
        this.items[this.slideIndex - 1].getElement().style.display = 'block';
        this.dots[this.slideIndex - 1].classList.add('active');
    }
}
