"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.testimonial = exports.teamportfolio = exports.pricing = exports.productData = exports.designAndBuilt = exports.appSlider = exports.features = exports.client = exports.navbar = void 0;

var _logo = _interopRequireDefault(require("common/assets/image/appModern/logo.png"));

var _freeBrandsSvgIcons = require("@fortawesome/free-brands-svg-icons");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _company = _interopRequireDefault(require("common/assets/image/appModern/company1.png"));

var _company2 = _interopRequireDefault(require("common/assets/image/appModern/company2.png"));

var _company3 = _interopRequireDefault(require("common/assets/image/appModern/company3.png"));

var _company4 = _interopRequireDefault(require("common/assets/image/appModern/company4.png"));

var _icon = _interopRequireDefault(require("common/assets/image/appModern/icon1.svg"));

var _icon2 = _interopRequireDefault(require("common/assets/image/appModern/icon2.svg"));

var _icon3 = _interopRequireDefault(require("common/assets/image/appModern/icon3.svg"));

var _icon4 = _interopRequireDefault(require("common/assets/image/appModern/icon4.svg"));

var _appSlider = _interopRequireDefault(require("common/assets/image/appModern/appSlider1.png"));

var _appSlider2 = _interopRequireDefault(require("common/assets/image/appModern/appSlider2.png"));

var _appSlider3 = _interopRequireDefault(require("common/assets/image/appModern/appSlider3.png"));

var _code = _interopRequireDefault(require("common/assets/image/appModern/code.png"));

var _page = _interopRequireDefault(require("common/assets/image/appModern/page1.png"));

var _page2 = _interopRequireDefault(require("common/assets/image/appModern/page2.png"));

var _page3 = _interopRequireDefault(require("common/assets/image/appModern/page3.png"));

var _ = _interopRequireDefault(require("common/assets/image/appModern/1.png"));

var _2 = _interopRequireDefault(require("common/assets/image/appModern/2.png"));

var _3 = _interopRequireDefault(require("common/assets/image/appModern/3.png"));

var _4 = _interopRequireDefault(require("common/assets/image/appModern/4.png"));

var _5 = _interopRequireDefault(require("common/assets/image/appModern/5.png"));

var _6 = _interopRequireDefault(require("common/assets/image/appModern/6.png"));

var _7 = _interopRequireDefault(require("common/assets/image/appModern/7.png"));

var _chat = _interopRequireDefault(require("common/assets/image/appModern/chat.svg"));

var _group = _interopRequireDefault(require("common/assets/image/appModern/group.svg"));

var _github = _interopRequireDefault(require("common/assets/image/appModern/github.svg"));

var _oakLogo = _interopRequireDefault(require("common/assets/image/appModern/oak-logo.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* ------------------------------------ */
// Navbar data section

/* ------------------------------------ */
var navbar = {
  logo: _logo["default"],
  navMenu: [{
    id: 1,
    label: 'Recommended',
    path: '#Recommended',
    offset: '84'
  }, {
    id: 2,
    label: 'Tutorial',
    path: '#Tutorial',
    offset: '81'
  }, {
    id: 3,
    label: 'FAQ',
    path: '#FAQ',
    offset: '81'
  }, {
    id: 4,
    label: 'Become a Matching Partner',
    path: '#Become a Matching Partner',
    offset: '81'
  }]
};
/* ------------------------------------ */
// client data section

/* ------------------------------------ */

exports.navbar = navbar;
var client = [{
  id: 1,
  image: _company["default"],
  title: 'The new york times'
}, {
  id: 2,
  image: _company2["default"],
  title: 'amazon'
}, {
  id: 3,
  image: _company3["default"],
  title: 'evernote'
}, {
  id: 4,
  image: _company4["default"],
  title: 'the verge'
}];
/* ------------------------------------ */
// Features data section

/* ------------------------------------ */

exports.client = client;
var features = {
  slogan: 'KEY FEATURES',
  title: 'Why you choose our app',
  items: [{
    id: 1,
    color: '#F55767',
    icon: _icon["default"],
    title: 'App Development',
    description: 'We are specialized at custom Saas Application Development and special features.'
  }, {
    id: 2,
    color: '#ff4742',
    icon: _icon2["default"],
    title: '10 Times Award',
    description: 'We are globally recognised for our services and won a lot of prices around the world .'
  }, {
    id: 3,
    color: '#fb5781',
    icon: _icon3["default"],
    title: 'Cloud Storage',
    description: 'LiteSpeed Web Server known for its high performance and low resource consumption.'
  }, {
    id: 4,
    color: '#f18e47',
    icon: _icon4["default"],
    title: 'Customization',
    description: 'Client Satisfaction is our first priority and We are best at it. Keep In Touch for the best output. '
  }]
};
/* ------------------------------------ */
// App slider data section

/* ------------------------------------ */

exports.features = features;
var appSlider = {
  carousel: [{
    id: 1,
    image: _appSlider["default"],
    title: 'App Slide 1'
  }, {
    id: 2,
    image: _appSlider2["default"],
    title: 'App Slide 1'
  }, {
    id: 3,
    image: _appSlider3["default"],
    title: 'App Slide 1'
  }],
  title: 'Smart Jackpots that you may love this anytime & anywhere',
  description: "The rise of mobile devices transforms the way we consume information entirely and the world's most elevant channels such as Facebook.",
  features: [{
    id: 1,
    icon: _icon["default"],
    title: 'Easy Invoicing',
    description: 'Surprice your clients with professional looking invoices.'
  }, {
    id: 2,
    icon: _icon["default"],
    title: 'UX Planning',
    description: 'UI/UX Design by following and maintaining the latest trends .'
  }, {
    id: 3,
    icon: _icon["default"],
    title: 'Customer Support',
    description: 'A Dedicated support team will be always ready for you.'
  }]
};
/* ------------------------------------ */
// Design and built data section

/* ------------------------------------ */

exports.appSlider = appSlider;
var designAndBuilt = {
  image: _code["default"],
  slogan: 'CODE INTEGRATION',
  title: 'Introducing coding features of our apps with Customization',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore features that Lorem ipsum dolor sit amet consectetur.'
};
/* ------------------------------------ */
// Product  Slide  section

/* ------------------------------------ */

exports.designAndBuilt = designAndBuilt;
var productData = {
  slogan: 'PRODUCT SHOWCASE',
  title: 'Meet Client Satisfaction by using our product',
  carousel: [{
    id: 1,
    thumb_url: _page["default"],
    link: '#1',
    title: 'slide 1'
  }, {
    id: 2,
    thumb_url: _page2["default"],
    link: '#1',
    title: 'slide 2'
  }, {
    id: 3,
    thumb_url: _page3["default"],
    link: '#1',
    title: 'slide 3'
  }, {
    id: 4,
    thumb_url: _page["default"],
    link: '#1',
    title: 'slide 4'
  }, {
    id: 5,
    thumb_url: _page3["default"],
    link: '#1',
    title: 'slide 5'
  }, {
    id: 6,
    thumb_url: _page2["default"],
    link: '#1',
    title: 'slide 6'
  }]
};
/* ------------------------------------ */
// Pricing policy data section

/* ------------------------------------ */

exports.productData = productData;
var pricing = {
  slogan: 'PRICING PLAN',
  title: 'Choose your pricing policy',
  monthly: [{
    id: 1,
    title: 'Business Class',
    description: 'For Small teams or office',
    suggested: false,
    price: 0,
    features: [{
      id: 1,
      text: 'Drag & Drop Builder'
    }, {
      id: 2,
      text: "1,000's of Templates"
    }, {
      id: 3,
      text: 'Blog Support Tools'
    }, {
      id: 4,
      text: 'eCommerce Store '
    }]
  }, {
    id: 2,
    title: 'Pro Master',
    description: 'For Best opportunities',
    suggested: true,
    price: 99,
    trail: 14,
    trailLink: '#',
    features: [{
      id: 1,
      text: 'Drag & Drop Builder'
    }, {
      id: 2,
      text: "1,000's of Templates"
    }, {
      id: 3,
      text: 'Blog Support Tools'
    }, {
      id: 4,
      text: 'eCommerce Store '
    }]
  }],
  annualy: [{
    id: 1,
    title: 'Pro Master',
    description: 'For Small teams or office',
    suggested: true,
    price: 999,
    trail: 14,
    trailLink: '#',
    features: [{
      id: 1,
      text: 'Drag & Drop Builder'
    }, {
      id: 2,
      text: "1,000's of Templates"
    }, {
      id: 3,
      text: 'Blog Support Tools'
    }, {
      id: 4,
      text: 'eCommerce Store '
    }]
  }, {
    id: 2,
    title: 'Enterprise',
    description: 'For Best opportunities',
    suggested: false,
    price: 1299,
    trail: 30,
    trailLink: '#',
    features: [{
      id: 1,
      text: 'Drag & Drop Builder'
    }, {
      id: 2,
      text: "1,000's of Templates"
    }, {
      id: 3,
      text: 'Blog Support Tools'
    }, {
      id: 4,
      text: 'eCommerce Store '
    }]
  }]
};
/* ------------------------------------ */
// Team Portfolio data section

/* ------------------------------------ */

exports.pricing = pricing;
var teamportfolio = {
  title: 'Meet our awesome team members, work behind the sense',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore features that Lorem ipsum dolor sit amet consectetur.',
  teammember: [{
    id: 1,
    img: _["default"],
    text: 'Berlin Corleone'
  }, {
    id: 2,
    img: _2["default"],
    text: 'Jona White'
  }, {
    id: 3,
    img: _3["default"],
    text: 'Michael Price'
  }, {
    id: 4,
    img: _4["default"],
    text: 'Gullyboy Rana'
  }, {
    id: 5,
    img: _5["default"],
    text: 'Miss Clair'
  }, {
    id: 6,
    img: _6["default"],
    text: 'Bucky Ali'
  }, {
    id: 7,
    img: _7["default"],
    text: 'Arthus Doe'
  }]
};
/* ------------------------------------ */
// Testimonial data section

/* ------------------------------------ */

exports.teamportfolio = teamportfolio;
var testimonial = {
  slogan: 'TESTIMONIAL',
  title: 'Meet Client Satisfaction by using product',
  reviews: [{
    id: 1,
    title: 'Modern look & trending design',
    description: 'Get working experience to work with this amazing team & in future want to work together for bright future projects and also make deposit to freelancer.',
    avatar: 'https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg',
    name: 'Jon Doe',
    designation: 'CEO of RedQ Inc.',
    review: 4
  }, {
    id: 2,
    title: 'User friendly & Customizable',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore features Lorem ipsum dolor sit amet consectetur adipisicing.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Jeny Doe',
    designation: 'Co Founder of RedQ Inc.',
    review: 5
  }, {
    id: 3,
    title: 'User friendly & Customizable',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore features Lorem ipsum dolor sit amet consectetur adipisicing.',
    avatar: 'https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg',
    name: 'Jon Doe',
    designation: 'Co Founder of RedQ Inc.',
    review: 5
  }]
};
/* ------------------------------------ */
// Footer data section

/* ------------------------------------ */

exports.testimonial = testimonial;
var footer = {
  widgets: [{
    id: 1,
    icon: _chat["default"],
    title: 'Join the Community',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore.'
  }, {
    id: 2,
    icon: _group["default"],
    title: 'Join in Chat Community',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore.'
  }, {
    id: 3,
    icon: _github["default"],
    title: 'Github Access',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore.'
  }],
  logo: _oakLogo["default"],
  menu: [{
    id: 1,
    text: 'Home',
    link: '#'
  }, {
    id: 2,
    text: 'Recommended',
    link: '#'
  }, {
    id: 3,
    text: 'Tutorial',
    link: '#'
  }, {
    id: 4,
    text: 'FAQ',
    link: '#'
  }, {
    id: 5,
    text: 'Become a Matching Partner',
    link: '#'
  }],
  socialMedia: [{
    name: 'twitter',
    link: 'https://twitter.com/OAKSubstrate',
    icon: _freeBrandsSvgIcons.faTwitter
  }, {
    name: 'discord',
    link: 'https://discord.gg/xKKq5AXV',
    icon: _freeBrandsSvgIcons.faDiscord
  }, {
    name: 'wechat',
    link: 'wechat',
    icon: _freeBrandsSvgIcons.faWeixin
  }, {
    name: 'telegram',
    link: '',
    icon: _freeBrandsSvgIcons.faTelegram
  }, {
    name: 'medium',
    link: 'https://medium.com/oak-blockchain',
    icon: _freeBrandsSvgIcons.faMedium
  }, {
    name: 'linkedin',
    link: 'https://www.linkedin.com/company/oak-blockchain/',
    icon: _freeBrandsSvgIcons.faLinkedin
  }, {
    name: 'github',
    link: 'https://github.com/OAK-Foundation/',
    icon: _freeBrandsSvgIcons.faGithubSquare
  }, {
    name: 'email',
    link: 'https://twitter.com/OAKSubstrate',
    icon: _freeSolidSvgIcons.faEnvelopeSquare
  }]
};
exports.footer = footer;