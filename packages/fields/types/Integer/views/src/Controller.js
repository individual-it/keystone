import FieldController from '../../../../Controller';

export default class TextController extends FieldController {
  getFilterGraphQL = ({ type, value }) => {
    const key = type === 'is' ? `${this.path}` : `${this.path}_${type}`;
    return `${key}: ${value}`;
  };
  getFilterLabel = ({ label }) => {
    return `${this.label} ${label.toLowerCase()}`;
  };
  formatFilter = ({ label, value }) => {
    return `${this.getFilterLabel({ label })}: "${value}"`;
  };
  getValue = data => {
    const value = data[this.config.path];
    if (typeof value === 'number') {
      return value;
    } else if (typeof value === 'string' && value.length > 0) {
      // The field component enforces numeric values
      return parseInt(value);
    } else {
      // if it is not a String or a Number then the field must be empty
      return null;
    }
  };
  getFilterTypes = () => [
    {
      type: 'is',
      label: 'Is exactly',
      getInitialValue: () => '',
    },
    {
      type: 'not',
      label: 'Is not exactly',
      getInitialValue: () => '',
    },
    {
      type: 'gt',
      label: 'Is greater than',
      getInitialValue: () => '',
    },
    {
      type: 'lt',
      label: 'Is less than',
      getInitialValue: () => '',
    },
    {
      type: 'gte',
      label: 'Is greater than or equal to',
      getInitialValue: () => '',
    },
    {
      type: 'lte',
      label: 'Is less than or equal to',
      getInitialValue: () => '',
    },
    // QUESTION: should we support "in" and "not_in" filters for Integer?
    // What does the UI look like for that.
  ];
}