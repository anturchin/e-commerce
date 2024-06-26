import { describe, expect, test } from '@jest/globals';
import { SlidesShow } from './SlidesShow';

describe('SlidesShow', () => {
    test('should match', () => {
        const slidesShow = new SlidesShow(['url1', 'url2']);
        const renderedSlidesShow = slidesShow.getElement();
        expect(renderedSlidesShow.outerHTML).toMatchSnapshot();
    });
});
