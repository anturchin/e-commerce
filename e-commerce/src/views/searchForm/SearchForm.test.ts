import { describe, expect, test } from '@jest/globals';
import { SearchForm } from './SearchForm';

describe('SearchForm', () => {
    test('should match', () => {
        const form = new SearchForm();
        const renderedSearchForm = form.getElement();
        expect(renderedSearchForm.outerHTML).toMatchSnapshot();
    });
});
