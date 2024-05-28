import { View } from '../../View';
import { CategoryList } from './categoryList/CategoryList';

import './Category.scss';

export interface ICategoryProps {
    url: string;
    title: string;
    categoryName: string;
}

const categories: ICategoryProps[] = [
    {
        url: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/iphone-14-pro-max-colors.png',
        title: 'Iphone',
        categoryName: 'phone',
    },
    {
        url: 'https://www.mechta.kz/storage/description_images/1687344318_1.jpg',
        title: 'MacBook',
        categoryName: 'laptop',
    },
    {
        url: 'https://www.macworld.com/wp-content/uploads/2024/05/2024-ipad-family-5.jpg?quality=50&strip=all&w=1024',
        title: 'iPad',
        categoryName: 'watch',
    },
    {
        url: 'https://www.apple.com/newsroom/images/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/article/Apple-Watch-S9-hero-230912_Full-Bleed-Image.jpg.large.jpg',
        title: 'Watch',
        categoryName: 'phone',
    },
];

export class Category extends View {
    private categoryList: CategoryList;

    constructor(props: ICategoryProps[] = categories) {
        super({ tag: 'section', classNames: ['category'] });
        this.categoryList = new CategoryList(props);
        this.viewHtmlElement.addInnerElement(this.categoryList.getElement());
    }
}
