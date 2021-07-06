"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  /* NavButton default style goes here */\n  border: 1px solid black;\n  border-radius: 20px;\n  padding: 10px 20px;\n  min-width: 7rem;\n  margin-left: 1.5rem;\n  text-align: center;\n  color: #10ac84;\n  border-color: #10ac84;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var NavButtonStyle = _styledComponents["default"].nav(_templateObject());

NavButtonStyle.displayName = 'NavButtonStyle';
var _default = NavButtonStyle;
exports["default"] = _default;