import { View } from '../../../../View';
import './BtnCount.scss';

export class BtnCount extends View {
    private inputElement: HTMLInputElement;

    private plusButton: HTMLButtonElement;

    private minusButton: HTMLButtonElement;

    constructor(initialValue: number, min: number = 0, max: number = 100) {
        super({ tag: 'div', classNames: ['quantity-input__container'] });

        this.inputElement = document.createElement('input');
        this.plusButton = document.createElement('button');
        this.minusButton = document.createElement('button');

        this.setupInput(initialValue, min, max);
        this.setupBtns();
    }

    setupInput(initialValue: number, min: number, max: number) {
        this.inputElement.classList.add('quantity-input');
        this.inputElement.type = 'number';
        this.inputElement.min = `${min}`;
        this.inputElement.max = `${max}`;
        this.inputElement.value = `${initialValue}`;

        this.inputElement.onchange = () => {
            const quantity = parseInt(this.inputElement.value, 10);
            console.log(`Количество: ${quantity}`);
        };
    }

    setupBtns() {
        this.plusButton.innerText = '+';
        this.plusButton.classList.add('quantity-btn');
        this.plusButton.id = 'quantity-btn-plus';
        this.plusButton.addEventListener('click', () => this.changeQuantity(1));

        this.minusButton.innerText = '-';
        this.minusButton.classList.add('quantity-btn');
        this.minusButton.id = 'quantity-btn-minus';
        this.minusButton.addEventListener('click', () => this.changeQuantity(-1));

        this.viewHtmlElement.addInnerElement(this.minusButton);
        this.viewHtmlElement.addInnerElement(this.inputElement);
        this.viewHtmlElement.addInnerElement(this.plusButton);
    }

    changeQuantity(change: number) {
        let quantity = parseInt(this.inputElement.value, 10) + change;
        const min = parseInt(this.inputElement.min, 10);
        const max = parseInt(this.inputElement.max, 10);

        if (quantity < min) quantity = min;
        if (quantity > max) quantity = max;
        this.inputElement.value = `${quantity}`;
    }
}
