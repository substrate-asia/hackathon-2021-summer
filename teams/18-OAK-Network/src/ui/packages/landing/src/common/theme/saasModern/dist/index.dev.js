"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saasModernTheme = void 0;

var _colors = _interopRequireDefault(require("./colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var saasModernTheme = {
  breakpoints: ['576px', '768px', '991px', '1220px'],
  space: [0, 5, 8, 10, 15, 20, 25, 30, 33, 35, 40, 50, 60, 70, 80, 85, 90, 100],
  fontSizes: [10, 12, 14, 15, 16, 18, 20, 22, 24, 36, 48, 80, 96],
  fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
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
  borders: [0, '1px solid', '2px solid', '3px solid', '4px solid', '5px solid', '6px solid'],
  radius: [3, 4, 5, 10, 20, 30, 60, 120, '50%'],
  widths: [36, 40, 44, 48, 54, 70, 81, 128, 256],
  heights: [36, 40, 44, 46, 48, 54, 70, 81, 128],
  maxWidths: [16, 32, 64, 128, 256, 512, 768, 1024, 1536],
  colors: _colors["default"],
  colorStyles: {
    primary: {
      color: _colors["default"].primary,
      borderColor: _colors["default"].transparent,
      backgroundColor: _colors["default"].transparent,
      '&:hover': {
        color: _colors["default"].primary,
        backgroundColor: _colors["default"].transparent
      }
    },
    secondary: {
      color: _colors["default"].secondary,
      borderColor: _colors["default"].transparent,
      backgroundColor: _colors["default"].transparent,
      '&:hover': {
        color: _colors["default"].secondaryHover,
        borderColor: _colors["default"].transparent,
        backgroundColor: _colors["default"].transparent
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
      border: '1px solid',
      '&:hover': {
        color: _colors["default"].white,
        backgroundColor: _colors["default"].primaryHover,
        borderColor: _colors["default"].primaryHover,
        boxShadow: _colors["default"].primaryBoxShadow
      }
    },
    secondaryWithBg: {
      color: _colors["default"].black,
      backgroundColor: _colors["default"].secondary,
      borderColor: _colors["default"].secondary,
      '&:hover': {
        color: _colors["default"].black,
        backgroundColor: _colors["default"].secondaryHover,
        borderColor: _colors["default"].secondaryHover,
        boxShadow: _colors["default"].secondaryBoxShadow
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
    },
    transparentBg: {
      backgroundColor: _colors["default"].white,
      '&:hover': {
        backgroundColor: _colors["default"].white
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
  } // FlexBox: {
  //   backgroundColor: 'green'
  // }

};
exports.saasModernTheme = saasModernTheme;