import produce from 'immer';
import { persistCache } from 'storage/cache';
import isFunction from 'utils/is-function';

const reducer = (state, payload) =>
  produce(state, draft => {
    Object.assign(draft, isFunction(payload) ? payload(draft) : payload);
    persistCache(draft);
    return draft;
  });

export default reducer;
