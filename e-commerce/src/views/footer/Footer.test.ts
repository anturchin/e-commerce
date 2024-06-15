import { describe, expect, test } from '@jest/globals';
import { Footer } from './Footer';

describe('Footer', () => {
    test('should match', () => {
        const footer = new Footer();
        const renderedFooter = footer.getElement();
        expect(renderedFooter.outerHTML).toMatchSnapshot();
    });
});
