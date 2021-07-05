"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer_Data = exports.Faq = exports.WalletFeatures = exports.Features = exports.navbar = void 0;

var _logo = _interopRequireDefault(require("common/assets/image/cryptoModern/logo.png"));

var _feature = _interopRequireDefault(require("common/assets/image/cryptoModern/feature-1.png"));

var _feature2 = _interopRequireDefault(require("common/assets/image/cryptoModern/feature-2.png"));

var _feature3 = _interopRequireDefault(require("common/assets/image/cryptoModern/feature-3.png"));

var _feature4 = _interopRequireDefault(require("common/assets/image/cryptoModern/feature-4.png"));

var _wallet = _interopRequireDefault(require("common/assets/image/cryptoModern/wallet1.png"));

var _wallet2 = _interopRequireDefault(require("common/assets/image/cryptoModern/wallet2.png"));

var _wallet3 = _interopRequireDefault(require("common/assets/image/cryptoModern/wallet3.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* ------------------------------------ */
// Navbar data section

/* ------------------------------------ */
var navbar = {
  logo: _logo["default"],
  navMenu: [{
    id: 1,
    label: 'Home',
    path: '#home',
    offset: '84'
  }, {
    id: 2,
    label: 'Key Features',
    path: '#key-features',
    offset: '81'
  }, {
    id: 3,
    label: 'Fund Raising',
    path: '#fund',
    offset: '81'
  }, {
    id: 4,
    label: 'Locations',
    path: '#map',
    offset: '81'
  }, {
    id: 5,
    label: 'FAQ',
    path: '#faqSection',
    offset: '81'
  }]
};
/* ------------------------------------ */
// Features data section

/* ------------------------------------ */

exports.navbar = navbar;
var Features = [{
  id: 1,
  icon: _feature["default"],
  title: 'Great Market Value',
  description: 'The leading digital currency by market capitalization, has grown in value by more than 10 times.'
}, {
  id: 2,
  icon: _feature2["default"],
  title: 'Verified Mining',
  description: 'Your mining rigs are already set up and running. As soon as you set up your account.'
}, {
  id: 3,
  icon: _feature3["default"],
  title: 'Fastest Miner',
  description: 'Don’t wrestle with rig assembly and hot, noisy miners at home. We have the fastest bitcoin mining.'
}, {
  id: 4,
  icon: _feature4["default"],
  title: 'Secure Transactions',
  description: 'You can mine any cryptocurrency available in our catalogue! Switch your mining power.'
}];
/* ------------------------------------ */
// Wallet  data section

/* ------------------------------------ */

exports.Features = Features;
var WalletFeatures = [{
  id: 1,
  icon: _wallet["default"],
  title: 'Secure transfers with verified Casinos.'
}, {
  id: 2,
  icon: _wallet2["default"],
  title: 'Easily buy and sell CLV within the wallet'
}, {
  id: 3,
  icon: _wallet3["default"],
  title: 'Pay as many as you want'
}];
/* ------------------------------------ */
// Faq  data section

/* ------------------------------------ */

exports.WalletFeatures = WalletFeatures;
var Faq = [{
  id: 1,
  expend: true,
  title: 'How to contact with Customer Service?',
  description: 'Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!. '
}, {
  id: 2,
  title: 'App installation failed, how to update system information?',
  description: 'Please read the documentation carefully . We also have some online  video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum . '
}, {
  id: 3,
  title: 'Website reponse taking time, how to improve?',
  description: 'At first, Please check your internet connection . We also have some online  video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum .'
}, {
  id: 4,
  title: 'New update fixed all bug and issues?',
  description: 'We are giving the update of this theme continuously . You will receive an email Notification when we push an update. Always try to be updated with us .'
}];
/* ------------------------------------ */
// Footer data section

/* ------------------------------------ */

exports.Faq = Faq;
var Footer_Data = [{
  title: 'About Us',
  menuItems: [{
    url: '#',
    text: 'Support Center'
  }, {
    url: '#',
    text: 'Customer Support'
  }, {
    url: '#',
    text: 'About Us'
  }, {
    url: '#',
    text: 'Copyright'
  }, {
    url: '#',
    text: 'Popular Campaign'
  }]
}, {
  title: 'Our Information',
  menuItems: [{
    url: '#',
    text: 'Return Policy'
  }, {
    url: '#',
    text: 'Privacy Policy'
  }, {
    url: '#',
    text: 'Terms & Conditions'
  }, {
    url: '#',
    text: 'Site Map'
  }, {
    url: '#',
    text: 'Store Hours'
  }]
}, {
  title: 'My Account',
  menuItems: [{
    url: '#',
    text: 'Press inquiries'
  }, {
    url: '#',
    text: 'Social media directories'
  }, {
    url: '#',
    text: 'Images & B-roll'
  }, {
    url: '#',
    text: 'Permissions'
  }, {
    url: '#',
    text: 'Speaker requests'
  }]
}, {
  title: 'Policy',
  menuItems: [{
    url: '#',
    text: 'Application security'
  }, {
    url: '#',
    text: 'Software principles'
  }, {
    url: '#',
    text: 'Unwanted software policy'
  }, {
    url: '#',
    text: 'Responsible supply chain'
  }]
}];
exports.Footer_Data = Footer_Data;