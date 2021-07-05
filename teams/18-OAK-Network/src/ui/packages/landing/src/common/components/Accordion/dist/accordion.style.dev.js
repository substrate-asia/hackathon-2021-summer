"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconWrapper = exports.AccordionBodyWrapper = exports.AccordionItemButtonWrapper = exports.AccordionTitleWrapper = exports.CloseIcon = exports.OpenIcon = exports.AccordionItemWrapper = exports.AccordionWrapper = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _reactAccessibleAccordion = require("react-accessible-accordion");

require("react-accessible-accordion/dist/fancy-example.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  margin-left: 30px;\n  width: 40px;\n  position: relative;\n\n  ", ",\n  ", " {\n    position: absolute;\n    top: 50%;\n    right: 0;\n    transform: translateY(-50%);\n    transition: 0.25s ease-in-out;\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  animation: 0.35s ", " ease-in;\n  &.accordion__body--hidden {\n    animation: 0.35s ", " ease-in;\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  > div {\n    display: flex;\n    align-items: center;\n    cursor: pointer;\n    position: relative;\n    &[aria-expanded='false'] {\n      ", " {\n        opacity: 0;\n      }\n      ", " {\n        opacity: 1;\n      }\n    }\n  }\n\n  &:focus {\n    outline: none;\n  }\n\n  * {\n    flex-grow: 1;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  opacity: 0;\n"]);

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
  var data = _taggedTemplateLiteral([""]);

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
  var data = _taggedTemplateLiteral(["\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var fadeIn = (0, _styledComponents.keyframes)(_templateObject());
var AccordionWrapper = (0, _styledComponents["default"])(_reactAccessibleAccordion.Accordion)(_templateObject2());
exports.AccordionWrapper = AccordionWrapper;
var AccordionItemWrapper = (0, _styledComponents["default"])(_reactAccessibleAccordion.AccordionItem)(_templateObject3());
exports.AccordionItemWrapper = AccordionItemWrapper;

var OpenIcon = _styledComponents["default"].div(_templateObject4());

exports.OpenIcon = OpenIcon;

var CloseIcon = _styledComponents["default"].div(_templateObject5());

exports.CloseIcon = CloseIcon;
var AccordionTitleWrapper = (0, _styledComponents["default"])(_reactAccessibleAccordion.AccordionItemHeading)(_templateObject6(), OpenIcon, CloseIcon);
exports.AccordionTitleWrapper = AccordionTitleWrapper;
var AccordionItemButtonWrapper = (0, _styledComponents["default"])(_reactAccessibleAccordion.AccordionItemButton)(_templateObject7());
exports.AccordionItemButtonWrapper = AccordionItemButtonWrapper;
var AccordionBodyWrapper = (0, _styledComponents["default"])(_reactAccessibleAccordion.AccordionItemPanel)(_templateObject8(), fadeIn, fadeIn);
exports.AccordionBodyWrapper = AccordionBodyWrapper;

var IconWrapper = _styledComponents["default"].div(_templateObject9(), OpenIcon, CloseIcon);

exports.IconWrapper = IconWrapper;