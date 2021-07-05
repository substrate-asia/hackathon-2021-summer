"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: flex-start;\n  margin: 0 -10px;\n  h4,\n  p {\n    margin: 0;\n  }\n\n  h4 {\n    margin-bottom: 7px;\n  }\n\n  label {\n    position: relative;\n    padding: 15px 25px;\n    box-sizing: border-box;\n    border: 2px solid #f4f2fa;\n    border-radius: 10px;\n    margin: 0 10px;\n    cursor: pointer;\n    transition: all 0.3s ease;\n\n    &.active {\n      background-color: #f4f2fa;\n    }\n\n    input {\n      visibility: hidden;\n      opacity: 0;\n      position: absolute;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ComponentWrapper = _styledComponents["default"].div(_templateObject());

var _default = ComponentWrapper;
exports["default"] = _default;