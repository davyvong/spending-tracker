import moment from 'moment-timezone';

export default function buildTransactionSectionMap(transactionSet, transactionMap) {
  const transactionSectionMap = Array.from(transactionSet).reduce((map, id) => {
    const item = transactionMap[id];
    if (!item) {
      return map;
    }
    const { postDate } = item;
    const section = moment(postDate, 'YYYY-MM-DD').isAfter(moment()) ? 'PENDING' : postDate;
    if (map[section]) {
      map[section].data.push(item);
    } else {
      map[section] = {
        data: [item],
        section,
      };
    }
    return map;
  }, {});
  return Object.values(transactionSectionMap);
}
