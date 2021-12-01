import { cardTypeOptions } from 'constants/cards';
import PropTypes from 'prop-types';
import React from 'react';

import CardFormComponent from './component';

const CardForm = ({ updateValue, values, ...props }) => (
  <CardFormComponent {...props} cardTypeOptions={cardTypeOptions} updateValue={updateValue} values={values} />
);

CardForm.defaultProps = {
  editable: true,
};

CardForm.propTypes = {
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    color: PropTypes.string,
    company: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default CardForm;
