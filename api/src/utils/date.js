export function getTimestampFromDate(date) {
  return Math.floor(date.getTime() / 1000);
}

export function getTimestampFromDateString(dateString) {
  return getTimestampFromDate(new Date(dateString));
}

export function getCurrentTimestamp() {
  return getTimestampFromDate(new Date());
}

export function formatTimestamp(timestamp) {
  return getTimestampFromDate(new Date(timestamp));
}

export function getDateStringFromDate(date) {
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return `${date.getFullYear()}-${month}-${day}`;
}

export function getDateStringFromMoment(date) {
  return date.format('YYYY-MM-DD');
}

export function getMonthStringFromMoment(date) {
  return date.format('YYYY-MM');
}

export function getCurrentDateString() {
  return getDateStringFromDate(new Date());
}
