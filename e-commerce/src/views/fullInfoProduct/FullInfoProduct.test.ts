import { describe, expect, test } from '@jest/globals';
import { FullInfoProduct } from './FullInfoProduct';

describe('FullInfoProduct', () => {
    test('should match', () => {
        const fullInfoProduct = new FullInfoProduct(
            'productTitle',
            [''],
            'productDescription',
            'productPrice',
            'productSale'
        );
        const renderedFullInfoProduct = fullInfoProduct.getElement();
        expect(renderedFullInfoProduct.outerHTML).toMatchSnapshot();
    });
});
