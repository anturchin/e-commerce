import { CheckboxFilter } from '../checkboxFilter/CheckboxFilter';
import { RadioFilter } from '../radioFilter/RadioFilter';
import { TitleFilter } from '../titleFilter/TitleFilter';

export type FormElemetFilters = {
    checkboxFilter: CheckboxFilter;
    radioFilter: RadioFilter;
    title: TitleFilter;
};
