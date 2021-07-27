export const getCardType = cardType => cardTypeMap[cardType];

export const getSupportedCardTypes = () => ['savingsAccount', 'chequingAccount', 'lineOfCredit', 'creditCard'];

const cardTypeMap = {
  chequingAccount: {
    id: 'chequingAccount',
    name: 'Chequing Account',
  },
  creditCard: {
    id: 'creditCard',
    name: 'Credit Card',
  },
  cryptoWallet: {
    id: 'cryptoWallet',
    name: 'Crypto Wallet',
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
