"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base = exports.themed = void 0;

var _styledSystem = require("styled-system");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var themed = function themed(key) {
  return function (props) {
    return props.theme[key];
  };
};

exports.themed = themed;
var base = (0, _styledSystem.compose)(function () {
  return {
    boxSizing: 'border-box'
  };
}, _styledSystem.space, _styledSystem.width, _styledSystem.minWidth, _styledSystem.maxWidth, _styledSystem.height, _styledSystem.minHeight, _styledSystem.maxHeight, _styledSystem.fontSize, _styledSystem.color, _styledSystem.flex, _styledSystem.order, _styledSystem.alignSelf, _styledSystem.borders, _styledSystem.borderColor, _styledSystem.display);
exports.base = base;
base.propTypes = _objectSpread({}, _styledSystem.display.propTypes, {}, _styledSystem.space.propTypes, {}, _styledSystem.borders.propTypes, {}, _styledSystem.borderColor.propTypes, {}, _styledSystem.width.propTypes, {}, _styledSystem.height.propTypes, {}, _styledSystem.fontSize.propTypes, {}, _styledSystem.color.propTypes, {}, _styledSystem.flex.propTypes, {}, _styledSystem.order.propTypes, {}, _styledSystem.alignSelf.propTypes);