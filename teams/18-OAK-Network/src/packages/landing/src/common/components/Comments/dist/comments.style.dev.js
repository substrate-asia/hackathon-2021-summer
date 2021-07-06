"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  background-color: white;\n  border: 1px solid #f1f4f6;\n  padding-bottom: 30px;\n\n  .content-div {\n    width: 90%;\n    align-self: center;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .comment-input {\n    margin-top: 30px;\n    width: 100%;\n    height: 60px;\n    padding: 10px;\n    border-radius: 10px;\n    border: 1px solid #f1f4f6;\n  }\n\n  .leave-comment {\n    width: 200px;\n    height: 30px;\n    align-self: flex-end;\n    margin-top: 20px;\n    margin-bottom: 20px;\n    border-radius: 10px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var CommentsStyle = _styledComponents["default"].div(_templateObject());

CommentsStyle.displayName = 'CommentsStyle';
var _default = CommentsStyle;
exports["default"] = _default;