import useCache from 'hooks/cache';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import TransactionFormComponent from './component';

const TransactionForm = ({ values, ...props }) => {
  const [cache] = useCache();

  const cardOptions = useMemo(
    () =>
      Object.values(cache.cardsById)
        .sort((a, b) => {
          if (a.company === b.company) {
            return a.name > b.name;
          }
          return a.company > b.company;
        })
        .map(c => ({ label: `${c.company} ${c.name}`, value: c.id })),
    [cache.categoriesById],
  );

  const categoryOptions = useMemo(
    () =>
      Object.values(cache.categoriesById)
        .sort((a, b) => a.name > b.name)
        .map(c => ({ label: c.name, value: c.id })),
    [cache.categoriesById],
  );

  return (
    <TransactionFormComponent {...props} cardOptions={cardOptions} categoryOptions={categoryOptions} values={values} />
  );
};

TransactionForm.defaultProps = {
  editable: true,
};

TransactionForm.propTypes = {
  values: PropTypes.shape({
    categoryId: PropTypes.string,
  }).isRequired,
};

export default TransactionForm;
