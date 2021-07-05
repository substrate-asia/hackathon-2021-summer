"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  /* Project default style goes here */\n  display: flex;\n  flex-direction: column;\n  // background-color: rgba(237, 237, 240);\n  // border-radius: 20px;\n  padding: 20px;\n  margin: -30px;\n  // border: 1px solid rgba(237, 237, 240);\n  color: black;\n\n  &:hover {\n    // border: 1px solid #10ac84;\n  }\n\n  div {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .title {\n    align-self: center;\n    font-size: 30px;\n  }\n\n  .description {\n    align-self: center;\n    margin-top: 20px;\n  }\n\n  .identity {\n    width: 100%;\n  }\n\n  .infomation {\n    flex-direction: row;\n    align-items: flex-end;\n    margin-top: 20px;\n    padding-top: 20px;\n    border-top: 1px solid #f1f4f6;\n  }\n\n  .photo {\n    border-radius: 10px;\n    width: 70px;\n    height: 70px;\n    border: 1px solid black;\n  }\n\n  .username {\n    margin-left: 20px;\n  }\n\n  .created {\n    margin-top: 5px;\n    margin-left: 20px;\n  }\n\n  .creator {\n    margin-top: 20px;\n    text-align: left;\n  }\n\n  div.buttons {\n    margin-top: 20px;\n    flex-direction: row;\n    justify-content: flex-end;\n  }\n\n  .button {\n    border: 0;\n    margin-left: 10px;\n  }\n\n  .button-text {\n    margin-left: 5px;\n  }\n\n  @media only screen and (max-width: 600px) {\n    .identity {\n      flex-direction: column;\n      align-items: flex-start;\n    }\n\n    .username {\n      margin-left: 0px;\n      margin-top: 10px;\n    }\n\n    .created {\n      margin-top: 5px;\n      margin-left: 0px;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ProjectStyle = _styledComponents["default"].a(_templateObject());

ProjectStyle.displayName = 'ProjectStyle';
var _default = ProjectStyle;
exports["default"] = _default;