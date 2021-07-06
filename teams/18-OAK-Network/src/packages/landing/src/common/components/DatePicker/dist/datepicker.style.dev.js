"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _themeGet = require("@styled-system/theme-get");

var _base = require("../base");

var _ThemedStyleSheet = _interopRequireDefault(require("react-with-styles/lib/ThemedStyleSheet"));

var _reactWithStylesInterfaceAphrodite = _interopRequireDefault(require("react-with-styles-interface-aphrodite"));

var _DefaultTheme = _interopRequireDefault(require("react-dates/lib/theme/DefaultTheme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

_ThemedStyleSheet["default"].registerInterface(_reactWithStylesInterfaceAphrodite["default"]);

_ThemedStyleSheet["default"].registerTheme(_DefaultTheme["default"]);

var DatePickerStyle = _styledComponents["default"].div(_templateObject()); // prop types can also be added from the style functions


DatePickerStyle.propTypes = {};
DatePickerStyle.displayName = 'DatePickerStyle';
DatePickerStyle.defaultProps = {// as: 'div'
};
var _default = DatePickerStyle;
exports["default"] = _default;