"use strict";

/**
 * Ellipsis a address
 * For Example, address = '0xe62278ac258bda2ae6e8EcA32d01d4cB3B631257', showLength = 6, return '0xe622...631257'
 * @param {*} address, an address
 * @param {*} showLength, the length of shown characters at the start and the end
 */
var ellipsisAddress = function ellipsisAddress(address) {
  var showLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

  if (!address) {
    return '';
  }

  var length = address.length;

  if (length <= showLength * 2) {
    return address;
  }

  return "".concat(address.slice(0, showLength), "...").concat(address.slice(length - showLength, length));
}; // Format unit to OAK number


var unitToNumber = function unitToNumber(unit) {
  var arrs = unit.split(' ');
  var magnification = 1;

  if (arrs[1] === 'kUnit') {
    magnification = 1000;
  } else if (arrs[1] === 'mUnit') {
    magnification = 1000000;
  }

  return Number(arrs[0]) * magnification;
};

module.exports = {
  ellipsisAddress: ellipsisAddress,
  unitToNumber: unitToNumber
};