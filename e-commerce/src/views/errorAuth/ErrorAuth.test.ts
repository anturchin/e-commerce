import { describe, expect, test } from '@jest/globals';
import { ErrorAuth } from './ErrorAuth';

describe('ErrorAuth', () => {
    test('should match', () => {
        const errorAuth = new ErrorAuth();
        const renderedErrorAuth = errorAuth.getElement();
        expect(renderedErrorAuth.outerHTML).toMatchSnapshot();
    });
});
