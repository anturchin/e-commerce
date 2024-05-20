import { View } from '../../../View';
import { Country } from './inputCountry/InputCountry';
import { City } from './inputCity/InputCity';
import { Street } from './inputNameStr/InputNameStr';
import { House } from './inputNumberStr/InputNumberStr';
import { Postal } from './inputPostal/InputPostal';
import { AddressType } from './inputAddressType/InputAddressType';
import { FormElementsAddresType } from '../form/types';

import './FormAddress.scss';

export class FormAddress extends View {
    private inputCountry: Country | null = null;

    private inputCity: City | null = null;

    private inputAddressType: AddressType | null = null;

    private inputStreet: Street | null = null;

    private inputHouse: House | null = null;

    private inputPostal: Postal | null = null;

    constructor() {
        super({ tag: 'form', classNames: ['form-address'] });
        this.setupForm();
    }

    public getFormElements(): FormElementsAddresType | null {
        if (
            this.inputCountry &&
            this.inputCity &&
            this.inputAddressType &&
            this.inputStreet &&
            this.inputHouse &&
            this.inputPostal
        ) {
            return {
                inputCountry: this.inputCountry,
                inputCity: this.inputCity,
                inputAddressType: this.inputAddressType,
                inputStreet: this.inputStreet,
                inputHouse: this.inputHouse,
                inputPostal: this.inputPostal,
            };
        }
        return null;
    }

    public toggleVisibility(): void {
        const formElement = this.getElement();
        formElement.classList.toggle('visible');
    }

    private setupForm(): void {
        this.inputCountry = new Country({
            label: 'Choose country',
            required: false,
            options: ['Russia', 'USA'],
        });
        this.viewHtmlElement.addInnerElement(this.inputCountry.getElement());

        this.inputCity = new City({
            type: 'text',
            label: 'City',
            required: false,
        });
        this.viewHtmlElement.addInnerElement(this.inputCity.getElement());

        this.inputAddressType = new AddressType({
            label: 'Address type',
            required: false,
            options: ['Billing', 'Shipping'],
        });
        this.viewHtmlElement.addInnerElement(this.inputAddressType.getElement());

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
