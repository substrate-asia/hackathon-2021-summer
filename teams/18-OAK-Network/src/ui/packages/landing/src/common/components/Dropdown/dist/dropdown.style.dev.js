"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownMenuItemWrapper = exports.DropdownMenuItemsWrapper = exports.DropdownMenuWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  padding: 10px 15px;\n  transition: background-color 0.3s ease-in-out;\n  a {\n    display: block;\n  }\n  &:hover {\n    background-color: #e2e2e2;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  margin-top: 40px;\n  padding: 0;\n  list-style: none;\n  background-color: #ffffff;\n  position: absolute;\n  top: 0;\n  left: ", ";\n  right: ", ";\n  z-index: 15;\n  min-width: 190px;\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);\n  border-radius: 3px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  cursor: pointer;\n  transition: 0.2s ease-in-out;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DropdownMenuWrapper = _styledComponents["default"].div(_templateObject());

exports.DropdownMenuWrapper = DropdownMenuWrapper;

var DropdownMenuItemsWrapper = _styledComponents["default"].ul(_templateObject2(), function (props) {
  return props.dropdownDirection === 'left' ? '0' : 'auto';
}, function (props) {
  return props.dropdownDirection === 'right' ? '0' : 'auto';
});

exports.DropdownMenuItemsWrapper = DropdownMenuItemsWrapper;

var DropdownMenuItemWrapper = _styledComponents["default"].li(_templateObject3());

exports.DropdownMenuItemWrapper = DropdownMenuItemWrapper;