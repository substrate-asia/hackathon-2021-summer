"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledSystem = require("styled-system");

var _base = require("../base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
// import aphroditeInterface from 'react-with-styles-interface-aphrodite';
// import DefaultTheme from 'rheostat/lib/themes/DefaultTheme';
// ThemedStyleSheet.registerInterface(aphroditeInterface);
// ThemedStyleSheet.registerTheme(DefaultTheme);
var RangeBoxStyle = _styledComponents["default"].div(_templateObject()); // prop types can also be added from the style functions


RangeBoxStyle.propTypes = {};
RangeBoxStyle.displayName = 'RangeBoxStyle';
RangeBoxStyle.defaultProps = {
  as: 'div'
};
var _default = RangeBoxStyle;
exports["default"] = _default;