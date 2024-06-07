import { ProductType } from '../../../router/types';
import { Products } from '../../../views/pages/products/Products';
import { IController } from '../PageController.interface';
import { ICards } from './types';
import { LocalStorageManager } from '../../../utils/localStorageManager/LocalStorageManager';
import { CategoryService } from '../../../services/CategoryService/CategoryService';
import { FilterService } from '../../../services/FilteringService/FilterService';
import { IProduct } from '../../../services/FilteringService/types';

const productTypes: string[] = ['phone', 'laptop', 'watch', 'tablet'];

export class ProductController implements IController {
    private page: Products = new Products();

    private readonly productType: ProductType;

    private productIndex: number;

    private products: IProduct[] = [];

    constructor(productType: ProductType) {
        this.loadData();
        console.log('productController', productType);
        this.productType = productType;
        this.productIndex = productTypes.findIndex((e) => e === (this.productType as string));
    }

    public getElement(): HTMLElement {
        return this.page.getElement();
    }

    private async loadData(): Promise<void> {
        const token = LocalStorageManager.getToken();
        if (token) {
            const categories = await CategoryService.getCategoryList(token);
            if ('results' in categories) {
                const categoryParam = `masterData(current(categories(id="${categories.results[this.productIndex].id}")))`;
                const resp = await FilterService.getFilteredList(token, categoryParam);
                if ('results' in resp) {
                    this.products = resp.results;
                    const props: ICards[] = this.getProps();
                    this.page.renderProductList(props);
                    this.eventHandler();
                }
            }
        }
    }

    private getProps(): ICards[] {
        console.log(this.products);
        return this.products.map((product) => {
            const price =
                `${product.masterData.current.masterVariant.prices[0]?.value.centAmount ?? '000'}`.slice(
                    0,
                    -2
                );
            return {
                url: product.masterData.current.masterVariant.images[0]?.url || '',
                name: product.masterData.current.name.ru,
                description: product.masterData.current.metaDescription.ru,
                price: `${price}$`,
                sale: `${Math.round(Number(price) * 0.8)}$`,
                id: product.id,
            };
        });
    }

    private eventHandler(): void {
        const productListElement = this.page.getWrapperList()?.getElement();

        if (!productListElement) {
            console.error('Category list element not found!');
            return;
        }

        productListElement.addEventListener('click', this.onClickHandler.bind(this));
    }

    private onClickHandler(event: Event) {
        const item = (event.target as HTMLElement).closest('.product__card') as HTMLElement;
        if (!item) return;
        if ((event.target as HTMLElement).tagName === 'button') return;
        const dataAttribute = item.getAttribute('id');
        if (dataAttribute) {
            console.log(dataAttribute);
        }
    }
}
