// Source: https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type

export default callback => {
  if (!callback) {
    return false;
  }
  return {}.toString.call(callback) === '[object Function]';
};
