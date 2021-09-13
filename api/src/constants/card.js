const cardTypeMap = {
  chequingAccount: {
    id: 'chequingAccount',
    name: 'Chequing Account',
  },
  creditCard: {
    id: 'creditCard',
    name: 'Credit Card',
  },
  lineOfCredit: {
    id: 'lineOfCredit',
    name: 'Line of Credit',
  },
  savingsAccount: {
    id: 'savingsAccount',
    name: 'Savings Account',
  },
};

export const cardTypeEnum = Object.keys(cardTypeMap);

export const getCardType = cardType => cardTypeMap[cardType];
