import CurrencyInput from 'components/currency-input';
import DateInput from 'components/date-input';
import RadioPickerInput from 'components/radio-picker-input';
import VendorAutoComplete from 'components/vendor-autocomplete';
import TextInput from 'components/text-input';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { currencyOptions, typeOptions } from './constants';

const TransactionFormComponent = ({ cardOptions, categoryOptions, editable, errors, updateValue, values }) => {
  const [locale] = useLocale();

  return (
    <Fragment>
      <RadioPickerInput
        editable={editable}
        error={errors.cardId && locale.t(errors.cardId)}
        label={locale.t('components.transaction-form.labels.card')}
        onChange={updateValue('cardId')}
        options={cardOptions}
        value={values.cardId}
      />
      <DateInput
        editable={editable}
        error={errors.postDate && locale.t(errors.postDate)}
        format="MMMM D, YYYY"
        label={locale.t('components.transaction-form.labels.date')}
        onChange={updateValue('postDate')}
        value={values.postDate}
      />
      <VendorAutoComplete
        editable={editable}
        error={errors.vendor && locale.t(errors.vendor)}
        label={locale.t('components.transaction-form.labels.vendor')}
        onChange={updateValue('vendor')}
        value={values.vendor}
      />
      <TextInput
        editable={editable}
        label={locale.t('components.transaction-form.labels.description')}
        onChangeText={updateValue('description')}
        value={values.description}
      />
      <CurrencyInput
        currencies={currencyOptions}
        editable={editable}
        error={errors.amount && locale.t(errors.amount)}
        label={locale.t('components.transaction-form.labels.amount')}
        onChangeAmount={updateValue('amount')}
        onChangeCurrency={updateValue('currencyCode')}
        valueAmount={values.amount}
        valueCurrency={values.currencyCode}
      />
      <RadioPickerInput
        editable={editable}
        error={errors.categoryId && locale.t(errors.categoryId)}
        label={locale.t('components.transaction-form.labels.category')}
        onChange={updateValue('categoryId')}
        options={categoryOptions}
        value={values.categoryId}
      />
      <RadioPickerInput
        editable={editable}
        error={errors.type && locale.t(errors.type)}
        label={locale.t('components.transaction-form.labels.type')}
        onChange={updateValue('type')}
        options={typeOptions}
        value={values.type}
      />
    </Fragment>
  );
};

TransactionFormComponent.defaultProps = {
  editable: true,
};

TransactionFormComponent.propTypes = {
  cardOptions: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  categoryOptions: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  editable: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default TransactionFormComponent;
