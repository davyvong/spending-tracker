import clamp from 'lodash.clamp';
import get from 'lodash.get';

export const buildFindOptions = args => {
  const options = {
    limit: get(args, 'page.limit', 20),
    skip: get(args, 'page.skip', 0),
  };
  options.limit = clamp(options.limit, 1, 50);
  options.skip = clamp(options.skip, 0, 1000);
  return options;
};
