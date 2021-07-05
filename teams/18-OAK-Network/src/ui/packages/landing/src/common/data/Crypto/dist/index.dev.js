"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Language_NAMES = exports.menuWidget = exports.BETA_FEATURE = exports.SCALABLE_FEATURE = exports.PROOFS_FEATURE = exports.TRANSACTIONS_FEATURE = exports.TESTIMONIALS = exports.MENU_ITEMS = void 0;

var _author = _interopRequireDefault(require("../../assets/image/crypto/author-4.jpg"));

var _author2 = _interopRequireDefault(require("../../assets/image/crypto/author-2.jpg"));

var _author3 = _interopRequireDefault(require("../../assets/image/crypto/author-3.jpg"));

var _author4 = _interopRequireDefault(require("../../assets/image/crypto/author-1.jpg"));

var _tf = _interopRequireDefault(require("../../assets/image/crypto/tf1.svg"));

var _tf2 = _interopRequireDefault(require("../../assets/image/crypto/tf2.svg"));

var _tf3 = _interopRequireDefault(require("../../assets/image/crypto/tf3.svg"));

var _tf4 = _interopRequireDefault(require("../../assets/image/crypto/tf4.svg"));

var _proof = _interopRequireDefault(require("../../assets/image/crypto/proof1.svg"));

var _proof2 = _interopRequireDefault(require("../../assets/image/crypto/proof2.svg"));

var _proof3 = _interopRequireDefault(require("../../assets/image/crypto/proof3.svg"));

var _proof4 = _interopRequireDefault(require("../../assets/image/crypto/proof4.svg"));

var _proof5 = _interopRequireDefault(require("../../assets/image/crypto/proof5.svg"));

var _proof6 = _interopRequireDefault(require("../../assets/image/crypto/proof6.svg"));

var _jackpot = _interopRequireDefault(require("../../assets/image/crypto/jackpot.svg"));

var _beta = _interopRequireDefault(require("../../assets/image/crypto/beta-1.svg"));

var _beta2 = _interopRequireDefault(require("../../assets/image/crypto/beta-2.svg"));

var _beta3 = _interopRequireDefault(require("../../assets/image/crypto/beta-3.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MENU_ITEMS = [{
  label: 'Home',
  path: '#banner_section',
  offset: '0'
}, {
  label: 'Feature',
  path: '#trusted',
  offset: '0'
}, {
  label: 'Offers',
  path: '#scalable',
  offset: '-10'
}, {
  label: 'Payment Proofs',
  path: '#featureslider',
  offset: '-10'
}, {
  label: 'Contact Us',
  path: '#footerSection',
  offset: '380'
}];
exports.MENU_ITEMS = MENU_ITEMS;
var TESTIMONIALS = [{
  review: 'Best working experience  with this amazing team & in future, we want to work together',
  name: 'Jon Doe',
  designation: 'CEO of Dell Co.',
  avatar: "".concat(_author["default"])
}, {
  review: 'Impressed with master class support of the team and really look forward for the future.',
  name: 'Jon Doe',
  designation: 'Co Founder of IBM',
  avatar: "".concat(_author2["default"])
}, {
  review: 'I have bought more than 10 themes on ThemeForest, and this is the first one I review.',
  name: 'Jeny Doe',
  designation: 'Manager of Hp co.',
  avatar: "".concat(_author3["default"])
}, {
  review: 'Impressed with master class support of the team and really look forward for the future.',
  name: 'Jon Doe',
  designation: 'Manager of Hp co.',
  avatar: "".concat(_author4["default"])
}];
exports.TESTIMONIALS = TESTIMONIALS;
var TRANSACTIONS_FEATURE = [{
  image: _tf["default"],
  title: 'Create Payment Address',
  des: 'Provide your payout wallet address and callback URL to PayBear API.'
}, {
  image: _tf2["default"],
  title: 'Ask for Payment',
  des: 'Show your customer the wallet address as well as the payment amount.'
}, {
  image: _tf3["default"],
  title: 'Get Paid',
  des: 'Payment is sent to the payout wallet immediately.'
}, {
  image: _tf4["default"],
  title: 'Get Payment Notification.',
  des: 'Callbacks are sent to the URL you specified. You can process customer order'
}];
exports.TRANSACTIONS_FEATURE = TRANSACTIONS_FEATURE;
var PROOFS_FEATURE = [{
  image: _proof["default"],
  title: 'Instant trading',
  des: 'Never miss a price swing.'
}, {
  image: _proof2["default"],
  title: 'No hidden fees',
  des: 'know our fees upfront.'
}, {
  image: _proof3["default"],
  title: 'Secure storage',
  des: 'Sleep with peace of mind.'
}, {
  image: _proof4["default"],
  title: 'Systematic trading',
  des: 'History intraday market.'
}, {
  image: _proof5["default"],
  title: 'Network Effect',
  des: 'Casinos contribute 1%.'
}, {
  image: _proof6["default"],
  title: 'Bigger Rewards',
  des: 'Players are incentivized.'
}];
exports.PROOFS_FEATURE = PROOFS_FEATURE;
var SCALABLE_FEATURE = [{
  image: _jackpot["default"],
  title: 'Daily Jackpot',
  des: '35000 CLV'
}, {
  image: _jackpot["default"],
  title: 'Weekly Jackpot',
  des: '250000 CLV'
}, {
  image: _jackpot["default"],
  title: 'Monthly Jackpot',
  des: '4999697 CLV'
}, {
  image: _jackpot["default"],
  title: 'Yearly Jackpot',
  des: '300245785000 CLV'
}];
exports.SCALABLE_FEATURE = SCALABLE_FEATURE;
var BETA_FEATURE = [{
  image: _beta["default"],
  title: 'SEPA Transfers',
  des: 'Deposit & Withdraw money.'
}, {
  image: _beta2["default"],
  title: '24/7 Support',
  des: 'Always here for you.'
}, {
  image: _beta3["default"],
  title: 'Secure',
  des: 'Your money is safe.'
}];
exports.BETA_FEATURE = BETA_FEATURE;
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