"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin-top: 20px;\n  border: 1px solid #f1f4f6;\n  padding: 20px;\n  display: flex;\n  flex-direction: row;\n\n  .user-info {\n    width: 120px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .photo {\n    border-radius: 10px;\n    width: 70px;\n    height: 70px;\n    border: 1px solid black;\n  }\n\n  .button {\n    border: 0;\n    margin-left: 10px;\n    background-color: white;\n  }\n\n  .button-text {\n    margin-left: 5px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var CommentStyle = _styledComponents["default"].div(_templateObject());

CommentStyle.displayName = 'CommentStyle';
var _default = CommentStyle;
exports["default"] = _default;