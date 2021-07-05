"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledSystem = require("styled-system");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  /* Navbar default style goes here */\n  display: flex;\n  align-items: center;\n  min-height: 56px;\n  padding: 10px 16px;\n\n  /* Style system supported prop */\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var NavbarStyle = _styledComponents["default"].nav(_templateObject(), _styledSystem.display, _styledSystem.alignItems, _styledSystem.justifyContent, _styledSystem.flexDirection, _styledSystem.flexWrap, _styledSystem.width, _styledSystem.height, _styledSystem.color, _styledSystem.space, _styledSystem.boxShadow, _styledSystem.borderRadius);

NavbarStyle.displayName = 'NavbarStyle';
var _default = NavbarStyle;
exports["default"] = _default;