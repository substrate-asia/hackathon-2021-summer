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
  var data = _taggedTemplateLiteral(["\n  /* Alert default style */\n  padding: 20px 25px;\n  border-radius: 4px;\n  border-width: 1px;\n  border-style: solid;\n  border-color: ", ";\n  font-size: ", "px;\n  color: ", ";\n\n  p {\n    &:last-child {\n      margin-bottom: 0;\n    }\n  }\n\n  /* Material style goes here */\n  &.is-material {\n    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),\n      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);\n  }\n\n  /* Style system custome color variant */\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var AlertStyle = _styledComponents["default"].div(_templateObject(), (0, _themeGet.themeGet)('colors.borderColor', '#dadada'), (0, _themeGet.themeGet)('fontSizes.4', '16'), (0, _themeGet.themeGet)('colors.textColor', '#484848'), _customVariant.colorStyle, _base.base); // prop types can also be added from the style functions


AlertStyle.propTypes = _objectSpread({}, _styledSystem.variant.propTypes);
AlertStyle.displayName = 'AlertStyle';
var _default = AlertStyle;
exports["default"] = _default;