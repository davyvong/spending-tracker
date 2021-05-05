// Source: https://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612

export default function typeOf(obj) {
  return Object.prototype.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}
