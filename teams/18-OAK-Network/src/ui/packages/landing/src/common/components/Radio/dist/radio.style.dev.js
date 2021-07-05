"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _themeGet = require("@styled-system/theme-get");

var _base = require("../base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  /* Switch label default style */\n  .reusecore__field-label {\n    color: ", ";\n    font-size: ", "px;\n    font-weight: ", ";\n  }\n\n  /* Switch label style when labelPosition on left */\n  &.label_left {\n    label {\n      display: flex;\n      align-items: center;\n      .reusecore__field-label {\n        margin-right: ", "px;\n      }\n    }\n  }\n\n  /* Switch label style when labelPosition on right */\n  &.label_right {\n    label {\n      display: flex;\n      flex-direction: row-reverse;\n      align-items: center;\n\n      .reusecore__field-label {\n        margin-left: ", "px;\n      }\n    }\n  }\n\n  /* Checkbox default style */\n  input[type='radio'] {\n    &.radio {\n      opacity: 0;\n      position: absolute;\n      margin: 0;\n      z-index: -1;\n      width: 0;\n      height: 0;\n      overflow: hidden;\n      pointer-events: none;\n\n      &:focus {\n        + div {\n          border-color: ", ";\n        }\n      }\n\n      &:checked + div {\n        &::after {\n          opacity: 1;\n          visibility: visible;\n          transform: scale(1);\n        }\n      }\n    }\n    + div {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 16px;\n      height: 16px;\n      border-radius: 50%;\n      border: 1px solid ", ";\n      position: relative;\n      transition: background-color 0.3s ease;\n      &::after {\n        content: '';\n        display: flex;\n        width: 8px;\n        height: 8px;\n        transform: scale(0.8);\n        border-radius: 50%;\n        background-color: ", ";\n        opacity: 0;\n        visibility: hidden;\n        transition-property: opacity, visibility;\n        transition-duration: 0.3s;\n      }\n    }\n  }\n\n  /* support base component props */\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var RadioBoxStyle = _styledComponents["default"].div(_templateObject(), (0, _themeGet.themeGet)('colors.textColor', '#484848'), (0, _themeGet.themeGet)('fontSizes.4', '16'), (0, _themeGet.themeGet)('fontWeights.4', '500'), (0, _themeGet.themeGet)('space.3', '10'), (0, _themeGet.themeGet)('space.3', '10'), (0, _themeGet.themeGet)('colors.primary', '#028489'), (0, _themeGet.themeGet)('colors.borderColor', '#dadada'), (0, _themeGet.themeGet)('colors.primary', '#028489'), _base.base); // prop types can also be added from the style functions


RadioBoxStyle.propTypes = {};
RadioBoxStyle.displayName = 'RadioBoxStyle';
var _default = RadioBoxStyle;
exports["default"] = _default;