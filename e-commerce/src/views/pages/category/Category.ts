import { View } from '../../View';
import { CategoryList } from './categoryList/CategoryList';
import { TitleCategory } from './title/Title';

import './Category.scss';

export interface ICategoryProps {
    url: string;
    title: string;
    categoryName: string;
}

export class Category extends View {
    private categoryList: CategoryList | null = null;

    constructor() {
        super({ tag: 'section', classNames: ['category'] });
    }

    renderCategoryList(props: ICategoryProps[]) {
        const title = new TitleCategory().getElement();
        this.viewHtmlElement.addInnerElement(title);
        this.categoryList = new CategoryList(props);
        this.viewHtmlElement.addInnerElement(this.categoryList.getElement());
    }

    getCategoryList() {
        return this.categoryList;
    }
}
