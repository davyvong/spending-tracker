export function getTimestampFromDate(date) {
  return Math.floor(date.getTime() / 1000);
}

export function getTimestampFromDateString(dateString) {
  return getTimestampFromDate(new Date(dateString));
}

export function getCurrentTimestamp() {
  return getTimestampFromDate(new Date());
}

export function getDateStringFromMoment(date) {
  return date.format('YYYY-MM-DD');
}

export function getMonthStringFromMoment(date) {
  return date.format('YYYY-MM');
}
