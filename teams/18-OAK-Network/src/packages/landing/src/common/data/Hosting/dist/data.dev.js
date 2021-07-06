"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMAIN_PRICE = exports.DOMAIN_NAMES = exports.TESTIMONIALS = exports.YEARLY_PRICING_TABLE = exports.MONTHLY_PRICING_TABLE = exports.FOOTER_WIDGET = exports.MENU_ITEMS = exports.SERVICES_DATA = exports.FAQ_DATA = exports.FEATURES_DATA = void 0;

var _images = require("./images");

// Feature Section Content
var FEATURES_DATA = [{
  title: 'Domain Registration & Web Hosting',
  description: 'We have support team for 24/7 operation. They provide help and ongoing assistance at any time.',
  icon: 'flaticon-trophy violate',
  animation: true
}, {
  title: 'Website Design & Development',
  description: 'Transferring from another host? Our expert support team is standing by to transfer your site.',
  icon: 'flaticon-startup yellow',
  animation: true
}, {
  title: 'Dedicated Server & Cloud Hosting',
  description: 'LiteSpeed Web Server is a high-performance HTTP server and known for its high performance.',
  icon: 'flaticon-creative green',
  animation: true
}]; // FAQ Section Content

exports.FEATURES_DATA = FEATURES_DATA;
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
}]; // Service Section Content

exports.FAQ_DATA = FAQ_DATA;
var SERVICES_DATA = [{
  title: 'Development Server ',
  description: 'Get Lightspeed Development Server for your website and fly in the web',
  icon: "".concat(_images.IconOne)
}, {
  title: 'Web Protection',
  description: 'Best Protection and some tools are provided with our Web servers .',
  icon: "".concat(_images.IconTwo)
}, {
  title: 'E-commerce Shop',
  description: 'You can build any kind of E-commerce Shop with payment security tools',
  icon: "".concat(_images.IconThree)
}, {
  title: 'Money Back Guarantee',
  description: 'We have provided 30 days money back guarantee for our customer',
  icon: "".concat(_images.IconFour)
}, {
  title: 'Client Satisfaction',
  description: 'Client Satisfaction is our first priority and We are best at it',
  icon: "".concat(_images.IconFive)
}, {
  title: '24/7 Online Support',
  description: 'A Dedicated support team is always ready to provide best support ',
  icon: "".concat(_images.IconSix)
}];
exports.SERVICES_DATA = SERVICES_DATA;
var MENU_ITEMS = [{
  label: 'Home',
  path: '#banner_section',
  offset: '70'
}, {
  label: 'Feature',
  path: '#feature_section',
  offset: '70'
}, {
  label: 'Service',
  path: '#service_section',
  offset: '70'
}, {
  label: 'Testimonial',
  path: '#testimonial_section',
  offset: '70'
}, {
  label: 'FAQ',
  path: '#faq_section',
  offset: '70'
}, {
  label: 'Contact',
  path: '#contact_section',
  offset: '70'
}];
exports.MENU_ITEMS = MENU_ITEMS;
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
var MONTHLY_PRICING_TABLE = [{
  freePlan: true,
  name: 'Basic Account',
  description: 'For Small teams or group who need to build website ',
  price: '$0',
  priceLabel: 'Only for first month',
  buttonLabel: 'CREATE FREE ACCOUNT',
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
  buttonLabel: 'START FREE TRIAL',
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
  name: 'Premium Account',
  description: 'For Large teams or group who need to build website ',
  price: '$12.98',
  priceLabel: 'Per month & subscription yearly',
  buttonLabel: 'START FREE TRIAL',
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
}];
exports.MONTHLY_PRICING_TABLE = MONTHLY_PRICING_TABLE;
var YEARLY_PRICING_TABLE = [{
  freePlan: true,
  name: 'Basic Account',
  description: 'For a single client or team who need to build website ',
  price: '$0',
  priceLabel: 'Only for first month',
  buttonLabel: 'CREATE FREE ACCOUNT',
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
  buttonLabel: 'START FREE TRIAL',
  url: '#',
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
  buttonLabel: 'START FREE TRIAL',
  url: '#',
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
var TESTIMONIALS = [{
  review: 'Best working experience  with this amazing team & in future, we want to work together',
  name: 'Jon Doe',
  designation: 'CEO of Dell Co.',
  avatar: "".concat(_images.AuthorOne)
}, {
  review: 'Impressed with master class support of the team and really look forward for the future.',
  name: 'Jon Doe',
  designation: 'Co Founder of IBM',
  avatar: "".concat(_images.AuthorTwo)
}, {
  review: 'I have bought more than 10 themes on ThemeForest, and this is the first one I review.',
  name: 'Jeny Doe',
  designation: 'Manager of Hp co.',
  avatar: "".concat(_images.AuthorThree)
}];
exports.TESTIMONIALS = TESTIMONIALS;
var DOMAIN_NAMES = [{
  label: '.com',
  value: 'com'
}, {
  label: '.net',
  value: 'net'
}, {
  label: '.org',
  value: 'org'
}, {
  label: '.co',
  value: 'co'
}, {
  label: '.edu',
  value: 'edu'
}, {
  label: '.me',
  value: 'me'
}];
exports.DOMAIN_NAMES = DOMAIN_NAMES;
var DOMAIN_PRICE = [{
  content: '.com $9.26'
}, {
  content: '.sg $7.91'
}, {
  content: '.space $12.54'
}, {
  content: '.info $9.13'
}, {
  content: '& much more',
  url: '#'
}];
exports.DOMAIN_PRICE = DOMAIN_PRICE;