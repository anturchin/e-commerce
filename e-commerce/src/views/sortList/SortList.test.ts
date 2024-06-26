import { describe, expect, test } from '@jest/globals';
import { FormSort } from './SortList';

describe('SortList', () => {
    test('should match', () => {
        const formSort = new FormSort();
        const renderedFormSort = formSort.getElement();
        expect(renderedFormSort.outerHTML).toMatchSnapshot();
    });
});
