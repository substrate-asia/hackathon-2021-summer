"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _themeGet = require("@styled-system/theme-get");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  /* Select label default style */\n  .reusecore__field-label {\n    color: ", ";\n    font-size: ", "px;\n    font-weight: ", ";\n  }\n\n  /* Select label style when labelPosition on left */\n  &.label_left {\n    display: flex;\n    align-items: center;\n    .reusecore__field-label {\n      margin-right: ", "px;\n    }\n  }\n\n  /* Select label style when labelPosition on right */\n  &.label_right {\n    display: flex;\n    flex-direction: row-reverse;\n    align-items: center;\n\n    .reusecore__field-label {\n      margin-left: ", "px;\n    }\n  }\n\n  /* Switch label style when labelPosition on top || bottom */\n  &.label_top {\n    .reusecore__field-label {\n      display: flex;\n      margin-bottom: ", "px;\n    }\n  }\n  &.label_bottom {\n    .reusecore__field-label {\n      display: flex;\n      margin-top: ", "px;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SelectStyle = _styledComponents["default"].div(_templateObject(), (0, _themeGet.themeGet)('colors.labelColor', '#767676'), (0, _themeGet.themeGet)('fontSizes.4', '16'), (0, _themeGet.themeGet)('fontWeights.4', '500'), (0, _themeGet.themeGet)('space.3', '10'), (0, _themeGet.themeGet)('space.3', '10'), (0, _themeGet.themeGet)('space.2', '8'), (0, _themeGet.themeGet)('space.2', '8'));

SelectStyle.displayName = 'SelectStyle';
SelectStyle.defaultProps = {
  as: 'div'
};
var _default = SelectStyle;
exports["default"] = _default;