"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.data = void 0;

var _ = _interopRequireDefault(require("../../assets/image/donation/our-mission/1.png"));

var _2 = _interopRequireDefault(require("../../assets/image/donation/our-mission/2.png"));

var _3 = _interopRequireDefault(require("../../assets/image/donation/our-mission/3.png"));

var _4 = _interopRequireDefault(require("../../assets/image/donation/our-mission/4.png"));

var _5 = _interopRequireDefault(require("../../assets/image/donation/our-mission/5.png"));

var _italy = _interopRequireDefault(require("../../assets/image/donation/italy.png"));

var _china = _interopRequireDefault(require("../../assets/image/donation/china.png"));

var _usa = _interopRequireDefault(require("../../assets/image/donation/usa.png"));

var _6 = _interopRequireDefault(require("../../assets/image/donation/suggestions/1.png"));

var _7 = _interopRequireDefault(require("../../assets/image/donation/suggestions/2.png"));

var _8 = _interopRequireDefault(require("../../assets/image/donation/suggestions/3.png"));

var _9 = _interopRequireDefault(require("../../assets/image/donation/suggestions/4.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = {
  navItems: [{
    label: 'Home',
    path: '#home',
    offset: '70'
  }, {
    label: 'Our Mission',
    path: '#our-mission',
    offset: '70'
  }, {
    label: 'Donation',
    path: '#donation',
    offset: '120'
  }, {
    label: 'Covid-19 Map',
    path: '#covid-map',
    offset: '70'
  }, {
    label: 'Doctors Suggestions',
    path: '#docs-suggestions',
    offset: '70'
  }, {
    label: 'Donation Goal',
    path: '#donation-goal',
    offset: '70'
  }, {
    label: 'Donate Now',
    path: '#donation-goal',
    offset: '70'
  }],
  services: [{
    id: 1,
    icon: _["default"],
    title: 'Healthy & Fresh Food',
    desc: "We\u2019re driven beyond just finishing projects. We want to find smart solutions.",
    link: '#'
  }, {
    id: 2,
    icon: _2["default"],
    title: 'Medicine & other',
    desc: "We\u2019re driven beyond just finishing projects. We want to find smart solutions.",
    link: '#'
  }, {
    id: 3,
    icon: _3["default"],
    title: 'Pure Drinking water',
    desc: "We\u2019re driven beyond just finishing projects. We want to find smart solutions.",
    link: '#'
  }, {
    id: 4,
    icon: _4["default"],
    title: 'Personal Protection',
    desc: "We\u2019re driven beyond just finishing projects. We want to find smart solutions.",
    link: '#'
  }, {
    id: 5,
    icon: _5["default"],
    title: 'Mask, sanitizer & other',
    desc: "We\u2019re driven beyond just finishing projects. We want to find smart solutions.",
    link: '#'
  }],
  presetAmounts: [{
    id: 1,
    value: 5,
    label: '$5'
  }, {
    id: 2,
    value: 20,
    label: '$20'
  }, {
    id: 3,
    value: 50,
    label: '$50'
  }, {
    id: 4,
    value: 100,
    label: '$100'
  }],
  effectedCountries: [{
    id: 1,
    name: 'Italy',
    flag: _italy["default"],
    amount: 10023
  }, {
    id: 2,
    name: 'China',
    flag: _china["default"],
    amount: 3300
  }, {
    id: 3,
    name: 'USA',
    flag: _usa["default"],
    amount: 2277
  }],
  suggestions: [{
    id: 1,
    thumb: _6["default"],
    title: 'Wash your hand at least 20 sec'
  }, {
    id: 2,
    thumb: _7["default"],
    title: 'Cover your coughs or sneeze'
  }, {
    id: 3,
    thumb: _8["default"],
    title: 'Clean & disinfect frequently touched object & surfaces.'
  }, {
    id: 4,
    thumb: _9["default"],
    title: 'Don’t eat raw food, thoroughly cook eggs & meat.'
  }],
  footerNav: [{
    id: 1,
    url: '#home',
    title: 'Home'
  }, {
    id: 2,
    url: '#',
    title: 'Privacy'
  }, {
    id: 3,
    url: '#',
    title: 'Licence'
  }, {
    id: 4,
    url: '#',
    title: 'Contact us'
  }]
};
exports.data = data;