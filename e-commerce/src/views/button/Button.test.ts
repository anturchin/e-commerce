import { describe, expect, test, jest } from '@jest/globals';
import { Button } from './Button';

describe('Button', () => {
    test('should match', () => {
        const onClickMock = jest.fn();
        const props = {
            label: 'Click Me',
            onClick: onClickMock,
            disabled: false,
        };

        const button = new Button(props);
        const renderedButton = button.getElement();
        expect(renderedButton.outerHTML).toMatchSnapshot();
    });
});
