import { View } from '../../../View';
import { ICategoryProps } from '../Category';
import './CategoryItem.scss';

export class CategoryItem extends View {
    constructor(props: ICategoryProps) {
        super({
            tag: 'li',
            classNames: ['category__nav-list_item'],
            textContent: props.title,
        });
        this.setupCategoryItem(props);
        this.createImg(props);
    }

    private setupCategoryItem(props: ICategoryProps): void {
        const item = this.viewHtmlElement.getElement();
        item.dataset.categoryItem = props.categoryName;

        const categoryImg = this.viewHtmlElement.getElement();
        categoryImg.setAttribute('src', props.url);
    }

    private createImg(props: ICategoryProps): void {
        const img = document.createElement('img');
        img.classList.add('li__img-category');
        img.src = props.url;
        this.viewHtmlElement.addInnerElement(img);
    }
}
