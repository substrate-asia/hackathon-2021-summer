"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledSystem = require("styled-system");

var _themeGet = require("@styled-system/theme-get");

var _customVariant = require("../customVariant");

var _base = require("../base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  /* button default style */\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  color: ", ";\n  background-color: ", ";\n  min-height: ", "px;\n  min-width: ", "px;\n  border-radius: ", "px;\n  font-family: inherit;\n  font-size: ", "px;\n  font-weight: ", ";\n  text-decoration: none;\n  text-transform: capitalize;\n  padding-top: ", "px;\n  padding-bottom: ", "px;\n  padding-left: ", "px;\n  padding-right: ", "px;\n  border: 0;\n  transition: all 0.3s ease;\n  span.btn-text {\n    padding-left: ", "px;\n    padding-right: ", "px;\n  }\n  span.btn-icon {\n    display: flex;\n    > div {\n      display: flex !important;\n    }\n  }\n\n  &:focus {\n    outline: none;\n  }\n\n  /* Material style goes here */\n  &.is-material {\n    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),\n      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);\n  }\n\n  /* When button on loading stage */\n  &.is-loading {\n    .btn-text {\n      padding-left: ", "px;\n      padding-right: ", "px;\n    }\n  }\n\n  /* Style system support */\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ButtonStyle = _styledComponents["default"].button(_templateObject(), (0, _themeGet.themeGet)('colors.white', '#ffffff'), (0, _themeGet.themeGet)('colors.primary', '#028489'), (0, _themeGet.themeGet)('heights.3', '48'), (0, _themeGet.themeGet)('widths.3', '48'), (0, _themeGet.themeGet)('radius.0', '3'), (0, _themeGet.themeGet)('fontSizes.4', '16'), (0, _themeGet.themeGet)('fontWeights.4', '500'), (0, _themeGet.themeGet)('space.2', '8'), (0, _themeGet.themeGet)('space.2', '8'), (0, _themeGet.themeGet)('space.4', '15'), (0, _themeGet.themeGet)('space.4', '15'), (0, _themeGet.themeGet)('space.1', '4'), (0, _themeGet.themeGet)('space.1', '4'), (0, _themeGet.themeGet)('space.2', '8'), (0, _themeGet.themeGet)('space.2', '8'), _styledSystem.alignItems, _styledSystem.boxShadow, _customVariant.buttonStyle, _customVariant.colorStyle, _customVariant.sizeStyle, _base.base); // prop types can also be added from the style functions


ButtonStyle.propTypes = _objectSpread({}, _styledSystem.alignItems.propTypes, {}, _styledSystem.boxShadow.propTypes, {}, _styledSystem.variant.propTypes);
ButtonStyle.displayName = 'ButtonStyle';
var _default = ButtonStyle;
exports["default"] = _default;