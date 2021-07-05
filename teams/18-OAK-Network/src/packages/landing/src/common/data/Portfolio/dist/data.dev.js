"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FOOTER_MENU = exports.TESTIMONIAL = exports.CLIENTS = exports.SKILLS = exports.SERVICE_LIST = exports.PROCESS_STEPS = exports.PORTFOLIO_SHOWCASE = exports.AWARDS = exports.MENU_ITEMS = exports.SOCIAL_PROFILES = void 0;

var _socialTwitter = require("react-icons-kit/ionicons/socialTwitter");

var _socialFacebook = require("react-icons-kit/ionicons/socialFacebook");

var _socialDribbbleOutline = require("react-icons-kit/ionicons/socialDribbbleOutline");

var _socialGithub = require("react-icons-kit/ionicons/socialGithub");

var _socialGoogleplusOutline = require("react-icons-kit/ionicons/socialGoogleplusOutline");

var _awardee = _interopRequireDefault(require("../../assets/image/portfolio/awardee-1.png"));

var _awardee2 = _interopRequireDefault(require("../../assets/image/portfolio/awardee-2.png"));

var _awardee3 = _interopRequireDefault(require("../../assets/image/portfolio/awardee-3.png"));

var _awardee4 = _interopRequireDefault(require("../../assets/image/portfolio/awardee-4.png"));

var _award = _interopRequireDefault(require("../../assets/image/portfolio/award-1.png"));

var _award2 = _interopRequireDefault(require("../../assets/image/portfolio/award-2.png"));

var _award3 = _interopRequireDefault(require("../../assets/image/portfolio/award-3.png"));

var _award4 = _interopRequireDefault(require("../../assets/image/portfolio/award-4.png"));

var _portfolio = _interopRequireDefault(require("../../assets/image/portfolio/portfolio-1.jpg"));

var _portfolio2 = _interopRequireDefault(require("../../assets/image/portfolio/portfolio-2.jpg"));

var _step = _interopRequireDefault(require("../../assets/image/portfolio/step-1.png"));

var _step2 = _interopRequireDefault(require("../../assets/image/portfolio/step-2.png"));

var _step3 = _interopRequireDefault(require("../../assets/image/portfolio/step-3.png"));

var _skill = _interopRequireDefault(require("../../assets/image/portfolio/skill-1.svg"));

var _skill2 = _interopRequireDefault(require("../../assets/image/portfolio/skill-2.svg"));

var _skill3 = _interopRequireDefault(require("../../assets/image/portfolio/skill-3.svg"));

var _skill4 = _interopRequireDefault(require("../../assets/image/portfolio/skill-4.svg"));

var _client = _interopRequireDefault(require("../../assets/image/portfolio/client-1.png"));

var _client2 = _interopRequireDefault(require("../../assets/image/portfolio/client-2.png"));

var _client3 = _interopRequireDefault(require("../../assets/image/portfolio/client-3.png"));

var _client4 = _interopRequireDefault(require("../../assets/image/portfolio/client-4.png"));

var _client5 = _interopRequireDefault(require("../../assets/image/portfolio/client-5.png"));

var _client6 = _interopRequireDefault(require("../../assets/image/portfolio/client-6.png"));

var _clientAvatar = _interopRequireDefault(require("../../assets/image/portfolio/client-avatar-1.jpg"));

var _clientAvatar2 = _interopRequireDefault(require("../../assets/image/portfolio/client-avatar-2.jpg"));

var _clientAvatar3 = _interopRequireDefault(require("../../assets/image/portfolio/client-avatar-3.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var MENU_ITEMS = [{
  label: 'ME',
  path: '#banner_section',
  offset: '0'
}, {
  label: 'PROJECT',
  path: '#portfolio_section',
  offset: '0'
}, {
  label: 'AWARDS',
  path: '#awards_section',
  offset: '0'
}, {
  label: 'WHY ME?',
  path: '#process_section',
  offset: '0'
}];
exports.MENU_ITEMS = MENU_ITEMS;
var AWARDS = [{
  awardLogo: _award["default"],
  awardName: 'Free Software Advice',
  awardDetails: 'Top Rated App Development Companies USA',
  awardeeLogo: _awardee["default"],
  awardeeName: 'Awardee',
  date: 'The Jury 2018'
}, {
  awardLogo: _award2["default"],
  awardName: 'Free Software Advice',
  awardDetails: 'Top Rated App Development Companies USA',
  awardeeLogo: _awardee2["default"],
  awardeeName: 'Awardee',
  date: 'The Jury 2018'
}, {
  awardLogo: _award3["default"],
  awardName: 'Free Software Advice',
  awardDetails: 'Top Rated App Development Companies USA',
  awardeeLogo: _awardee3["default"],
  awardeeName: 'Awardee',
  date: 'The Jury 2018'
}, {
  awardLogo: _award4["default"],
  awardName: 'Free Software Advice',
  awardDetails: 'Top Rated App Development Companies USA',
  awardeeLogo: _awardee4["default"],
  awardeeName: 'Awardee',
  date: 'The Jury 2018'
}];
exports.AWARDS = AWARDS;
var PORTFOLIO_SHOWCASE = [{
  title: 'DESIGN',
  portfolioItem: [{
    title: 'Canada Media Site',
    description: "An effective and immersive user experience is what catches the attention and spreads a clear message. That's why we attach great importance to the fact that ergonomics serves the design, and that this design is innovative and neat.",
    image: _portfolio["default"],
    link: '#',
    featuredIn: 'AWWWARDS',
    featuredLink: '#',
    view: '4.5K',
    love: '1.5K',
    feedback: '1.2K',
    buildWith: [{
      content: 'React JS'
    }, {
      content: 'Next JS'
    }, {
      content: 'Styled Component'
    }]
  }, {
    title: 'RedQ, Inc. mobile app',
    description: "An effective and immersive user experience is what catches the attention and spreads a clear message. That's why we attach great importance to the fact that ergonomics serves the design, and that this design is innovative and neat.",
    image: _portfolio2["default"],
    link: '#',
    featuredIn: 'AppStore',
    featuredLink: '#',
    view: '8.5K',
    love: '5.5K',
    feedback: '3.2K',
    buildWith: [{
      content: 'React Native'
    }, {
      content: 'Firebase'
    }, {
      content: 'Styled Component'
    }]
  }]
}, {
  title: 'DEVELOPMENT',
  portfolioItem: [{
    title: 'Canada Media Site',
    description: "An effective and immersive user experience is what catches the attention and spreads a clear message. That's why we attach great importance to the fact that ergonomics serves the design, and that this design is innovative and neat.",
    image: _portfolio["default"],
    link: '#',
    featuredIn: 'AWWWARDS',
    featuredLink: '#',
    view: '4.5K',
    love: '1.5K',
    feedback: '1.2K',
    buildWith: [{
      content: 'React JS'
    }, {
      content: 'Next JS'
    }, {
      content: 'Styled Component'
    }]
  }, {
    title: 'RedQ, Inc. mobile app',
    description: "An effective and immersive user experience is what catches the attention and spreads a clear message. That's why we attach great importance to the fact that ergonomics serves the design, and that this design is innovative and neat.",
    image: _portfolio2["default"],
    link: '#',
    featuredIn: 'AppStore',
    featuredLink: '#',
    view: '8.5K',
    love: '5.5K',
    feedback: '3.2K',
    buildWith: [{
      content: 'React Native'
    }, {
      content: 'Firebase'
    }, {
      content: 'Styled Component'
    }]
  }]
}, {
  title: 'ANIMATION',
  portfolioItem: [{
    title: 'Canada Media Site',
    description: "An effective and immersive user experience is what catches the attention and spreads a clear message. That's why we attach great importance to the fact that ergonomics serves the design, and that this design is innovative and neat.",
    image: _portfolio["default"],
    link: '#',
    featuredIn: 'AWWWARDS',
    featuredLink: '#',
    view: '4.5K',
    love: '1.5K',
    feedback: '1.2K',
    buildWith: [{
      content: 'React JS'
    }, {
      content: 'Next JS'
    }, {
      content: 'Styled Component'
    }]
  }, {
    title: 'RedQ, Inc. mobile app',
    description: "An effective and immersive user experience is what catches the attention and spreads a clear message. That's why we attach great importance to the fact that ergonomics serves the design, and that this design is innovative and neat.",
    image: _portfolio2["default"],
    link: '#',
    featuredIn: 'AppStore',
    featuredLink: '#',
    view: '8.5K',
    love: '5.5K',
    feedback: '3.2K',
    buildWith: [{
      content: 'React Native'
    }, {
      content: 'Firebase'
    }, {
      content: 'Styled Component'
    }]
  }]
}, {
  title: 'TV ADVERTISEMENT',
  portfolioItem: [{
    title: 'Canada Media Site',
    description: "An effective and immersive user experience is what catches the attention and spreads a clear message. That's why we attach great importance to the fact that ergonomics serves the design, and that this design is innovative and neat.",
    image: _portfolio["default"],
    link: '#',
    featuredIn: 'AWWWARDS',
    featuredLink: '#',
    view: '4.5K',
    love: '1.5K',
    feedback: '1.2K',
    buildWith: [{
      content: 'React JS'
    }, {
      content: 'Next JS'
    }, {
      content: 'Styled Component'
    }]
  }, {
    title: 'RedQ, Inc. mobile app',
    description: "An effective and immersive user experience is what catches the attention and spreads a clear message. That's why we attach great importance to the fact that ergonomics serves the design, and that this design is innovative and neat.",
    image: _portfolio2["default"],
    link: '#',
    featuredIn: 'AppStore',
    featuredLink: '#',
    view: '8.5K',
    love: '5.5K',
    feedback: '3.2K',
    buildWith: [{
      content: 'React Native'
    }, {
      content: 'Firebase'
    }, {
      content: 'Styled Component'
    }]
  }]
}, {
  title: 'MARKETING',
  portfolioItem: [{
    title: 'Canada Media Site',
    description: "An effective and immersive user experience is what catches the attention and spreads a clear message. That's why we attach great importance to the fact that ergonomics serves the design, and that this design is innovative and neat.",
    image: _portfolio["default"],
    link: '#',
    featuredIn: 'AWWWARDS',
    featuredLink: '#',
    view: '4.5K',
    love: '1.5K',
    feedback: '1.2K',
    buildWith: [{
      content: 'React JS'
    }, {
      content: 'Next JS'
    }, {
      content: 'Styled Component'
    }]
  }, {
    title: 'RedQ, Inc. mobile app',
    description: "An effective and immersive user experience is what catches the attention and spreads a clear message. That's why we attach great importance to the fact that ergonomics serves the design, and that this design is innovative and neat.",
    image: _portfolio2["default"],
    link: '#',
    featuredIn: 'AppStore',
    featuredLink: '#',
    view: '8.5K',
    love: '5.5K',
    feedback: '3.2K',
    buildWith: [{
      content: 'React Native'
    }, {
      content: 'Firebase'
    }, {
      content: 'Styled Component'
    }]
  }]
}];
exports.PORTFOLIO_SHOWCASE = PORTFOLIO_SHOWCASE;
var PROCESS_STEPS = [{
  image: _step["default"],
  title: '1. Research',
  description: 'We work with you to understand user’s stories and validate your idea with real users using lean design sprints.'
}, {
  image: _step2["default"],
  title: '2. Design',
  description: 'Expanding on the insights gained, you’ll work closely with our design team to create an elegant design'
}, {
  image: _step3["default"],
  title: '3. Build',
  description: 'With our scrum-based agile methodology, you’ll receive iterative builds every two weeks, which gives you '
}];
exports.PROCESS_STEPS = PROCESS_STEPS;
var SERVICE_LIST = [{
  title: 'UI/UX Design',
  listItems: [{
    content: 'Design Sprints'
  }, {
    content: 'User Research'
  }, {
    content: 'Visual Design'
  }, {
    content: 'Mobile App Design'
  }, {
    content: 'Tracking & Learning'
  }, {
    content: 'Building Traction'
  }]
}, {
  title: 'Web Development',
  listItems: [{
    content: 'ReactJS'
  }, {
    content: 'AngularJS'
  }, {
    content: 'ASP.NET MVC'
  }, {
    content: 'WordPress'
  }, {
    content: 'NodeJS'
  }, {
    content: 'GO'
  }]
}, {
  title: 'Mobile App Development',
  listItems: [{
    content: 'iOS'
  }, {
    content: 'Android'
  }, {
    content: 'React Native'
  }, {
    content: 'Ionic & Apache Cordova'
  }, {
    content: 'NodeJS'
  }, {
    content: '3D & VR'
  }]
}];
exports.SERVICE_LIST = SERVICE_LIST;
var SKILLS = [{
  title: 'Graphic Design',
  description: 'Aristotle maintained the sharp distinction between science and the practical',
  icon: _skill["default"],
  successRate: '90'
}, {
  title: 'UI/UX Design',
  description: 'Aristotle maintained the sharp distinction between science and the practical',
  icon: _skill2["default"],
  successRate: '85'
}, {
  title: 'Web Application',
  description: 'Aristotle maintained the sharp distinction between science and the practical',
  icon: _skill3["default"],
  successRate: '80'
}, {
  title: 'Mobile Application',
  description: 'Aristotle maintained the sharp distinction between science and the practical',
  icon: _skill4["default"],
  successRate: '70'
}];
exports.SKILLS = SKILLS;
var CLIENTS = [{
  image: _client["default"],
  title: 'Microsoft'
}, {
  image: _client2["default"],
  title: 'Airbnb'
}, {
  image: _client3["default"],
  title: 'Adidas'
}, {
  image: _client4["default"],
  title: 'IBM'
}, {
  image: _client5["default"],
  title: 'Amazon'
}, {
  image: _client6["default"],
  title: 'Google'
}];
exports.CLIENTS = CLIENTS;
var TESTIMONIAL = [{
  image: _clientAvatar["default"],
  review: 'Another quality React-based product from RedQ Team. Manage to turn highly complex tech into simple components.',
  name: 'Jon Doe',
  designation: 'Founder & CEO',
  twitterProfile: 'https://twitter.com/redqinc',
  organization: '@Tonquin',
  organizationURL: 'https://redq.io/'
}, {
  image: _clientAvatar2["default"],
  review: 'Another quality React-based product from RedQ Team. Manage to turn highly complex tech into simple components.',
  name: 'Jeny Doe',
  designation: 'Co-Founder & CTO',
  twitterProfile: 'https://twitter.com/redqinc',
  organization: '@Tonquin',
  organizationURL: 'https://redq.io/'
}, {
  image: _clientAvatar3["default"],
  review: 'Another quality React-based product from RedQ Team. Manage to turn highly complex tech into simple components.',
  name: 'Jon Doe',
  designation: 'Co-Founder & COO',
  twitterProfile: 'https://twitter.com/redqinc',
  organization: '@Tonquin',
  organizationURL: 'https://redq.io/'
}];
exports.TESTIMONIAL = TESTIMONIAL;
var FOOTER_MENU = [{
  label: 'Contact',
  path: '#'
}, {
  label: 'Privacy',
  path: '#'
}, {
  label: 'Cookie Policy',
  path: '#'
}];
exports.FOOTER_MENU = FOOTER_MENU;