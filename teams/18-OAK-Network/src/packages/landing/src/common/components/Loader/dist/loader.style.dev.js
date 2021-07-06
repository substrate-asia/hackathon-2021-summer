"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledSystem = require("styled-system");

var _customVariant = require("../customVariant");

var _Animation = require("../Animation");

var _base = require("../base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  /* loader default style */\n  display: inline-flex;\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  overflow: hidden;\n  border-width: 2px;\n  border-style: solid;\n  border-color: ", ";\n  border-top-color: transparent !important;\n\n  /* animation goes here */\n  ", "\n  /* Style system custome color variant */\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LoaderStyle = _styledComponents["default"].span(_templateObject(), function (props) {
  return props.loaderColor ? props.loaderColor : '#000000';
}, _Animation.AnimSpinner, _customVariant.colorStyle, _base.base); // prop types can also be added from the style functions


LoaderStyle.propTypes = _objectSpread({}, _styledSystem.variant.propTypes);
LoaderStyle.displayName = 'LoaderStyle';
var _default = LoaderStyle;
exports["default"] = _default;