import { describe, expect, test } from '@jest/globals';
import { NavList } from './NavList';

describe('NavList', () => {
    test('should match', () => {
        const list = new NavList();
        const renderedNavList = list.getElement();
        expect(renderedNavList.outerHTML).toMatchSnapshot();
    });
});
