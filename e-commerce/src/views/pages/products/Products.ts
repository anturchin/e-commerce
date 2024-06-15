import { View } from '../../View';
import { CardList } from './cardList/CardList';
import './Products.scss';
import { LocalStorageManager } from '../../../utils/localStorageManager/LocalStorageManager';

export interface ICards {
    url: string;
    name: string;
    description: string;
    price: string;
    sale: string;
    id: string;
}

export class Products extends View {
    private productList: CardList | null = null;

    private currentPage: number = 1;

    private itemsPage: number = 6;

    private allProduct: ICards[] = [];

    constructor() {
        super({ tag: 'section', classNames: ['products'] });
    }

    public renderProductList(props: ICards[]) {
        this.allProduct = props;
        this.createControls();
        this.renderCurrentPage();
    }

    public renderCurrentPage() {
        const start = (this.currentPage - 1) * this.itemsPage;
        const end = start + this.itemsPage;
        const currentItems = this.allProduct.slice(start, end);

        if (this.productList) {
            this.productList.getElement().innerHTML = '';
        }

        this.productList = new CardList(currentItems);
        this.viewHtmlElement.addInnerElement(this.productList.getElement());
        this.disableBtns();
    }

    public updateCurrentPage() {
        const start = (this.currentPage - 1) * this.itemsPage;
        const end = start + this.itemsPage;
        const currentItems = this.allProduct.slice(start, end);

        if (this.productList) {
            this.productList.getElement().innerHTML = '';
        }

        this.productList?.setupCardList(currentItems);
        this.disableBtns();
    }

    public createControls() {
        const paginationControls = document.createElement('div');
        paginationControls.classList.add('pagination-controls');

        const prevBtn = document.createElement('button');
        prevBtn.classList.add('pagination__btn');
        prevBtn.textContent = 'Previous';
        prevBtn.disabled = this.currentPage === 1;
        prevBtn.onclick = () => {
            this.prevPage();
            this.updateControls(paginationControls);
        };

        const nextBtn = document.createElement('button');
        nextBtn.classList.add('pagination__btn');
        nextBtn.textContent = 'Next';
        nextBtn.disabled = this.currentPage * this.itemsPage >= this.allProduct.length;
        nextBtn.onclick = () => {
            this.nextPage();
            this.updateControls(paginationControls);
        };

        const pageInput = document.createElement('input');
        pageInput.classList.add('pagination__input');
        pageInput.type = 'number';
        pageInput.min = '1';
        pageInput.max = `${Math.ceil(this.allProduct.length / this.itemsPage)}`;
        pageInput.value = `${this.currentPage}`;
        pageInput.onchange = () => {
            const page = parseInt(pageInput.value, 10);
            this.goToPage(page);
            this.updateControls(paginationControls);
        };

        paginationControls.append(prevBtn);
        paginationControls.append(pageInput);
        paginationControls.append(nextBtn);

        this.viewHtmlElement.addInnerElement(paginationControls);
    }

    public updateControls(paginationControls: HTMLElement) {
        const prevButton = paginationControls.querySelector(
            'button:first-of-type'
        ) as HTMLButtonElement;
        const nextButton = paginationControls.querySelector(
            'button:last-of-type'
        ) as HTMLButtonElement;
        const pageInput = paginationControls.querySelector('input') as HTMLInputElement;

        prevButton.disabled = this.currentPage === 1;
        nextButton.disabled = this.currentPage * this.itemsPage >= this.allProduct.length;
        pageInput.value = `${this.currentPage}`;
    }

    public getWrapperList(): CardList | null {
        return this.productList;
    }

    public nextPage() {
        if (this.currentPage * this.itemsPage < this.allProduct.length) {
            this.currentPage += 1;
            this.updateCurrentPage();
        }
    }

    public prevPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            this.updateCurrentPage();
        }
    }

    public goToPage(page: number) {
        if (page > 0 && page <= Math.ceil(this.allProduct.length / this.itemsPage)) {
            this.currentPage = page;
            this.updateCurrentPage();
        }
    }

    private disableBtns(): void {
        const removeBtns = document.getElementsByClassName('custom-button');
        for (let i = 1; i < removeBtns.length; i += 2) {
            (removeBtns[i] as HTMLButtonElement).disabled = true;
        }
        const productsJSON = LocalStorageManager.getProduct();
        if (productsJSON) {
            const products = JSON.parse(productsJSON);
            products.forEach((prod: string) => {
                const elem = document.getElementById(prod) as HTMLElement;
                if (elem) {
                    const addBtn = elem.getElementsByClassName(
                        'custom-button'
                    )[0] as HTMLButtonElement;
                    const removeBtn = elem.getElementsByClassName(
                        'custom-button'
                    )[1] as HTMLButtonElement;
                    if (addBtn && removeBtn) {
                        this.disableOrActivateBtns(addBtn, removeBtn);
                    }
                }
            });
        }
    }

    public disableOrActivateBtns(
        btnToDisable: HTMLButtonElement,
        btnToActivate: HTMLButtonElement
    ): void {
        const disable = btnToDisable;
        const activate = btnToActivate;
        disable.disabled = true;
        activate.disabled = false;
    }
}
