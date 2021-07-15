import BigNumber from 'bignumber.js';

// const baseOptions = [
//   { power: 0, text: 'TEST', value: '-' },
//   { power: 3, text: 'Kilo', value: 'k' },
//   { power: 6, text: 'Mill', value: 'M' },
//   { power: 9, text: 'Bill', value: 'B' },
//   { power: 12, text: 'Tril', value: 'T' },
//   { power: 15, text: 'Peta', value: 'P' },
//   { power: 18, text: 'Exa', value: 'E' },
//   { power: 21, text: 'Zeta', value: 'Z' },
//   { power: 24, text: 'Yotta', value: 'Y' },
// ];

export const parseMoneyText = (text) => {
  const moneyText = text.replace(/,/g, '');
  var money = BigNumber(moneyText)
  var unit = BigNumber(1000000000000)

  const normalizedMoney = money.dividedBy(unit);
  return { value: normalizedMoney };
};
