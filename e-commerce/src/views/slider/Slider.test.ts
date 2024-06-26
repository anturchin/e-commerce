import { describe, expect, test } from '@jest/globals';
import { Slider } from './Slider';

describe('Slider', () => {
    test('should match', () => {
        const slider = new Slider();
        const renderedSlider = slider.getElement();
        expect(renderedSlider.outerHTML).toMatchSnapshot();
    });
});
