"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _themeGet = require("@styled-system/theme-get");

var _lightenDarken = require("../lightenDarken");

var _base = require("../base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  /* Switch default style */\n  display: inline-flex;\n\n  /* Switch label default style */\n  .reusecore__field-label {\n    color: ", ";\n    font-size: ", "px;\n    font-weight: ", ";\n  }\n\n  /* Switch label style when labelPosition on left */\n  &.label_left {\n    label {\n      display: flex;\n      align-items: center;\n      .reusecore__field-label {\n        margin-right: ", "px;\n      }\n    }\n  }\n\n  /* Switch label style when labelPosition on right */\n  &.label_right {\n    label {\n      display: flex;\n      flex-direction: row-reverse;\n      align-items: center;\n\n      .reusecore__field-label {\n        margin-left: ", "px;\n      }\n    }\n  }\n\n  /* Switch label style when labelPosition on top || bottom */\n  &.label_top {\n    label {\n      .reusecore__field-label {\n        display: flex;\n        margin-bottom: ", "px;\n      }\n    }\n  }\n  &.label_bottom {\n    label {\n      .reusecore__field-label {\n        display: flex;\n        margin-top: ", "px;\n      }\n    }\n  }\n\n  /* Switch default style goes here */\n  input[type='checkbox'] {\n    &.switch {\n      opacity: 0;\n      position: absolute;\n      margin: 0;\n      z-index: -1;\n      width: 0;\n      height: 0;\n      overflow: hidden;\n      left: 0;\n      pointer-events: none;\n\n      &:checked + div {\n        width: ", ";\n        background-position: 0 0;\n        background-color: ", ";\n        > div {\n          background-color: ", ";\n          left: calc(\n            ", " / 2 +\n              3px\n          );\n        }\n      }\n    }\n    + div {\n      vertical-align: middle;\n      width: ", ";\n      height: calc(\n        ", " / 2\n      );\n      border-radius: 450px;\n      border-width: 2px;\n      border-style: solid;\n      border-color: ", ";\n      transition-duration: 0.4s;\n      transition-property: background-color, box-shadow;\n      cursor: pointer;\n      box-sizing: border-box;\n      position: relative;\n\n      > div {\n        float: left;\n        width: calc(\n          ", " / 2 - 8px\n        );\n        height: calc(\n          ", " / 2 - 8px\n        );\n        border-radius: 50%;\n        pointer-events: none;\n        top: 2px;\n        left: 2px;\n        position: absolute;\n        background-color: ", ";\n        transition-timing-function: cubic-bezier(1, 0, 0, 1);\n        transition-duration: 0.4s;\n        transition-property: left, background-color;\n      }\n    }\n  }\n\n  /* Material style goes here */\n  &.is-material {\n    /* Switch label style when labelPosition on top || bottom */\n    &.label_top {\n      label {\n        .reusecore__field-label {\n          margin-bottom: ", "px;\n        }\n      }\n    }\n    &.label_bottom {\n      label {\n        .reusecore__field-label {\n          margin-top: ", "px;\n        }\n      }\n    }\n\n    /* Material switch default style */\n    input[type='checkbox'] {\n      &.switch {\n        &:checked + div {\n          width: ", ";\n          background-color: ", ";\n          > div {\n            background-color: ", ";\n            left: calc(\n              ", " -\n                ", " / 2 +\n                1px\n            );\n          }\n        }\n      }\n      + div {\n        width: ", ";\n        height: calc(\n          ", " / 4\n        );\n        border-width: 0;\n        background-color: ", ";\n\n        > div {\n          width: calc(\n            ", " / 2\n          );\n          height: calc(\n            ", " / 2\n          );\n          top: calc(\n            -", " / 8\n          );\n          left: 0;\n          background-color: ", ";\n          box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),\n            0px 2px 2px 0px rgba(0, 0, 0, 0.14),\n            0px 3px 1px -2px rgba(0, 0, 0, 0.12);\n        }\n      }\n    }\n  }\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SwitchStyle = _styledComponents["default"].div(_templateObject(), (0, _themeGet.themeGet)('colors.labelColor', '#767676'), (0, _themeGet.themeGet)('fontSizes.4', '16'), (0, _themeGet.themeGet)('fontWeights.4', '500'), (0, _themeGet.themeGet)('space.3', '10'), (0, _themeGet.themeGet)('space.3', '10'), (0, _themeGet.themeGet)('space.2', '8'), (0, _themeGet.themeGet)('space.2', '8'), function (props) {
  return props.switchSize ? props.switchSize : '80px';
}, function (props) {
  return props.switchColor ? props.switchColor : '#028489';
}, (0, _themeGet.themeGet)('colors.white', '#ffffff'), function (props) {
  return props.switchSize ? props.switchSize : '80px';
}, function (props) {
  return props.switchSize ? props.switchSize : '80px';
}, function (props) {
  return props.switchSize ? props.switchSize : '80px';
}, function (props) {
  return props.switchColor ? props.switchColor : '#028489';
}, function (props) {
  return props.switchSize ? props.switchSize : '80px';
}, function (props) {
  return props.switchSize ? props.switchSize : '80px';
}, function (props) {
  return props.switchColor ? props.switchColor : '#028489';
}, (0, _themeGet.themeGet)('space.3', '10'), (0, _themeGet.themeGet)('space.3', '10'), function (props) {
  return props.switchSize ? props.switchSize : '50px';
}, function (props) {
  return props.switchColor ? (0, _lightenDarken.lightenColor)(props.switchColor, 0.2) : (0, _lightenDarken.lightenColor)('#028489', 0.2);
}, function (props) {
  return props.switchColor ? props.switchColor : '#028489';
}, function (props) {
  return props.switchSize ? props.switchSize : '50px';
}, function (props) {
  return props.switchSize ? props.switchSize : '50px';
}, function (props) {
  return props.switchSize ? props.switchSize : '50px';
}, function (props) {
  return props.switchSize ? props.switchSize : '50px';
}, function (props) {
  return props.barColor ? props.barColor : '#a0a0a0';
}, function (props) {
  return props.switchSize ? props.switchSize : '50px';
}, function (props) {
  return props.switchSize ? props.switchSize : '50px';
}, function (props) {
  return props.switchSize ? props.switchSize : '50px';
}, (0, _themeGet.themeGet)('colors.white', '#ffffff'), _base.base); // prop types can also be added from the style functions


SwitchStyle.propTypes = {};
SwitchStyle.displayName = 'SwitchStyle';
var _default = SwitchStyle;
exports["default"] = _default;