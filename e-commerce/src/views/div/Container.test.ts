import { describe, expect, test } from '@jest/globals';
import { Container } from './Container';

describe('Container', () => {
    test('should match', () => {
        const container = new Container();
        const renderedContainer = container.getElement();
        expect(renderedContainer.outerHTML).toMatchSnapshot();
    });
});
