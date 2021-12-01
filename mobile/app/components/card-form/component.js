import RadioPickerInput from 'components/radio-picker-input';
import TextInput from 'components/text-input';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const CardFormComponent = ({ cardTypeOptions, editable, errors, updateValue, values }) => {
  const [locale] = useLocale();

  return (
    <Fragment>
      <TextInput
        editable={editable}
        error={errors.name && locale.t(errors.name)}
        label={locale.t('components.card-form.labels.name')}
        onChange={updateValue('name')}
        value={values.name}
      />
      <TextInput
        editable={editable}
        error={errors.company && locale.t(errors.company)}
        label={locale.t('components.card-form.labels.company')}
        onChange={updateValue('company')}
        value={values.company}
      />
      <RadioPickerInput
        editable={editable}
        error={errors.type && locale.t(errors.type)}
        label={locale.t('components.card-form.labels.type')}
        onChange={updateValue('type')}
        options={cardTypeOptions}
        value={values.type}
      />
    </Fragment>
  );
};

CardFormComponent.defaultProps = {
  editable: true,
};

CardFormComponent.propTypes = {
  cardTypeOptions: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  editable: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default CardFormComponent;
