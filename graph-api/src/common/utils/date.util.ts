import moment from 'moment-timezone';

export function getTimestampFromDate(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

export function getTimestampFromDateString(dateString: string): number {
  return getTimestampFromDate(new Date(dateString));
}

export function getCurrentTimestamp(): number {
  return getTimestampFromDate(new Date());
}

export function formatTimestamp(timestamp: number) {
  return getTimestampFromDate(new Date(timestamp));
}

export function getDateStringFromDate(date: Date): string {
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

export function getDateStringFromMoment(date: moment.Moment) {
  return date.format('YYYY-MM-DD');
}

export function getMonthStringFromMoment(date: moment.Moment) {
  return date.format('YYYY-MM');
}

export function getCurrentDateString(): string {
  return getDateStringFromDate(new Date());
}
