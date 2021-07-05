"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Language_NAMES = exports.menuWidget = exports.Testimonial = exports.LatestNews = exports.Features = exports.SOCIAL_PROFILES = exports.MENU_RIGHT_ITEMS = exports.MENU_LEFT_ITEMS = exports.MENU_ITEMS = void 0;

var _feature = _interopRequireDefault(require("../../assets/image/ride/feature-2.svg"));

var _feature2 = _interopRequireDefault(require("../../assets/image/ride/feature-1.svg"));

var _feature3 = _interopRequireDefault(require("../../assets/image/ride/feature-3.svg"));

var _blog = _interopRequireDefault(require("../../assets/image/ride/blog-1.svg"));

var _blog2 = _interopRequireDefault(require("../../assets/image/ride/blog-2.svg"));

var _client = _interopRequireDefault(require("../../assets/image/saas/testimonial/client-1.jpg"));

var _denny = _interopRequireDefault(require("../../assets/image/agency/client/denny.png"));

var _socialTwitter = require("react-icons-kit/ionicons/socialTwitter");

var _socialFacebook = require("react-icons-kit/ionicons/socialFacebook");

var _socialDribbbleOutline = require("react-icons-kit/ionicons/socialDribbbleOutline");

var _socialGithub = require("react-icons-kit/ionicons/socialGithub");

var _socialGoogleplusOutline = require("react-icons-kit/ionicons/socialGoogleplusOutline");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MENU_ITEMS = [{
  label: 'Home',
  path: '#banner_section',
  offset: '70'
}, {
  label: 'Ride',
  path: '#ride_section',
  offset: '70'
}, {
  label: 'Fare Estimate',
  path: '#fare_section',
  offset: '70'
}, {
  label: 'Features',
  path: '#feature_section',
  offset: '70'
}, {
  label: 'News',
  path: '#news_section',
  offset: '70'
}];
exports.MENU_ITEMS = MENU_ITEMS;
var MENU_LEFT_ITEMS = [{
  label: 'Home',
  path: '#banner_section',
  offset: '70'
}, {
  label: 'Ride',
  path: '#ride_section',
  offset: '70'
}, {
  label: 'Fare Estimate',
  path: '#fare_section',
  offset: '70'
}, {
  label: 'Features',
  path: '#feature_section',
  offset: '70'
}, {
  label: 'News',
  path: '#news_section',
  offset: '70'
}];
exports.MENU_LEFT_ITEMS = MENU_LEFT_ITEMS;
var MENU_RIGHT_ITEMS = [{
  label: 'Login',
  path: '#',
  offset: '70'
}, {
  label: 'Sign Up',
  path: '#',
  offset: '70'
}];
exports.MENU_RIGHT_ITEMS = MENU_RIGHT_ITEMS;
var SOCIAL_PROFILES = [{
  icon: _socialTwitter.socialTwitter,
  url: '#'
}, {
  icon: _socialFacebook.socialFacebook,
  url: '#'
}, {
  icon: _socialDribbbleOutline.socialDribbbleOutline,
  url: '#'
}, {
  icon: _socialGithub.socialGithub,
  url: '#'
}, {
  icon: _socialGoogleplusOutline.socialGoogleplusOutline,
  url: '#'
}];
exports.SOCIAL_PROFILES = SOCIAL_PROFILES;
var Features = [{
  id: 1,
  img: "".concat(_feature["default"]),
  title: 'Delivery',
  description: 'Documents, accessories, packages and even gifts! Deliver them all within your city, in a jiffy!'
}, {
  id: 2,
  img: "".concat(_feature2["default"]),
  title: 'Bike Share',
  description: 'All the Riders have been verified by us. Not random people with bikes that we don’t know.'
}, {
  id: 3,
  img: "".concat(_feature3["default"]),
  title: 'Food',
  description: 'Order food from your favorite Place near you with the convenience of Godrive.'
}];
exports.Features = Features;
var LatestNews = [{
  id: 1,
  img: "".concat(_blog["default"]),
  title: 'Built for drivers, with drivers',
  description: 'The new Driver app helps you earn smarter and supports you–like a partner–at every turn.',
  buttonText: 'Learn More'
}, {
  id: 2,
  img: "".concat(_blog2["default"]),
  title: 'Bike Share',
  description: 'All the Riders have been verified by us. Not random people with bikes that we don’t know.',
  buttonText: 'Learn More'
}];
exports.LatestNews = LatestNews;
var Testimonial = [{
  id: 1,
  name: 'Jon Doe',
  designation: 'CEO of Invission Co.',
  comment: 'Love to work with this designer in every our future project to ensure we are going to build best prototyping features. Impressed with master class support of the team and really look forward for the future. A true passionate team.',
  avatar_url: _client["default"],
  social_icon: 'flaticon-instagram'
}, {
  id: 2,
  name: 'Roman Ul Oman',
  designation: 'Co-founder of QatarDiaries',
  comment: 'Impressed with master class support of the team and really look forward for the future. A true passionate team. Love to work with this designer in every our future project to ensure we are going to build best prototyping features.',
  avatar_url: _denny["default"],
  social_icon: 'flaticon-twitter'
}];
exports.Testimonial = Testimonial;
var menuWidget = [{
  id: 1,
  title: 'About Us',
  menuItems: [{
    id: 1,
    url: '#',
    text: 'Support Center'
  }, {
    id: 2,
    url: '#',
    text: 'Customer Support'
  }, {
    id: 3,
    url: '#',
    text: 'About Us'
  }, {
    id: 4,
    url: '#',
    text: 'Copyright'
  }, {
    id: 5,
    url: '#',
    text: 'Popular Campaign'
  }]
}, {
  id: 2,
  title: 'Our Information',
  menuItems: [{
    id: 1,
    url: '#',
    text: 'Return Policy'
  }, {
    id: 2,
    url: '#',
    text: 'Privacy Policy'
  }, {
    id: 3,
    url: '#',
    text: 'Terms & Conditions'
  }, {
    id: 4,
    url: '#',
    text: 'Site Map'
  }, {
    id: 5,
    url: '#',
    text: 'Store Hours'
  }]
}, {
  id: 3,
  title: 'My Account',
  menuItems: [{
    id: 1,
    url: '#',
    text: 'Press inquiries'
  }, {
    id: 2,
    url: '#',
    text: 'Social media directories'
  }, {
    id: 3,
    url: '#',
    text: 'Images & B-roll'
  }, {
    id: 4,
    url: '#',
    text: 'Permissions'
  }, {
    id: 5,
    url: '#',
    text: 'Speaker requests'
  }]
}];
exports.menuWidget = menuWidget;
var Language_NAMES = [{
  label: 'English',
  value: 'eng'
}, {
  label: 'Chinese',
  value: 'chinese'
}, {
  label: 'Indian',
  value: 'indian'
}];
exports.Language_NAMES = Language_NAMES;