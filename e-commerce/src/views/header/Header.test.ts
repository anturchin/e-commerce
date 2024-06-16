import { describe, expect, test } from '@jest/globals';
import { Header } from './Header';

describe('Header', () => {
    test('should match', () => {
        const header = new Header();
        const renderedHeader = header.getElement();
        expect(renderedHeader.outerHTML).toMatchSnapshot();
    });
});
