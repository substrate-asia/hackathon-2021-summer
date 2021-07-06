"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TabPanel = exports.TabContent = exports.MenuItem = exports.TabMenu = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  cursor: pointer;\n\n  &.active {\n    font-weight: 700;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TabWrapper = _styledComponents["default"].div(_templateObject());

var TabMenu = _styledComponents["default"].ul(_templateObject2());

exports.TabMenu = TabMenu;

var MenuItem = _styledComponents["default"].li(_templateObject3());

exports.MenuItem = MenuItem;

var TabContent = _styledComponents["default"].div(_templateObject4());

exports.TabContent = TabContent;

var TabPanel = _styledComponents["default"].div(_templateObject5());

exports.TabPanel = TabPanel;
var _default = TabWrapper;
exports["default"] = _default;