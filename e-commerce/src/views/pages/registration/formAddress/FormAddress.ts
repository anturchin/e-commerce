import { View } from '../../../View';
import { Country } from './inputCountry/InputCountry';
import { City } from './inputCity/InputCity';
import { Street } from './inputNameStr/InputNameStr';
import { House } from './inputNumberStr/InputNumberStr';
import { Postal } from './inputPostal/InputPostal';
import { FormElementsAddresType } from '../form/types';

import './FormAddress.scss';

export class FormAddress extends View {
    private inputCountry: Country | null = null;

    private inputCity: City | null = null;

    private inputStreet: Street | null = null;

    private inputHouse: House | null = null;

    private inputPostal: Postal | null = null;

    constructor() {
        super({ tag: 'form', classNames: ['form'] });
        this.setupForm();
    }

    public getFormElements(): FormElementsAddresType | null {
        if (
            this.inputCountry &&
            this.inputCity &&
            this.inputStreet &&
            this.inputHouse &&
            this.inputPostal
        ) {
            return {
                inputCountry: this.inputCountry,
                inputCity: this.inputCity,
                inputStreet: this.inputStreet,
                inputHouse: this.inputHouse,
                inputPostal: this.inputPostal,
            };
        }
        return null;
    }

    private setupForm(): void {
        this.inputCountry = new Country({
            type: 'select',
            label: 'Choose country',
            required: false,
            option: ['Russia', 'USA'],
        });
        this.viewHtmlElement.addInnerElement(this.inputCountry.getElement());

        this.inputCity = new City({
            type: 'text',
            label: 'City',
            required: false,
        });
        this.viewHtmlElement.addInnerElement(this.inputCity.getElement());

        this.inputStreet = new Street({
            type: 'text',
            label: 'Street',
            required: false,
        });
        this.viewHtmlElement.addInnerElement(this.inputStreet.getElement());

        this.inputHouse = new House({
            type: 'text',
            label: 'House',
            required: false,
        });
        this.viewHtmlElement.addInnerElement(this.inputHouse.getElement());

        this.inputPostal = new Postal({
            type: 'text',
            label: 'Postal',
            required: false,
        });
        this.viewHtmlElement.addInnerElement(this.inputPostal.getElement());
    }
}
