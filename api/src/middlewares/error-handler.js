import { isHttpError } from 'http-errors';
import snakeCase from 'lodash.snakecase';

const formatExpressError = error => {
  if (isHttpError(error)) {
    const code = snakeCase(error.name).toUpperCase();
    return {
      code: code.endsWith('_ERROR') ? code.slice(0, -6) : code,
      message: error.message,
    };
  }
  return {
    code: error.code,
    message: error.message,
  };
};

export const formatGraphQLError = error => formatExpressError(error.originalError);

export default () => (error, request, response, next) => {
  if (error) {
    response.status(500).json({ errors: [formatExpressError(error)] });
  }
  next();
};
