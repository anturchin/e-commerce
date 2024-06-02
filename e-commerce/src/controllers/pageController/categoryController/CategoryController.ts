import { Category } from '../../../views/pages/category/Category';
import { IController } from '../PageController.interface';
import { CategoryService } from '../../../services/CategoryService/CategoryService';
import { IResult } from '../../../services/CategoryService/types';
import { LocalStorageManager } from '../../../utils/localStorageManager/LocalStorageManager';
import { Router } from '../../../router/Router';
import { RoutePath } from '../../../router/types';
import { ICategoryProps, ProductType } from './types/CategoryTypes';

const urls: { name: string; url: string }[] = [
    {
        url: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/iphone-14-pro-max-colors.png',
        name: 'phone',
    },
    {
        url: 'https://www.mechta.kz/storage/description_images/1687344318_1.jpg',
        name: 'laptop',
    },
    {
        url: 'https://www.macworld.com/wp-content/uploads/2024/05/2024-ipad-family-5.jpg?quality=50&strip=all&w=1024',
        name: 'tablet',
    },
    {
        url: 'https://www.apple.com/newsroom/images/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/article/Apple-Watch-S9-hero-230912_Full-Bleed-Image.jpg.large.jpg',
        name: 'watch',
    },
];

export class CategoryController implements IController {
    private page: Category = new Category();

    private categories: IResult[] = [];

    private router: Router | null = null;

    constructor(router: Router | null) {
        this.router = router;
        this.loadDAta();
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }

    private async loadDAta(): Promise<void> {
        const token = LocalStorageManager.getToken();
        if (token) {
            const response = await CategoryService.getCategoryList(token);
            if ('results' in response) {
                this.categories = response.results;
                const props: ICategoryProps[] = this.getProps();
                this.page.renderCategoryList(props);
                this.eventHandler();
            }
        }
    }

    private getProps(): ICategoryProps[] {
        return this.categories.map((cat) => {
            const url = urls.find((i) => i.name === cat.name.ru);
            if (url) {
                return {
                    url: url.url,
                    title: cat.name.ru,
                    categoryName: cat.name.ru,
                };
            }
            return {
                url: '',
                title: cat.name.ru,
                categoryName: cat.name.ru,
            };
        });
    }

    private eventHandler(): void {
        const categoryListElement = this.page.getCategoryList()?.getElement();

        if (!categoryListElement) {
            console.error('Category list element not found!');
            return;
        }

        categoryListElement.addEventListener('click', this.onClickHandler.bind(this));
    }

    private onClickHandler(event: Event) {
        const item = (event.target as HTMLElement).closest('li') as HTMLElement;
        if (!item) return;
        const dataAttribute = item.getAttribute('data-category-item');
        if (dataAttribute && dataAttribute === ProductType.PHONE) {
            this.router?.navigate(<RoutePath>`${RoutePath.PRODUCT}/${ProductType.PHONE}`);
        }
        if (dataAttribute && dataAttribute === ProductType.LAPTOP) {
            this.router?.navigate(<RoutePath>`${RoutePath.PRODUCT}/${ProductType.LAPTOP}`);
        }
        if (dataAttribute && dataAttribute === ProductType.TABLET) {
            this.router?.navigate(<RoutePath>`${RoutePath.PRODUCT}/${ProductType.TABLET}`);
        }
        if (dataAttribute && dataAttribute === ProductType.WATCH) {
            this.router?.navigate(<RoutePath>`${RoutePath.PRODUCT}/${ProductType.WATCH}`);
        }
    }
}
