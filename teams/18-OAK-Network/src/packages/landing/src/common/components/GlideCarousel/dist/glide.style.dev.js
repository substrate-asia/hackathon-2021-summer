"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DefaultBtn = exports.BulletButton = exports.BulletControlWrapper = exports.ButtonWrapper = exports.ButtonControlWrapper = exports.GlideSlideWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledSystem = require("styled-system");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  cursor: pointer;\n  margin: 10px 3px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  cursor: pointer;\n  width: 10px;\n  height: 10px;\n  margin: 4px;\n  border: 0;\n  padding: 0;\n  outline: none;\n  border-radius: 50%;\n  background-color: #d6d6d6;\n\n  &:hover,\n  &.glide__bullet--active {\n    background-color: #869791;\n  }\n\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// Glide wrapper style
var GlideWrapper = _styledComponents["default"].div(_templateObject(), _styledSystem.width, _styledSystem.height, _styledSystem.space); // Glide slide wrapper style


var GlideSlideWrapper = _styledComponents["default"].li(_templateObject2(), _styledSystem.space, _styledSystem.color, _styledSystem.borders, _styledSystem.boxShadow, _styledSystem.borderRadius); // Button wrapper style


exports.GlideSlideWrapper = GlideSlideWrapper;

var ButtonWrapper = _styledComponents["default"].div(_templateObject3(), _styledSystem.display, _styledSystem.space, _styledSystem.color, _styledSystem.borders, _styledSystem.boxShadow, _styledSystem.borderRadius, _styledSystem.position, _styledSystem.top, _styledSystem.left, _styledSystem.right, _styledSystem.bottom); // ButtonControlWrapper style


exports.ButtonWrapper = ButtonWrapper;

var ButtonControlWrapper = _styledComponents["default"].div(_templateObject4(), _styledSystem.display, _styledSystem.space, _styledSystem.alignItems, _styledSystem.justifyContent, _styledSystem.position, _styledSystem.top, _styledSystem.left, _styledSystem.right, _styledSystem.bottom); // BulletControlWrapper style


exports.ButtonControlWrapper = ButtonControlWrapper;

var BulletControlWrapper = _styledComponents["default"].div(_templateObject5(), _styledSystem.display, _styledSystem.space, _styledSystem.alignItems, _styledSystem.justifyContent, _styledSystem.flexWrap); // BulletButton style


exports.BulletControlWrapper = BulletControlWrapper;

var BulletButton = _styledComponents["default"].button(_templateObject6(), _styledSystem.display, _styledSystem.space, _styledSystem.color, _styledSystem.borders, _styledSystem.boxShadow, _styledSystem.borderRadius, _styledSystem.width, _styledSystem.height); // default button style


exports.BulletButton = BulletButton;

var DefaultBtn = _styledComponents["default"].button(_templateObject7());

exports.DefaultBtn = DefaultBtn;
var _default = GlideWrapper;
exports["default"] = _default;