/**
 * Ellipsis a address
 * For Example, address = '0xe62278ac258bda2ae6e8EcA32d01d4cB3B631257', showLength = 6, return '0xe622...631257'
 * @param {*} address, an address
 * @param {*} showLength, the length of shown characters at the start and the end
 */
const ellipsisAddress = (address, showLength = 8) => {
  if (!address) {
    return '';
  }
  const { length } = address;
  if (length <= showLength * 2) {
    return address;
  }
  return `${address.slice(0, showLength)}...${address.slice(
    length - showLength,
    length
  )}`;
};

// Format unit to OAK number
const unitToNumber = (unit) => {
  const arrs = unit.split(' ');
  let magnification = 1;
  if (arrs[1] === 'kUnit') {
    magnification = 1000;
  } else if (arrs[1] === 'mUnit') {
    magnification = 1000000;
  }
  return Number(arrs[0]) * magnification;
}

module.exports = {
  ellipsisAddress,
  unitToNumber,
};
