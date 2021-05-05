// Source: https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type

export default function isFunction(fn) {
  if (!fn) {
    return false;
  }
  return {}.toString.call(fn) === '[object Function]';
}
