"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.joinSlack = exports.faq = exports.testimonial = exports.pricing = exports.featuresTab = exports.designAndBuilt = exports.features = exports.appSlider = exports.keyFeatures = exports.client = exports.navbar = void 0;

var _logo = _interopRequireDefault(require("common/assets/image/appClassic/logo.png"));

var _client = _interopRequireDefault(require("common/assets/image/appClassic/client1.svg"));

var _client2 = _interopRequireDefault(require("common/assets/image/appClassic/client2.svg"));

var _client3 = _interopRequireDefault(require("common/assets/image/appClassic/client3.svg"));

var _client4 = _interopRequireDefault(require("common/assets/image/appClassic/client4.svg"));

var _keyFeature = _interopRequireDefault(require("common/assets/image/appClassic/keyFeature-1.svg"));

var _keyFeature2 = _interopRequireDefault(require("common/assets/image/appClassic/keyFeature-2.svg"));

var _keyFeature3 = _interopRequireDefault(require("common/assets/image/appClassic/keyFeature-3.svg"));

var _appSlider = _interopRequireDefault(require("common/assets/image/appClassic/appSlider1.png"));

var _appSlider2 = _interopRequireDefault(require("common/assets/image/appClassic/appSlider2.png"));

var _appSlider3 = _interopRequireDefault(require("common/assets/image/appClassic/appSlider3.png"));

var _featureIcon = _interopRequireDefault(require("common/assets/image/appClassic/featureIcon-1.svg"));

var _featureIcon2 = _interopRequireDefault(require("common/assets/image/appClassic/featureIcon-2.svg"));

var _featureIcon3 = _interopRequireDefault(require("common/assets/image/appClassic/featureIcon-3.svg"));

var _featureIcon4 = _interopRequireDefault(require("common/assets/image/appClassic/featureIcon-4.svg"));

var _featureIcon5 = _interopRequireDefault(require("common/assets/image/appClassic/featureIcon-5.svg"));

var _featureIcon6 = _interopRequireDefault(require("common/assets/image/appClassic/featureIcon-6.svg"));

var _appAndMap = _interopRequireDefault(require("common/assets/image/appClassic/appAndMap.png"));

var _appTabIcon = _interopRequireDefault(require("common/assets/image/appClassic/appTabIcon1.svg"));

var _appTabIcon2 = _interopRequireDefault(require("common/assets/image/appClassic/appTabIcon2.svg"));

var _appTabIcon3 = _interopRequireDefault(require("common/assets/image/appClassic/appTabIcon3.svg"));

var _appTabIcon4 = _interopRequireDefault(require("common/assets/image/appClassic/appTabIcon4.svg"));

var _appTabIcon5 = _interopRequireDefault(require("common/assets/image/appClassic/appTabIcon5.svg"));

var _appTabIcon6 = _interopRequireDefault(require("common/assets/image/appClassic/appTabIcon6.svg"));

var _appTabImg = _interopRequireDefault(require("common/assets/image/appClassic/appTabImg1.png"));

var _appTabImg2 = _interopRequireDefault(require("common/assets/image/appClassic/appTabImg2.png"));

var _appTabImg3 = _interopRequireDefault(require("common/assets/image/appClassic/appTabImg3.png"));

var _appTabImg4 = _interopRequireDefault(require("common/assets/image/appClassic/appTabImg4.png"));

var _appTabImg5 = _interopRequireDefault(require("common/assets/image/appClassic/appTabImg5.png"));

var _appTabImg6 = _interopRequireDefault(require("common/assets/image/appClassic/appTabImg6.png"));

var _slack = _interopRequireDefault(require("common/assets/image/appClassic/slack.png"));

var _chat = _interopRequireDefault(require("common/assets/image/appClassic/chat.svg"));

var _group = _interopRequireDefault(require("common/assets/image/appClassic/group.svg"));

var _github = _interopRequireDefault(require("common/assets/image/appClassic/github.svg"));

var _logoWhite = _interopRequireDefault(require("common/assets/image/appClassic/logoWhite.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* appClassic dummy data list :-
- Navbar
- Client
- Key Feature section
- App Slider
- Features section
- Design and built
- Feature tab
- Pricing policy
- Testimonial section
- Faq section
- Join slack
- Footer
  - widget
  - logo
  - menu
  - copyright 
*/

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
    path: '#keyFeatures',
    offset: '84'
  }, {
    id: 3,
    label: 'Pricing',
    path: '#pricing',
    offset: '84'
  }, {
    id: 4,
    label: 'Testimonial',
    path: '#testimonial',
    offset: '80'
  }, {
    id: 5,
    label: 'Faq',
    path: '#faq',
    offset: '80'
  }]
};
/* ------------------------------------ */
// client data section

/* ------------------------------------ */

exports.navbar = navbar;
var client = [{
  id: 1,
  image: _client["default"],
  title: 'The new york times'
}, {
  id: 2,
  image: _client2["default"],
  title: 'amazon'
}, {
  id: 3,
  image: _client3["default"],
  title: 'evernote'
}, {
  id: 4,
  image: _client4["default"],
  title: 'the verge'
}];
/* ------------------------------------ */
// Key Features data section

/* ------------------------------------ */

exports.client = client;
var keyFeatures = {
  slogan: 'WHATS THE FUNCTION',
  title: 'Meet the feature of app',
  features: [{
    id: 1,
    color: '#F55767',
    icon: _keyFeature["default"],
    title: 'Fast Performance',
    description: 'Get your blood tests delivered at home collect a sample from the news your blood tests.'
  }, {
    id: 2,
    color: '#2563FF',
    icon: _keyFeature2["default"],
    title: 'Prototyping',
    description: 'Get your blood tests delivered at home collect a sample from the news your blood tests.'
  }, {
    id: 3,
    color: '#40975F',
    icon: _keyFeature3["default"],
    title: 'Vector Editing',
    description: 'Get your blood tests delivered at home collect a sample from the news your blood tests.'
  }]
};
/* ------------------------------------ */
// App slider data section

/* ------------------------------------ */

exports.keyFeatures = keyFeatures;
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
    icon: 'flaticon-bitcoin',
    title: 'Automatic Payouts',
    description: 'Casinos no longer control the payout process.'
  }, {
    id: 2,
    icon: 'flaticon-atom',
    title: 'Network Effect',
    description: 'Big player rewards with the added security and transparency provided by the blockchain.'
  }, {
    id: 3,
    icon: 'flaticon-money-bag',
    title: 'Bigger Rewards Method',
    description: 'Casinos contribute 1% of wagers to decentralised prize pool Players are incentivized to play more to win bigger rewards.'
  }]
};
/* ------------------------------------ */
// Features data section

/* ------------------------------------ */

exports.appSlider = appSlider;
var features = {
  slogan: 'PRODUCT COMPARISON',
  title: 'Why you choose our App',
  items: [{
    id: 1,
    color: '#F55767',
    icon: _featureIcon["default"],
    title: 'App Development',
    description: 'Get your proof tests delivered home collect a sample from the news get design.'
  }, {
    id: 2,
    color: '#3DABDD',
    icon: _featureIcon2["default"],
    title: '10 Times Award',
    description: 'Get your proof tests delivered home collect a sample from the news get design.'
  }, {
    id: 3,
    color: '#D6AB00',
    icon: _featureIcon3["default"],
    title: 'Cloud Storage',
    description: 'Get your proof tests delivered home collect a sample from the news get design.'
  }, {
    id: 4,
    color: '#40975F',
    icon: _featureIcon4["default"],
    title: 'Customization',
    description: 'Get your proof tests delivered home collect a sample from the news get design.'
  }, {
    id: 5,
    color: '#5856D6',
    icon: _featureIcon5["default"],
    title: 'UX Planning',
    description: 'Get your proof tests delivered home collect a sample from the news get design.'
  }, {
    id: 6,
    color: '#E97325',
    icon: _featureIcon6["default"],
    title: 'Customer Support',
    description: 'Get your proof tests delivered home collect a sample from the news get design.'
  }]
};
/* ------------------------------------ */
// Design and built data section

/* ------------------------------------ */

exports.features = features;
var designAndBuilt = {
  image: _appAndMap["default"],
  title: 'Designed & Built by the latest code integration',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore features that Lorem ipsum dolor sit amet consectetur.'
};
/* ------------------------------------ */
// Feature tab data section

/* ------------------------------------ */

exports.designAndBuilt = designAndBuilt;
var featuresTab = {
  slogan: 'DIFFERENTIATION',
  title: 'Ultimate features that we built',
  tab: [{
    id: 1,
    color: '#F55767',
    icon: _appTabIcon["default"],
    title: 'App Development',
    description: 'Get your proof tests delivered home collect a sample.',
    image: _appTabImg["default"]
  }, {
    id: 2,
    color: '#40975F',
    icon: _appTabIcon2["default"],
    title: 'Customization',
    description: 'Get your proof tests delivered home collect a sample.',
    image: _appTabImg2["default"]
  }, {
    id: 3,
    color: '#5856D6',
    icon: _appTabIcon3["default"],
    title: 'UX Planning',
    description: 'Get your proof tests delivered home collect a sample.',
    image: _appTabImg3["default"]
  }, {
    id: 4,
    color: '#D6AB00',
    icon: _appTabIcon4["default"],
    title: 'Cloud Storage',
    description: 'Get your proof tests delivered home collect a sample.',
    image: _appTabImg4["default"]
  }, {
    id: 5,
    color: '#E97325',
    icon: _appTabIcon5["default"],
    title: 'Customer Support',
    description: 'Get your proof tests delivered home collect a sample.',
    image: _appTabImg5["default"]
  }, {
    id: 6,
    color: '#3DABDD',
    icon: _appTabIcon6["default"],
    title: '10 Times Award',
    description: 'Get your proof tests delivered home collect a sample.',
    image: _appTabImg6["default"]
  }]
};
/* ------------------------------------ */
// Pricing policy data section

/* ------------------------------------ */

exports.featuresTab = featuresTab;
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
// Testimonial data section

/* ------------------------------------ */

exports.pricing = pricing;
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
// Faq data section

/* ------------------------------------ */

exports.testimonial = testimonial;
var faq = {
  slogan: 'FREQUENT QUESTION',
  title: 'Do you have any question',
  faqs: [{
    id: 1,
    question: 'How to contact with riders emergency?',
    answer: 'Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home. Your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news.'
  }, {
    id: 2,
    question: 'App installation failed, how to update system information?',
    answer: 'Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home. Your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news.'
  }, {
    id: 3,
    question: 'Website reponse taking time, how to improve?',
    answer: 'Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home. Your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news.'
  }, {
    id: 4,
    question: 'New update fixed all bug and issues',
    answer: 'Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home. Your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news.'
  }]
};
/* ------------------------------------ */
// Join Slack data section

/* ------------------------------------ */

exports.faq = faq;
var joinSlack = {
  logo: _slack["default"],
  title: 'Start your 30 days free trail today!',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore.'
};
/* ------------------------------------ */
// Footer data section

/* ------------------------------------ */

exports.joinSlack = joinSlack;
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
  logo: _logoWhite["default"],
  menu: [{
    id: 1,
    text: 'Home',
    link: '#'
  }, {
    id: 2,
    text: 'Adversite',
    link: '#'
  }, {
    id: 3,
    text: 'Supports',
    link: '#'
  }, {
    id: 4,
    text: 'Marketing',
    link: '#'
  }, {
    id: 5,
    text: 'Contact',
    link: '#'
  }]
};
exports.footer = footer;