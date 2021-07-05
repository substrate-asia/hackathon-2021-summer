"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appTheme = void 0;

var _colors = _interopRequireDefault(require("./colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var appTheme = {
  breakpoints: ['480px', '768px', '990px', '1440px'],
  space: [0, 5, 10, 15, 20, 25, 30, 40, 56, 71, 91],
  fontSizes: [12, 14, 15, 16, 20, 24, 36, 48, 55, 60, 81],
  fontWeights: [300, 400, 500, 600, 700, 800, 900],
  height: [12, 24, 36, 48],
  width: [12, 24, 36, 48],
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5
  },
  letterSpacings: {
    normal: 'normal',
    tracked: '0.1em',
    tight: '-0.05em',
    mega: '0.25em'
  },
  fonts: {
    roboto: '"Open Sans", sans-serif'
  },
  borders: [0, '1px solid', '2px solid', '4px solid'],
  radius: [0, 3, 5, 10, 15, 20, 25, 50, 60, '50%'],
  colors: _colors["default"],
  colorStyles: {
    primary: {
      color: _colors["default"].primary,
      borderColor: _colors["default"].primary,
      '&:hover': {
        color: _colors["default"].primaryHover,
        borderColor: _colors["default"].primaryHover
      }
    },
    secondary: {
      color: _colors["default"].secondary,
      borderColor: _colors["default"].secondary,
      '&:hover': {
        color: _colors["default"].secondaryHover,
        borderColor: _colors["default"].secondaryHover
      }
    },
    warning: {
      color: _colors["default"].yellow,
      borderColor: _colors["default"].yellow,
      '&:hover': {
        color: _colors["default"].yellowHover,
        borderColor: _colors["default"].yellowHover
      }
    },
    error: {
      color: _colors["default"].secondaryHover,
      borderColor: _colors["default"].secondaryHover,
      '&:hover': {
        color: _colors["default"].secondary,
        borderColor: _colors["default"].secondary
      }
    },
    primaryWithBg: {
      color: _colors["default"].white,
      backgroundColor: _colors["default"].primary,
      borderColor: _colors["default"].primary,
      '&:hover': {
        backgroundColor: _colors["default"].primaryHover,
        borderColor: _colors["default"].primaryHover
      }
    },
    secondaryWithBg: {
      color: _colors["default"].white,
      backgroundColor: _colors["default"].secondary,
      borderColor: _colors["default"].secondary,
      '&:hover': {
        backgroundColor: _colors["default"].secondaryHover,
        borderColor: _colors["default"].secondaryHover
      }
    },
    warningWithBg: {
      color: _colors["default"].white,
      backgroundColor: _colors["default"].yellow,
      borderColor: _colors["default"].yellow,
      '&:hover': {
        backgroundColor: _colors["default"].yellowHover,
        borderColor: _colors["default"].yellowHover
      }
    },
    errorWithBg: {
      color: _colors["default"].white,
      backgroundColor: _colors["default"].secondaryHover,
      borderColor: _colors["default"].secondaryHover,
      '&:hover': {
        backgroundColor: _colors["default"].secondary,
        borderColor: _colors["default"].secondary
      }
    }
  },
  buttonStyles: {
    textButton: {
      border: 0,
      color: _colors["default"].primary,
      padding: 0,
      height: 'auto',
      backgroundColor: _colors["default"].transparent
    },
    outlined: {
      borderWidth: '1px',
      borderStyle: 'solid',
      backgroundColor: _colors["default"].transparent
    },
    fab: {
      border: '0',
      width: '40px',
      height: '40px',
      padding: 0,
      borderRadius: '50%',
      justifyContent: 'center',
      'span.btn-icon': {
        paddingLeft: 0
      }
    },
    extendedFab: {
      border: '0',
      minWidth: '50px',
      height: '40px',
      borderRadius: '50px',
      justifyContent: 'center'
    }
  }
};
exports.appTheme = appTheme;