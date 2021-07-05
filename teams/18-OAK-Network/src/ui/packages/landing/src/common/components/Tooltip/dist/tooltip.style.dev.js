"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BubbleStyle = exports.BubbleSize = exports.TriggerStyle = exports.TooltipStyle = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledSystem = require("styled-system");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 3px;\n  color: #ffffff;\n  font-size: 12px;\n  line-height: 15px;\n  padding: 0.75em;\n  text-align: center;\n\n  /* Style system custom style */\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  min-width: 120px;\n  max-width: 210px;\n  position: absolute;\n  z-index: 10;\n  &::after {\n    content: '';\n    position: absolute;\n  }\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  font-weight: 700;\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  /* Tooltip default style */\n  position: relative;\n\n  .tooltip-top,\n  .tooltip-bottom {\n    left: 50%;\n    transform: translateX(-50%);\n\n    &::after {\n      left: 50%;\n      transform: translateX(-50%);\n      border-left: 9px solid transparent;\n      border-right: 9px solid transparent;\n    }\n  }\n\n  .tooltip-top {\n    bottom: 100%;\n    padding-bottom: 9px;\n\n    &::after {\n      border-top: 9px solid\n        ", ";\n      bottom: 0;\n    }\n  }\n\n  .tooltip-bottom {\n    top: 100%;\n    padding-top: 9px;\n\n    &::after {\n      border-bottom: 9px solid\n        ", ";\n      top: 0;\n    }\n  }\n\n  .tooltip-left,\n  .tooltip-right {\n    top: 50%;\n    transform: translateY(-50%);\n\n    &::after {\n      top: 50%;\n      transform: translateY(-50%);\n      border-top: 9px solid transparent;\n      border-bottom: 9px solid transparent;\n    }\n  }\n\n  .tooltip-left {\n    right: 100%;\n    padding-right: 9px;\n\n    &::after {\n      border-left: 9px solid\n        ", ";\n      right: 0;\n    }\n  }\n\n  .tooltip-right {\n    left: 100%;\n    padding-left: 9px;\n\n    &::after {\n      border-right: 9px solid\n        ", ";\n      left: 0;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TooltipStyle = _styledComponents["default"].span(_templateObject(), function (props) {
  return props.tooltipColor ? props.tooltipColor : '#131212';
}, function (props) {
  return props.tooltipColor ? props.tooltipColor : '#131212';
}, function (props) {
  return props.tooltipColor ? props.tooltipColor : '#131212';
}, function (props) {
  return props.tooltipColor ? props.tooltipColor : '#131212';
});

exports.TooltipStyle = TooltipStyle;

var TriggerStyle = _styledComponents["default"].span(_templateObject2(), _styledSystem.fontSize, _styledSystem.fontWeight, _styledSystem.color, _styledSystem.space);

exports.TriggerStyle = TriggerStyle;

var BubbleSize = _styledComponents["default"].div(_templateObject3(), _styledSystem.minWidth, _styledSystem.maxWidth, _styledSystem.width, _styledSystem.minHeight, _styledSystem.maxHeight, _styledSystem.height);

exports.BubbleSize = BubbleSize;

var BubbleStyle = _styledComponents["default"].div(_templateObject4(), function (props) {
  return props.tooltipColor ? props.tooltipColor : '#131212';
}, _styledSystem.boxShadow, _styledSystem.fontSize, _styledSystem.color, _styledSystem.borderRadius);

exports.BubbleStyle = BubbleStyle;
TooltipStyle.displayName = 'TooltipStyle';