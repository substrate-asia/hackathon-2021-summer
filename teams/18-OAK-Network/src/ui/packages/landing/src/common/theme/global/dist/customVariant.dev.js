"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sizeStyle = exports.colorStyle = exports.buttonStyle = void 0;

var _styledSystem = require("styled-system");

var buttonStyle = (0, _styledSystem.variant)({
  key: 'buttonStyles'
});
exports.buttonStyle = buttonStyle;
var colorStyle = (0, _styledSystem.variant)({
  key: 'colorStyles',
  prop: 'colors'
});
exports.colorStyle = colorStyle;
var sizeStyle = (0, _styledSystem.variant)({
  key: 'sizeStyles',
  prop: 'size'
});
exports.sizeStyle = sizeStyle;