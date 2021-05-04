import { rule } from 'graphql-shield';
import { BadRequest, Unauthorized } from 'http-errors';
import moment from 'moment-timezone';

export const authenticated = rule()((parent, args, context) => {
  if (!context.accountId) {
    return new Unauthorized();
  }
  return true;
});

export const timezone = rule()((parent, args, context) => {
  if (!context.timezone || !moment.tz.zone(context.timezone)) {
    return new BadRequest();
  }
  return true;
});
