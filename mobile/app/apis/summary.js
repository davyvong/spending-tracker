import { getApolloClient } from 'graphql/client';
import * as summaryQueries from 'graphql/queries/summary';
import moment from 'moment-timezone';

export const getCardSpending = (cardId, month) =>
  getApolloClient().query({
    query: summaryQueries.getCardSpending,
    variables: {
      cardId,
      month: month || moment().format('YYYY-MM'),
    },
  });

export const getDailySpending = () =>
  getApolloClient().query({
    query: summaryQueries.getDailySpending,
  });

export const getMonthlySpending = month =>
  getApolloClient().query({
    query: summaryQueries.getMonthlySpending,
    variables: {
      month: month || moment().format('YYYY-MM'),
    },
  });
