import { View } from '../View';
import { NavList } from './navList/NavList';
import { SvgBag } from './imgBag/ImgBag';
import { Button } from '../button/Button';

import './Header.scss';

export class Header extends View {
    private navList: NavList | null = null;

    private imgBag: HTMLElement | null = null;

    private toggleButton: Button | null = null;

    constructor() {
        super({ tag: 'header', classNames: ['header'] });
        this.setupHeaderContent();
        this.setupToggleBtn();
        this.setupResizeListener();
        this.updateNavList();
    }

    public getNavList(): NavList | null {
        return this.navList;
    }

    public getImgBag(): HTMLElement | null {
        return this.imgBag;
    }

    private setupHeaderContent(): void {
        this.navList = new NavList();
        this.imgBag = new SvgBag().getElement();
        this.viewHtmlElement.addInnerElement(this.navList.getElement());
        this.viewHtmlElement.addInnerElement(this.imgBag);
    }

    private setupToggleBtn(): void {
        this.toggleButton = new Button({
            label: '☰',
            onClick: () => this.toggleNavList(),
        });
        this.viewHtmlElement.addInnerElement(this.toggleButton.getElement());
        this.updateBtnVisible();
    }

    private setupResizeListener(): void {
        window.addEventListener('resize', () => {
            this.updateBtnVisible();
            this.updateNavList();
        });
    }

    private updateBtnVisible(): void {
        const buttonElement = this.toggleButton?.getElement();
        if (buttonElement) {
            if (window.innerWidth <= 485) {
                buttonElement.style.display = 'block';
            } else {
                buttonElement.style.display = 'none';
            }
        }
    }

    private updateNavList(): void {
        const navListElement = this.navList?.getElement();
        if (navListElement) {
            navListElement.style.display = window.innerWidth <= 485 ? 'none' : 'flex';
        }
    }

    private toggleNavList(): void {
        if (this.navList) {
            const navElement = this.navList.getElement();
            navElement.style.display = navElement.style.display === 'none' ? 'flex' : 'none';
        }
    }
}
