export default errors => {
  if (Array.isArray(errors) && errors.length > 0) {
    const [error] = errors;
    throw error;
  }
};
