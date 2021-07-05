"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FooterData = exports.CallToActionData = exports.BlogData = exports.YEARLY_PRICING_DATA = exports.MONTHLY_PRICING_DATA = exports.CounterData = exports.GalleryData = exports.TrackData = exports.WalletDashboardData = exports.secureTransaction = exports.features = exports.walletExperience = exports.chooseUs = exports.keyFeatures = exports.BannerData = exports.MENU_ITEMS = void 0;

var _bannerMoc = _interopRequireDefault(require("common/assets/image/app-minimal/banner-moc-1-1.png"));

var _keyFeature = _interopRequireDefault(require("common/assets/image/app-minimal/key-feature/key-feature-1.svg"));

var _keyFeature2 = _interopRequireDefault(require("common/assets/image/app-minimal/key-feature/key-feature-2.svg"));

var _keyFeature3 = _interopRequireDefault(require("common/assets/image/app-minimal/key-feature/key-feature-3.svg"));

var _keyFeature4 = _interopRequireDefault(require("common/assets/image/app-minimal/key-feature/key-feature-4.svg"));

var _chooseThumbnail = _interopRequireDefault(require("common/assets/image/app-minimal/choose-thumbnail.jpg"));

var _walletThumbnail = _interopRequireDefault(require("common/assets/image/app-minimal/wallet-thumbnail.jpg"));

var _walletThumbnailBubble = _interopRequireDefault(require("common/assets/image/app-minimal/wallet-thumbnail-bubble-1.png"));

var _walletThumbnailBubble2 = _interopRequireDefault(require("common/assets/image/app-minimal/wallet-thumbnail-bubble-2.png"));

var _walletThumbnailBubble3 = _interopRequireDefault(require("common/assets/image/app-minimal/wallet-thumbnail-bubble-3.png"));

var _experience = _interopRequireDefault(require("common/assets/image/app-minimal/wallet-experience/experience-1.svg"));

var _experience2 = _interopRequireDefault(require("common/assets/image/app-minimal/wallet-experience/experience-2.svg"));

var _featureIcon = _interopRequireDefault(require("common/assets/image/app-minimal/feature/feature-icon-1.svg"));

var _featureIcon2 = _interopRequireDefault(require("common/assets/image/app-minimal/feature/feature-icon-2.svg"));

var _featureIcon3 = _interopRequireDefault(require("common/assets/image/app-minimal/feature/feature-icon-3.svg"));

var _featureIcon4 = _interopRequireDefault(require("common/assets/image/app-minimal/feature/feature-icon-4.svg"));

var _featureIcon5 = _interopRequireDefault(require("common/assets/image/app-minimal/feature/feature-icon-5.svg"));

var _featureIcon6 = _interopRequireDefault(require("common/assets/image/app-minimal/feature/feature-icon-6.svg"));

var _secureTransaction = _interopRequireDefault(require("common/assets/image/app-minimal/secure-transaction.jpg"));

var _secureTransactionBubble = _interopRequireDefault(require("common/assets/image/app-minimal/secure-transaction-bubble-1.png"));

var _walletDashboard = _interopRequireDefault(require("common/assets/image/app-minimal/wallet-dashboard-1.png"));

var _graph = _interopRequireDefault(require("common/assets/image/app-minimal/graph-1-1.png"));

var _graph2 = _interopRequireDefault(require("common/assets/image/app-minimal/graph-1-2.png"));

var _gallery = _interopRequireDefault(require("common/assets/image/app-minimal/gallery/gallery-1-1.png"));

var _gallery2 = _interopRequireDefault(require("common/assets/image/app-minimal/gallery/gallery-1-2.png"));

var _gallery3 = _interopRequireDefault(require("common/assets/image/app-minimal/gallery/gallery-1-3.png"));

var _gallery4 = _interopRequireDefault(require("common/assets/image/app-minimal/gallery/gallery-1-4.png"));

var _blog = _interopRequireDefault(require("common/assets/image/app-minimal/blog/blog-1-1.png"));

var _blog2 = _interopRequireDefault(require("common/assets/image/app-minimal/blog/blog-1-2.png"));

var _blog3 = _interopRequireDefault(require("common/assets/image/app-minimal/blog/blog-1-3.png"));

var _logoFooter = _interopRequireDefault(require("common/assets/image/app-minimal/footer/logo-footer.svg"));

var _footerDribble = _interopRequireDefault(require("common/assets/image/app-minimal/footer/footer-dribble.svg"));

var _footerFacebook = _interopRequireDefault(require("common/assets/image/app-minimal/footer/footer-facebook.svg"));

var _footerTwitter = _interopRequireDefault(require("common/assets/image/app-minimal/footer/footer-twitter.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* app-minimal dummy data list :-
- Key Features
- Choose us
- Wallet Experience
- Features data
- Secure Transaction
- Footer Data
*/

/* ------------------------------------ */
// Menu data section

/* ------------------------------------ */
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
  label: 'Dashboard',
  path: '#dashboard_section',
  offset: '70'
}, {
  label: 'Pricing',
  path: '#pricing_section',
  offset: '70'
}, {
  label: 'Blog',
  path: '#blog_section',
  offset: '70'
}];
/* ------------------------------------ */
// Banner data section

/* ------------------------------------ */

exports.MENU_ITEMS = MENU_ITEMS;
var BannerData = {
  image: _bannerMoc["default"],
  title: 'Only trusted wallet apps that make your day beautiful',
  text: 'There will be a day–in our lifetime–when we get to celebrate every person on the planet having access. Moment Pro is the best software platform to collect reviews.',
  tagline: '*No Credit card required',
  button: {
    link: '#',
    label: 'Try it for free'
  }
};
/* ------------------------------------ */
// Key Features data section

/* ------------------------------------ */

exports.BannerData = BannerData;
var keyFeatures = {
  title: 'Business start with great features',
  description: 'Build an incredible workplace and grow your business with Gusto’s all-in-one platform with amazing contents.',
  features: [{
    id: 1,
    icon: _keyFeature["default"],
    title: 'Analytics Report',
    description: 'We’re driven beyond just finishing the projects. We want to find smart solutions.'
  }, {
    id: 2,
    icon: _keyFeature2["default"],
    title: 'User Customization',
    description: 'We’re driven beyond just finishing the projects. We want to find smart solutions.'
  }, {
    id: 3,
    icon: _keyFeature3["default"],
    title: 'Help & Support',
    description: 'We’re driven beyond just finishing the projects. We want to find smart solutions.'
  }, {
    id: 4,
    icon: _keyFeature4["default"],
    title: 'Use Accessibility',
    description: 'We’re driven beyond just finishing the projects. We want to find smart solutions.'
  }]
};
/* ------------------------------------ */
// Choose us data section

/* ------------------------------------ */

exports.keyFeatures = keyFeatures;
var chooseUs = {
  title: 'Why you choose Wallet app for your daily use?',
  description: 'Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool.',
  thumbnail: _chooseThumbnail["default"],
  features: [{
    id: 1,
    title: 'Easy to use application',
    description: 'We’re driven beyond just finishing the projects. We want to find solutions.'
  }, {
    id: 2,
    title: 'Transfer to touch share',
    description: 'We’re driven beyond just finishing the projects. We want to find solutions.'
  }, {
    id: 3,
    title: '100% Reliable with Privacy',
    description: 'We’re driven beyond just finishing the projects. We want to find solutions.'
  }]
};
/* ------------------------------------ */
// Wallet Experience data section

/* ------------------------------------ */

exports.chooseUs = chooseUs;
var walletExperience = {
  title: 'Take your wallet experience to new ultimate level',
  description: 'Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool.',
  image: {
    thumb: _walletThumbnail["default"],
    bubble: [{
      image: _walletThumbnailBubble["default"]
    }, {
      image: _walletThumbnailBubble2["default"]
    }, {
      image: _walletThumbnailBubble3["default"]
    }]
  },
  features: [{
    id: 1,
    icon: _experience["default"],
    title: 'Fast & Instant Transfer',
    description: 'We’re driven beyond just finishing the projects. We want to find solutions.'
  }, {
    id: 2,
    icon: _experience2["default"],
    title: 'File Management System',
    description: 'We’re driven beyond just finishing the projects. We want to find smart solutions.'
  }]
};
/* ------------------------------------ */
// Features data section

/* ------------------------------------ */

exports.walletExperience = walletExperience;
var features = {
  title: 'So How Does UserPlace Work ?',
  description: 'See some of the features below and learn why businesses trust UserPlace',
  items: [{
    id: 1,
    icon: _featureIcon["default"],
    title: 'Analytics Business',
    description: 'We’re driven beyond just finishing the projects. We want to find smart solutions.'
  }, {
    id: 2,
    icon: _featureIcon2["default"],
    title: 'Artificial Intelligence',
    description: 'We’re driven beyond just finishing the projects. We want to find smart solutions.'
  }, {
    id: 3,
    icon: _featureIcon3["default"],
    title: 'Privacy & Security',
    description: 'We’re driven beyond just finishing the projects. We want to find smart solutions.'
  }, {
    id: 4,
    icon: _featureIcon4["default"],
    title: 'Annual Reports',
    description: 'We’re driven beyond just finishing the projects. We want to find smart solutions.'
  }, {
    id: 5,
    icon: _featureIcon5["default"],
    title: 'Video Tutorial',
    description: 'We’re driven beyond just finishing the projects. We want to find smart solutions.'
  }, {
    id: 6,
    icon: _featureIcon6["default"],
    title: 'Performance Analysis',
    description: 'We’re driven beyond just finishing the projects. We want to find smart solutions.'
  }]
};
/* ------------------------------------ */
// Secure Transaction data section

/* ------------------------------------ */

exports.features = features;
var secureTransaction = {
  image: {
    thumb: _secureTransaction["default"],
    bubble: _secureTransactionBubble["default"]
  },
  title: 'Most promising secure transaction with fast & Entertaining',
  description: 'Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool. Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool.'
};
/* ------------------------------------ */
// WalletDashboard data section

/* ------------------------------------ */

exports.secureTransaction = secureTransaction;
var WalletDashboardData = [{
  step: 'Step 01',
  title: 'Create a free Account',
  image: _walletDashboard["default"]
}, {
  step: 'Step 02',
  title: 'Verified your Account',
  image: _walletDashboard["default"]
}, {
  step: 'Step 03',
  title: 'Monitor your Dashboard',
  image: _walletDashboard["default"]
}, {
  step: 'Step 04',
  title: 'Promote & Refer Account',
  image: _walletDashboard["default"]
}];
/* ------------------------------------ */
// Track data section

/* ------------------------------------ */

exports.WalletDashboardData = WalletDashboardData;
var TrackData = {
  title: 'The Most Effective wallet app to track your ultimate daily transaction',
  paragraph: [{
    text: 'Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool. Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool. There will be a day–in our lifetime–when we get to celebrate every person on the planet having access. Moment Pro is the best software platform to collect reviews.'
  }, {
    text: 'There will be a day–in our lifetime–when we get to celebrate every person on the planet having access. Moment Pro is the best software platform to collect reviews. Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool. Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool.'
  }],
  trackBox: [{
    image: _graph["default"],
    count: '38',
    text: 'Avarage Convension Rate'
  }, {
    image: _graph2["default"],
    count: '53',
    text: 'Avarage Growth Rate'
  }]
};
/* ------------------------------------ */
// Gallery data section

/* ------------------------------------ */

exports.TrackData = TrackData;
var GalleryData = [{
  image: _gallery["default"]
}, {
  image: _gallery2["default"]
}, {
  image: _gallery3["default"]
}, {
  image: _gallery4["default"]
}];
/* ------------------------------------ */
// Counter data section

/* ------------------------------------ */

exports.GalleryData = GalleryData;
var CounterData = {
  blockTitle: {
    title: 'Let’s take your wallet Experience to the next level',
    tagline: 'Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool. Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool.'
  },
  countBox: [{
    number: '15',
    text: 'average increase in bookings',
    button: {
      label: 'Read story',
      link: '#'
    }
  }, {
    number: '73',
    text: 'increase in free account conversions',
    button: {
      label: 'Read story',
      link: '#'
    }
  }, {
    number: '28',
    text: 'increase in reservations',
    button: {
      label: 'Read story',
      link: '#'
    }
  }]
};
/* ------------------------------------ */
// Pricing data section

/* ------------------------------------ */

exports.CounterData = CounterData;
var MONTHLY_PRICING_DATA = [{
  recommended: false,
  title: 'Lite',
  price: 'Free',
  tagline: 'with restrictions',
  planLabel: 'Plan includes:',
  options: [{
    text: 'Manage conversations directly from your websites optimization.'
  }, {
    text: 'Unlimited links'
  }, {
    text: 'Chat promt supported'
  }, {
    text: 'Optimzed hashtags'
  }, {
    text: 'Own analytics platform'
  }],
  button: {
    label: 'Start 14 days of free trial',
    link: '#'
  }
}, {
  recommended: true,
  title: 'Pro',
  price: '$15.93',
  tagline: 'Monthly',
  planLabel: 'Plan includes:',
  options: [{
    text: 'Manage conversations directly from your websites optimization.'
  }, {
    text: 'Unlimited links'
  }, {
    text: 'Chat promt supported'
  }, {
    text: 'Optimzed hashtags'
  }, {
    text: 'Own analytics platform'
  }],
  button: {
    label: 'Start 14 days of free trial',
    link: '#'
  }
}];
exports.MONTHLY_PRICING_DATA = MONTHLY_PRICING_DATA;
var YEARLY_PRICING_DATA = [{
  recommended: false,
  title: 'Lite',
  price: 'Free',
  tagline: 'with restrictions',
  planLabel: 'Plan includes:',
  options: [{
    text: 'Manage conversations directly from your websites optimization.'
  }, {
    text: 'Unlimited links'
  }, {
    text: 'Chat promt supported'
  }, {
    text: 'Optimzed hashtags'
  }, {
    text: 'Own analytics platform'
  }],
  button: {
    label: 'Start 14 days of free trial',
    link: '#'
  }
}, {
  recommended: true,
  title: 'Pro',
  price: '$99.93',
  tagline: 'Yearly',
  planLabel: 'Plan includes:',
  options: [{
    text: 'Manage conversations directly from your websites optimization.'
  }, {
    text: 'Unlimited links'
  }, {
    text: 'Chat promt supported'
  }, {
    text: 'Optimzed hashtags'
  }, {
    text: 'Own analytics platform'
  }],
  button: {
    label: 'Start 14 days of free trial',
    link: '#'
  }
}];
/* ------------------------------------ */
// Blog data section

/* ------------------------------------ */

exports.YEARLY_PRICING_DATA = YEARLY_PRICING_DATA;
var BlogData = [{
  image: _blog["default"],
  title: 'The 3 Fundamental Rules to Keep Your Website Goal Orientated',
  link: '#'
}, {
  image: _blog2["default"],
  title: 'Why the Best Websites Focus on Their Conversion Funnel',
  link: '#'
}, {
  image: _blog3["default"],
  title: 'Acquire More Leads Through Your Website By Switching Perspectives',
  link: '#'
}];
/* ------------------------------------ */
// Call To Action data section

/* ------------------------------------ */

exports.BlogData = BlogData;
var CallToActionData = {
  title: 'Are you Interested? Join our waitlist',
  text: "We're launching soon - join our waitlist to get early access.",
  link: {
    label: 'Join Waitlist Today',
    path: '#'
  }
};
/* ------------------------------------ */
// Footer data section

/* ------------------------------------ */

exports.CallToActionData = CallToActionData;
var FooterData = {
  menu: [{
    link: '#',
    label: 'Support'
  }, {
    link: '#',
    label: 'About Us'
  }, {
    link: '#',
    label: 'Privacy'
  }, {
    link: '#',
    label: 'Contact'
  }],
  logo: _logoFooter["default"],
  social: [{
    link: '#',
    icon: _footerFacebook["default"]
  }, {
    link: '#',
    icon: _footerTwitter["default"]
  }, {
    link: '#',
    icon: _footerDribble["default"]
  }]
};
exports.FooterData = FooterData;