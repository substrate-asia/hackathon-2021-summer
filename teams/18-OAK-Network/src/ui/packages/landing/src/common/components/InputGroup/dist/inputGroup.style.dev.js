"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Dropdown = exports.CurrentOption = exports.SelectWrapper = exports.Input = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  left: 0;\n  top: 65px;\n  width: 100%;\n  border-radius: 10px;\n  opacity: 0;\n  visibility: hidden;\n  background-color: #ffffff;\n  box-shadow: 0 3px 9px -2px rgba(0, 0, 0, 0.2);\n  overflow: hidden;\n  z-index: 2;\n\n  &.active {\n    opacity: 1;\n    visibility: visible;\n  }\n\n  li {\n    cursor: pointer;\n    font-size: 18px;\n    padding: 15px 20px;\n    color: #616970;\n    border-bottom: 2px solid #f2f2f2;\n    transition: all 0.3s ease;\n    @media only screen and (max-width: 1440px) {\n      font-size: 16px;\n    }\n\n    &:last-child {\n      border-bottom: 0;\n    }\n\n    &:hover {\n      color: #294859;\n      background-color: #f2f2f2;\n    }\n\n    &.selected {\n      color: #294859;\n      font-weight: 600;\n    }\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  cursor: pointer;\n  height: 65px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 20px;\n  border: 2px solid #f2f2f2;\n  border-left-width: 1px;\n  border-top-right-radius: 10px;\n  border-bottom-right-radius: 10px;\n  @media only screen and (max-width: 1440px) {\n    height: 60px;\n  }\n\n  .text {\n    color: #294859;\n    margin-right: 20px;\n    font-size: 20px;\n    font-weight: 600;\n    @media only screen and (max-width: 1440px) {\n      font-size: 16px;\n      margin-right: 15px;\n    }\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  width: 180px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width: calc(100% - 180px);\n  height: 65px;\n  font-size: 20px;\n  font-weight: 600;\n  padding: 0 20px;\n  border: 2px solid #f2f2f2;\n  border-right-width: 1px;\n  border-top-left-radius: 10px;\n  border-bottom-left-radius: 10px;\n  color: #294859;\n  @media only screen and (max-width: 1440px) {\n    font-size: 16px;\n    height: 60px;\n  }\n\n  &::-webkit-inner-spin-button,\n  &::-webkit-outer-spin-button {\n    appearance: none;\n  }\n\n  &::placeholder {\n    color: #616970;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: flex-start;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ComponentWrapper = _styledComponents["default"].div(_templateObject());

var Input = _styledComponents["default"].input(_templateObject2());

exports.Input = Input;

var SelectWrapper = _styledComponents["default"].div(_templateObject3());

exports.SelectWrapper = SelectWrapper;

var CurrentOption = _styledComponents["default"].div(_templateObject4());

exports.CurrentOption = CurrentOption;

var Dropdown = _styledComponents["default"].ul(_templateObject5());

exports.Dropdown = Dropdown;
var _default = ComponentWrapper;
exports["default"] = _default;