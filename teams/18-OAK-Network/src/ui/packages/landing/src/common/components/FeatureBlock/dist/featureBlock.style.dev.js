"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ButtonWrapper = exports.ContentWrapper = exports.IconWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledSystem = require("styled-system");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  &.icon_left {\n    display: flex;\n    .icon__wrapper {\n      flex-shrink: 0;\n    }\n  }\n  &.icon_right {\n    display: flex;\n    flex-direction: row-reverse;\n    .content__wrapper {\n      text-align: right;\n    }\n    .icon__wrapper {\n      flex-shrink: 0;\n    }\n  }\n\n  /* styled system prop support */\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// FeatureBlock wrapper style
var FeatureBlockWrapper = _styledComponents["default"].div(_templateObject(), _styledSystem.display, _styledSystem.width, _styledSystem.height, _styledSystem.flexWrap, _styledSystem.flexDirection, _styledSystem.alignItems, _styledSystem.justifyContent, _styledSystem.position, _styledSystem.color, _styledSystem.space, _styledSystem.borders, _styledSystem.borderColor, _styledSystem.boxShadow, _styledSystem.borderRadius, _styledSystem.overflow); // Icon wrapper style


var IconWrapper = _styledComponents["default"].div(_templateObject2(), _styledSystem.display, _styledSystem.width, _styledSystem.height, _styledSystem.alignItems, _styledSystem.justifyContent, _styledSystem.position, _styledSystem.color, _styledSystem.space, _styledSystem.borders, _styledSystem.borderColor, _styledSystem.boxShadow, _styledSystem.borderRadius, _styledSystem.overflow, _styledSystem.fontSize); // Content wrapper style


exports.IconWrapper = IconWrapper;

var ContentWrapper = _styledComponents["default"].div(_templateObject3(), _styledSystem.width, _styledSystem.space, _styledSystem.textAlign); // Button wrapper style


exports.ContentWrapper = ContentWrapper;

var ButtonWrapper = _styledComponents["default"].div(_templateObject4(), _styledSystem.display, _styledSystem.space, _styledSystem.alignItems, _styledSystem.flexDirection, _styledSystem.justifyContent);

exports.ButtonWrapper = ButtonWrapper;
var _default = FeatureBlockWrapper;
exports["default"] = _default;