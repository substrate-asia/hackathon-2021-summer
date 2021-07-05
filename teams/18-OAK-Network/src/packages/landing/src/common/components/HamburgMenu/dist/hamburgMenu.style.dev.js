"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledSystem = require("styled-system");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  border: 0;\n  background: transparent;\n  width: 44px;\n  height: 30px;\n  cursor: pointer;\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n\n  > span {\n    display: block;\n    width: 100%;\n    height: 2px;\n    margin: 4px 0;\n    float: right;\n    background-color: ", ";\n    transition: all 0.3s ease;\n    &:first-child {\n      margin-top: 0;\n    }\n    &:last-child {\n      width: calc(100% - 10px);\n      margin-bottom: 0;\n    }\n  }\n  &:focus,\n  &:hover {\n    outline: none;\n    > span {\n      &:last-child {\n        width: 100%;\n      }\n    }\n  }\n\n  &:focus,\n  &.active {\n    > span {\n      &:first-child {\n        transform: rotate(45deg);\n        transform-origin: 8px 50%;\n      }\n      &:nth-child(2) {\n        display: none;\n      }\n      &:last-child {\n        width: 100%;\n        transform: rotate(-45deg);\n        transform-origin: 9px 50%;\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var HamburgMenuWrapper = _styledComponents["default"].button(_templateObject(), _styledSystem.width, _styledSystem.height, _styledSystem.color, _styledSystem.space, _styledSystem.border, _styledSystem.boxShadow, _styledSystem.borderRadius, function (props) {
  return props.barColor ? props.barColor : '#10ac84';
});

HamburgMenuWrapper.displayName = 'HamburgMenuWrapper';
var _default = HamburgMenuWrapper;
exports["default"] = _default;