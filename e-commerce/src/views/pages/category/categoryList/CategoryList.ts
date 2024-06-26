import { View } from '../../../View';
import { ICategoryProps } from '../Category';
import { CategoryItem } from '../categoryItem/CategoryItem';
import './CategoryList.scss';

export class CategoryList extends View {
    private categoryItems: CategoryItem[] = [];

    constructor(props: ICategoryProps[]) {
        super({ tag: 'ul', classNames: ['category__nav-list'] });
        this.setupCategoryList(props);
    }

    public getCategoryItems(): CategoryItem[] {
        return this.categoryItems;
    }

    private setupCategoryList(props: ICategoryProps[]): void {
        props.forEach((item) => {
            const categoryItem = new CategoryItem(item);
            this.categoryItems.push(categoryItem);
        });
        this.getElement().append(
            ...this.categoryItems.map((item) => {
                return item.getElement();
            })
        );
    }
}
