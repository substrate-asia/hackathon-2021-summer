"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TESTIMONIALS = exports.SCREENSHOTS = exports.FEATURES = exports.FOOTER_WIDGET = exports.FAQ_DATA = exports.YEARLY_PRICING_TABLE = exports.MONTHLY_PRICING_TABLE = exports.SERVICE_ITEMS = exports.MENU_ITEMS = void 0;

var _screen = _interopRequireDefault(require("../../assets/image/saasClassic/screen-1.png"));

var _author = _interopRequireDefault(require("../../assets/image/saasClassic/author-1.jpg"));

var _author2 = _interopRequireDefault(require("../../assets/image/saasClassic/author-2.jpg"));

var _author3 = _interopRequireDefault(require("../../assets/image/saasClassic/author-3.jpg"));

var _ic_monetization_on = require("react-icons-kit/md/ic_monetization_on");

var _ic_settings = require("react-icons-kit/md/ic_settings");

var _pieChart = require("react-icons-kit/icomoon/pieChart");

var _briefcase = require("react-icons-kit/fa/briefcase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MENU_ITEMS = [{
  label: 'Home',
  path: '#banner_section',
  offset: '0'
}, {
  label: 'Screenshot',
  path: '#screenshot_section',
  offset: '0'
}, {
  label: 'Feature',
  path: '#feature_section',
  offset: '0'
}, {
  label: 'Pricing',
  path: '#pricing_section',
  offset: '0'
}, {
  label: 'Testimonial',
  path: '#testimonial_section',
  offset: '0'
}];
exports.MENU_ITEMS = MENU_ITEMS;
var SERVICE_ITEMS = [{
  icon: 'flaticon-stopwatch-1',
  title: 'Fast Performance'
}, {
  icon: 'flaticon-prototype',
  title: 'Prototyping'
}, {
  icon: 'flaticon-code',
  title: 'Coade Export'
}, {
  icon: 'flaticon-vectors',
  title: 'Vector Editing'
}, {
  icon: 'flaticon-export',
  title: 'Export Presets'
}];
exports.SERVICE_ITEMS = SERVICE_ITEMS;
var MONTHLY_PRICING_TABLE = [{
  name: 'Basic Account',
  description: 'For Small teams or group who need to build website ',
  price: '$0',
  priceLabel: 'Only for first month',
  buttonLabel: 'Start for free',
  url: '#',
  listItems: [{
    content: 'Drag & Drop Builder'
  }, {
    content: '1,000s of Templates Ready'
  }, {
    content: 'Blog Tools'
  }, {
    content: 'eCommerce Store '
  }, {
    content: '30+ Webmaster Tools'
  }]
}, {
  name: 'Business Account',
  description: 'For Mediums teams or group who need to build website ',
  price: '$9.87',
  priceLabel: 'Per month & subscription yearly',
  buttonLabel: 'Register Now',
  url: '#',
  trialButtonLabel: 'Or Start 14 Days trail',
  trialURL: '#',
  listItems: [{
    content: 'Drag & Drop Builder'
  }, {
    content: '1,000s of Templates Ready'
  }, {
    content: 'Blog Tools'
  }, {
    content: 'eCommerce Store '
  }, {
    content: '30+ Webmaster Tools'
  }]
}, {
  name: 'Premium Account',
  description: 'For Large teams or group who need to build website ',
  price: '$12.98',
  priceLabel: 'Per month & subscription yearly',
  buttonLabel: 'Register Now',
  url: '#',
  trialButtonLabel: 'Or Start 14 Days trail',
  trialURL: '#',
  listItems: [{
    content: 'Drag & Drop Builder'
  }, {
    content: '1,000s of Templates Ready'
  }, {
    content: 'Blog Tools'
  }, {
    content: 'eCommerce Store '
  }, {
    content: '30+ Webmaster Tools'
  }]
}];
exports.MONTHLY_PRICING_TABLE = MONTHLY_PRICING_TABLE;
var YEARLY_PRICING_TABLE = [{
  name: 'Basic Account',
  description: 'For a single client or team who need to build website ',
  price: '$0',
  priceLabel: 'Only for first month',
  buttonLabel: 'Start for free',
  url: '#',
  listItems: [{
    content: 'Drag & Drop Builder'
  }, {
    content: '1,000s of Templates Ready'
  }, {
    content: 'Blog Tools'
  }, {
    content: 'eCommerce Store '
  }, {
    content: '30+ Webmaster Tools'
  }]
}, {
  name: 'Business Account',
  description: 'For Small teams or group who need to build website ',
  price: '$6.00',
  priceLabel: 'Per month & subscription yearly',
  buttonLabel: 'Register Now',
  url: '#',
  trialButtonLabel: 'Or Start 14 Days trail',
  trialURL: '#',
  listItems: [{
    content: 'Unlimited secure storage'
  }, {
    content: '2,000s of Templates Ready'
  }, {
    content: 'Blog Tools'
  }, {
    content: '24/7 phone support'
  }, {
    content: '50+ Webmaster Tools'
  }]
}, {
  name: 'Premium Account',
  description: 'For Large teams or group who need to build website ',
  price: '$9.99',
  priceLabel: 'Per month & subscription yearly',
  buttonLabel: 'Register Now',
  url: '#',
  trialButtonLabel: 'Or Start 14 Days trail',
  trialURL: '#',
  listItems: [{
    content: 'Drag & Drop Builder'
  }, {
    content: '3,000s of Templates Ready'
  }, {
    content: 'Advanced branding'
  }, {
    content: 'Knowledge base support'
  }, {
    content: '80+ Webmaster Tools'
  }]
}];
exports.YEARLY_PRICING_TABLE = YEARLY_PRICING_TABLE;
var FAQ_DATA = [{
  expend: true,
  title: 'How to contact with Customer Service?',
  description: 'Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!. '
}, {
  title: 'App installation failed, how to update system information?',
  description: 'Please read the documentation carefully . We also have some online  video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum . '
}, {
  title: 'Website reponse taking time, how to improve?',
  description: 'At first, Please check your internet connection . We also have some online  video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum .'
}, {
  title: 'New update fixed all bug and issues?',
  description: 'We are giving the update of this theme continuously . You will receive an email Notification when we push an update. Always try to be updated with us .'
}];
exports.FAQ_DATA = FAQ_DATA;
var FOOTER_WIDGET = [{
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
exports.FOOTER_WIDGET = FOOTER_WIDGET;
var FEATURES = [{
  icon: 'flaticon-hourglass',
  title: 'App Development',
  description: 'Get your proof tests delivered home collect a sample from the news get design.'
}, {
  icon: 'flaticon-trophy-1',
  title: '10 Times Award',
  description: 'Get your proof tests delivered home collect a sample from the news get design.'
}, {
  icon: 'flaticon-upload',
  title: 'Cloud Storage',
  description: 'Get your proof tests delivered home collect a sample from the news get design.'
}, {
  icon: 'flaticon-settings',
  title: 'Customization',
  description: 'Get your proof tests delivered home collect a sample from the news get design.'
}, {
  icon: 'flaticon-strategy',
  title: 'UX Planning',
  description: 'Get your proof tests delivered home collect a sample from the news get design.'
}, {
  icon: 'flaticon-conversation',
  title: 'Customer Support',
  description: 'Get your proof tests delivered home collect a sample from the news get design.'
}];
exports.FEATURES = FEATURES;
var SCREENSHOTS = [{
  icon: _ic_monetization_on.ic_monetization_on,
  title: 'Budget Overview',
  image: _screen["default"]
}, {
  icon: _ic_settings.ic_settings,
  title: 'Create & Adjust',
  image: _screen["default"]
}, {
  icon: _pieChart.pieChart,
  title: 'View Reports',
  image: _screen["default"]
}, {
  icon: _briefcase.briefcase,
  title: 'Integrations',
  image: _screen["default"]
}];
exports.SCREENSHOTS = SCREENSHOTS;
var TESTIMONIALS = [{
  title: 'Modern look & trending design',
  review: 'Get working experience to work with this amazing team & in future want to work together for bright future projects and also make deposit to freelancer.',
  name: 'Jon Doe',
  designation: 'CEO of Dell Co.',
  avatar: "".concat(_author["default"])
}, {
  title: 'Modern look & trending design',
  review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore features Lorem ipsum dolor sit amet consectetur.',
  name: 'Jon Doe',
  designation: 'Co Founder of IBM',
  avatar: "".concat(_author2["default"])
}, {
  title: 'Modern look & trending design',
  review: 'Get working experience to work with this amazing team & in future want to work together for bright future projects and also make deposit to freelancer.',
  name: 'Jeny Doe',
  designation: 'Manager of Hp co.',
  avatar: "".concat(_author3["default"])
}];
exports.TESTIMONIALS = TESTIMONIALS;