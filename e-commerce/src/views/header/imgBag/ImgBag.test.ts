import { describe, expect, test } from '@jest/globals';
import { SvgBag } from './ImgBag';

describe('ImgBag', () => {
    test('should match', () => {
        const imgBag = new SvgBag();
        const renderedSvgBag = imgBag.getElement();
        expect(renderedSvgBag.outerHTML).toMatchSnapshot();
    });
});
