import { describe, expect, test } from '@jest/globals';
import { NavItem } from './NavItem';

describe('NavItem', () => {
    test('should match', () => {
        const navItem = new NavItem('item');
        const renderedNavItem = navItem.getElement();
        expect(renderedNavItem.outerHTML).toMatchSnapshot();
    });
});
