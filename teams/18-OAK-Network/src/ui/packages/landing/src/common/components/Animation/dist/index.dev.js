"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimSpinner = void 0;

var _styledComponents = require("styled-components");

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  animation: ", " 1s linear infinite;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    transform: rotate(0deg);\n  }\n  50% {\n    transform: rotate(180deg);\n    opacity: 0.5;\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var spinner = (0, _styledComponents.keyframes)(_templateObject());
var AnimSpinner = (0, _styledComponents.css)(_templateObject2(), spinner);
exports.AnimSpinner = AnimSpinner;