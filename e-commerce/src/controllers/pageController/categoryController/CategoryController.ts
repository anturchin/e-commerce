import { Category } from '../../../views/pages/category/Category';
import { IController } from '../PageController.interface';
import { CategoryService } from '../../../services/CategoryService/CategoryService';
import { IResult } from '../../../services/CategoryService/types';
import { LocalStorageManager } from '../../../utils/localStorageManager/LocalStorageManager';
import { Router } from '../../../router/Router';
import { Publisher } from '../../../observers/Publisher';
import { RoutePath } from '../../../router/types';

interface ICategoryProps {
    url: string;
    title: string;
    categoryName: string;
}

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

    private authPublisher: Publisher<boolean>;

    constructor(router: Router | null, authPublisher: Publisher<boolean>) {
        this.router = router;
        this.authPublisher = authPublisher;
        this.loadDAta();
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }

    async loadDAta() {
        const token = LocalStorageManager.getToken();
        if (token) {
            const response = await CategoryService.getCategoryList(token);
            if ('results' in response) {
                this.categories = response.results;
                const props: ICategoryProps[] = this.setupProps();
                this.page.renderCategoryList(props);
                this.eventHandler();
            }
        }
    }

    setupProps(): ICategoryProps[] {
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

    eventHandler() {
        const categoryListElement = this.page.getCategoryList()?.getElement();

        if (!categoryListElement) {
            console.error('Category list element not found!');
            return;
        }

        Array.prototype.forEach.call(categoryListElement.children, (child, index) => {
            child.addEventListener('click', () => {
                const child = categoryListElement.children[index];
                if (child) {
                    console.log(this.categories[index].id);
                    if (index === 0) {
                        // path to phone
                        const productType = 'phone';
                        this.router?.navigate(<RoutePath>`${RoutePath.PRODUCT}/${productType}`);
                    }
                    if (index === 1) {
                        // path to laptops
                        const productType = 'laptop';
                        this.router?.navigate(<RoutePath>`${RoutePath.PRODUCT}/${productType}`);
                    }
                    if (index === 2) {
                        // path to watch
                        const productType = 'watch';
                        this.router?.navigate(<RoutePath>`${RoutePath.PRODUCT}/${productType}`);
                    }
                    if (index === 3) {
                        // path to tablet
                        const productType = 'tablet';
                        this.router?.navigate(<RoutePath>`${RoutePath.PRODUCT}/${productType}`);
                    }
                }
            });
        });
    }
}
