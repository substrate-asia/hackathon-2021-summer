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
import logo from 'common/assets/image/appClassic/logo.png';

export const navbar = {
  logo: logo,
  navMenu: [
    {
      id: 1,
      label: 'Home',
      path: '#home',
      offset: '84',
    },
    {
      id: 2,
      label: 'Key Features',
      path: '#keyFeatures',
      offset: '84',
    },
    {
      id: 3,
      label: 'Pricing',
      path: '#pricing',
      offset: '84',
    },
    {
      id: 4,
      label: 'Testimonial',
      path: '#testimonial',
      offset: '80',
    },
    {
      id: 5,
      label: 'Faq',
      path: '#faq',
      offset: '80',
    },
  ],
};

/* ------------------------------------ */
// client data section
/* ------------------------------------ */
import client1 from 'common/assets/image/appClassic/client1.svg';
import client2 from 'common/assets/image/appClassic/client2.svg';
import client3 from 'common/assets/image/appClassic/client3.svg';
import client4 from 'common/assets/image/appClassic/client4.svg';

export const client = [
  {
    id: 1,
    image: client1,
    title: 'The new york times',
  },
  {
    id: 2,
    image: client2,
    title: 'amazon',
  },
  {
    id: 3,
    image: client3,
    title: 'evernote',
  },
  {
    id: 4,
    image: client4,
    title: 'the verge',
  },
];

/* ------------------------------------ */
// Key Features data section
/* ------------------------------------ */
import keyFeature1 from 'common/assets/image/appClassic/keyFeature-1.svg';
import keyFeature2 from 'common/assets/image/appClassic/keyFeature-2.svg';
import keyFeature3 from 'common/assets/image/appClassic/keyFeature-3.svg';

export const keyFeatures = {
  slogan: 'WHATS THE FUNCTION',
  title: 'Meet the feature of app',
  features: [
    {
      id: 1,
      color: '#F55767',
      icon: keyFeature1,
      title: 'Fast Performance',
      description:
        'Get your blood tests delivered at home collect a sample from the news your blood tests.',
    },
    {
      id: 2,
      color: '#2563FF',
      icon: keyFeature2,
      title: 'Prototyping',
      description:
        'Get your blood tests delivered at home collect a sample from the news your blood tests.',
    },
    {
      id: 3,
      color: '#40975F',
      icon: keyFeature3,
      title: 'Vector Editing',
      description:
        'Get your blood tests delivered at home collect a sample from the news your blood tests.',
    },
  ],
};

/* ------------------------------------ */
// App slider data section
/* ------------------------------------ */
import appSlide1 from 'common/assets/image/appClassic/appSlider1.png';
import appSlide2 from 'common/assets/image/appClassic/appSlider2.png';
import appSlide3 from 'common/assets/image/appClassic/appSlider3.png';

export const appSlider = {
  carousel: [
    {
      id: 1,
      image: appSlide1,
      title: 'App Slide 1',
    },
    {
      id: 2,
      image: appSlide2,
      title: 'App Slide 1',
    },
    {
      id: 3,
      image: appSlide3,
      title: 'App Slide 1',
    },
  ],
  title: 'Smart Jackpots that you may love this anytime & anywhere',
  description:
    "The rise of mobile devices transforms the way we consume information entirely and the world's most elevant channels such as Facebook.",
  features: [
    {
      id: 1,
      icon: 'flaticon-bitcoin',
      title: 'Automatic Payouts',
      description: 'Casinos no longer control the payout process.',
    },
    {
      id: 2,
      icon: 'flaticon-atom',
      title: 'Network Effect',
      description:
        'Big player rewards with the added security and transparency provided by the blockchain.',
    },
    {
      id: 3,
      icon: 'flaticon-money-bag',
      title: 'Bigger Rewards Method',
      description:
        'Casinos contribute 1% of wagers to decentralised prize pool Players are incentivized to play more to win bigger rewards.',
    },
  ],
};

/* ------------------------------------ */
// Features data section
/* ------------------------------------ */
import featureIcon1 from 'common/assets/image/appClassic/featureIcon-1.svg';
import featureIcon2 from 'common/assets/image/appClassic/featureIcon-2.svg';
import featureIcon3 from 'common/assets/image/appClassic/featureIcon-3.svg';
import featureIcon4 from 'common/assets/image/appClassic/featureIcon-4.svg';
import featureIcon5 from 'common/assets/image/appClassic/featureIcon-5.svg';
import featureIcon6 from 'common/assets/image/appClassic/featureIcon-6.svg';

export const features = {
  slogan: 'PRODUCT COMPARISON',
  title: 'Why you choose our App',
  items: [
    {
      id: 1,
      color: '#F55767',
      icon: featureIcon1,
      title: 'App Development',
      description:
        'Get your proof tests delivered home collect a sample from the news get design.',
    },
    {
      id: 2,
      color: '#3DABDD',
      icon: featureIcon2,
      title: '10 Times Award',
      description:
        'Get your proof tests delivered home collect a sample from the news get design.',
    },
    {
      id: 3,
      color: '#D6AB00',
      icon: featureIcon3,
      title: 'Cloud Storage',
      description:
        'Get your proof tests delivered home collect a sample from the news get design.',
    },
    {
      id: 4,
      color: '#40975F',
      icon: featureIcon4,
      title: 'Customization',
      description:
        'Get your proof tests delivered home collect a sample from the news get design.',
    },
    {
      id: 5,
      color: '#5856D6',
      icon: featureIcon5,
      title: 'UX Planning',
      description:
        'Get your proof tests delivered home collect a sample from the news get design.',
    },
    {
      id: 6,
      color: '#E97325',
      icon: featureIcon6,
      title: 'Customer Support',
      description:
        'Get your proof tests delivered home collect a sample from the news get design.',
    },
  ],
};

/* ------------------------------------ */
// Design and built data section
/* ------------------------------------ */
import builtLogo from 'common/assets/image/appClassic/appAndMap.png';

export const designAndBuilt = {
  image: builtLogo,
  title: 'Designed & Built by the latest code integration',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore features that Lorem ipsum dolor sit amet consectetur.',
};

/* ------------------------------------ */
// Feature tab data section
/* ------------------------------------ */
import appTabIcon1 from 'common/assets/image/appClassic/appTabIcon1.svg';
import appTabIcon2 from 'common/assets/image/appClassic/appTabIcon2.svg';
import appTabIcon3 from 'common/assets/image/appClassic/appTabIcon3.svg';
import appTabIcon4 from 'common/assets/image/appClassic/appTabIcon4.svg';
import appTabIcon5 from 'common/assets/image/appClassic/appTabIcon5.svg';
import appTabIcon6 from 'common/assets/image/appClassic/appTabIcon6.svg';
// image
import appTabImg1 from 'common/assets/image/appClassic/appTabImg1.png';
import appTabImg2 from 'common/assets/image/appClassic/appTabImg2.png';
import appTabImg3 from 'common/assets/image/appClassic/appTabImg3.png';
import appTabImg4 from 'common/assets/image/appClassic/appTabImg4.png';
import appTabImg5 from 'common/assets/image/appClassic/appTabImg5.png';
import appTabImg6 from 'common/assets/image/appClassic/appTabImg6.png';

export const featuresTab = {
  slogan: 'DIFFERENTIATION',
  title: 'Ultimate features that we built',
  tab: [
    {
      id: 1,
      color: '#F55767',
      icon: appTabIcon1,
      title: 'App Development',
      description: 'Get your proof tests delivered home collect a sample.',
      image: appTabImg1,
    },
    {
      id: 2,
      color: '#40975F',
      icon: appTabIcon2,
      title: 'Customization',
      description: 'Get your proof tests delivered home collect a sample.',
      image: appTabImg2,
    },
    {
      id: 3,
      color: '#5856D6',
      icon: appTabIcon3,
      title: 'UX Planning',
      description: 'Get your proof tests delivered home collect a sample.',
      image: appTabImg3,
    },
    {
      id: 4,
      color: '#D6AB00',
      icon: appTabIcon4,
      title: 'Cloud Storage',
      description: 'Get your proof tests delivered home collect a sample.',
      image: appTabImg4,
    },
    {
      id: 5,
      color: '#E97325',
      icon: appTabIcon5,
      title: 'Customer Support',
      description: 'Get your proof tests delivered home collect a sample.',
      image: appTabImg5,
    },
    {
      id: 6,
      color: '#3DABDD',
      icon: appTabIcon6,
      title: '10 Times Award',
      description: 'Get your proof tests delivered home collect a sample.',
      image: appTabImg6,
    },
  ],
};

/* ------------------------------------ */
// Pricing policy data section
/* ------------------------------------ */
export const pricing = {
  slogan: 'PRICING PLAN',
  title: 'Choose your pricing policy',
  monthly: [
    {
      id: 1,
      title: 'Business Class',
      description: 'For Small teams or office',
      suggested: false,
      price: 0,
      features: [
        {
          id: 1,
          text: 'Drag & Drop Builder',
        },
        {
          id: 2,
          text: "1,000's of Templates",
        },
        {
          id: 3,
          text: 'Blog Support Tools',
        },
        {
          id: 4,
          text: 'eCommerce Store ',
        },
      ],
    },
    {
      id: 2,
      title: 'Pro Master',
      description: 'For Best opportunities',
      suggested: true,
      price: 99,
      trail: 14,
      trailLink: '#',
      features: [
        {
          id: 1,
          text: 'Drag & Drop Builder',
        },
        {
          id: 2,
          text: "1,000's of Templates",
        },
        {
          id: 3,
          text: 'Blog Support Tools',
        },
        {
          id: 4,
          text: 'eCommerce Store ',
        },
      ],
    },
  ],
  annualy: [
    {
      id: 1,
      title: 'Pro Master',
      description: 'For Small teams or office',
      suggested: true,
      price: 999,
      trail: 14,
      trailLink: '#',
      features: [
        {
          id: 1,
          text: 'Drag & Drop Builder',
        },
        {
          id: 2,
          text: "1,000's of Templates",
        },
        {
          id: 3,
          text: 'Blog Support Tools',
        },
        {
          id: 4,
          text: 'eCommerce Store ',
        },
      ],
    },
    {
      id: 2,
      title: 'Enterprise',
      description: 'For Best opportunities',
      suggested: false,
      price: 1299,
      trail: 30,
      trailLink: '#',
      features: [
        {
          id: 1,
          text: 'Drag & Drop Builder',
        },
        {
          id: 2,
          text: "1,000's of Templates",
        },
        {
          id: 3,
          text: 'Blog Support Tools',
        },
        {
          id: 4,
          text: 'eCommerce Store ',
        },
      ],
    },
  ],
};

/* ------------------------------------ */
// Testimonial data section
/* ------------------------------------ */
export const testimonial = {
  slogan: 'TESTIMONIAL',
  title: 'Meet Client Satisfaction by using product',
  reviews: [
    {
      id: 1,
      title: 'Modern look & trending design',
      description:
        'Get working experience to work with this amazing team & in future want to work together for bright future projects and also make deposit to freelancer.',
      avatar:
        'https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg',
      name: 'Jon Doe',
      designation: 'CEO of RedQ Inc.',
      review: 4,
    },
    {
      id: 2,
      title: 'User friendly & Customizable',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore features Lorem ipsum dolor sit amet consectetur adipisicing.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Jeny Doe',
      designation: 'Co Founder of RedQ Inc.',
      review: 5,
    },
    {
      id: 3,
      title: 'User friendly & Customizable',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore features Lorem ipsum dolor sit amet consectetur adipisicing.',
      avatar:
        'https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg',
      name: 'Jon Doe',
      designation: 'Co Founder of RedQ Inc.',
      review: 5,
    },
  ],
};

/* ------------------------------------ */
// Faq data section
/* ------------------------------------ */
export const faq = {
  slogan: 'FREQUENT QUESTION',
  title: 'Do you have any question',
  faqs: [
    {
      id: 1,
      question: 'How to contact with riders emergency?',
      answer:
        'Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home. Your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news.',
    },
    {
      id: 2,
      question: 'App installation failed, how to update system information?',
      answer:
        'Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home. Your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news.',
    },
    {
      id: 3,
      question: 'Website reponse taking time, how to improve?',
      answer:
        'Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home. Your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news.',
    },
    {
      id: 4,
      question: 'New update fixed all bug and issues',
      answer:
        'Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home. Your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news.',
    },
  ],
};

/* ------------------------------------ */
// Join Slack data section
/* ------------------------------------ */
import slackLogo from 'common/assets/image/appClassic/slack.png';

export const joinSlack = {
  logo: slackLogo,
  title: 'Start your 30 days free trail today!',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore.',
};

/* ------------------------------------ */
// Footer data section
/* ------------------------------------ */
import chat from 'common/assets/image/appClassic/chat.svg';
import group from 'common/assets/image/appClassic/group.svg';
import github from 'common/assets/image/appClassic/github.svg';
import footerLogo from 'common/assets/image/appClassic/logoWhite.png';

export const footer = {
  widgets: [
    {
      id: 1,
      icon: chat,
      title: 'Join the Community',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore.',
    },
    {
      id: 2,
      icon: group,
      title: 'Join in Chat Community',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore.',
    },
    {
      id: 3,
      icon: github,
      title: 'Github Access',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore.',
    },
  ],
  logo: footerLogo,
  menu: [
    {
      id: 1,
      text: 'Home',
      link: '#',
    },
    {
      id: 2,
      text: 'Adversite',
      link: '#',
    },
    {
      id: 3,
      text: 'Supports',
      link: '#',
    },
    {
      id: 4,
      text: 'Marketing',
      link: '#',
    },
    {
      id: 5,
      text: 'Contact',
      link: '#',
    },
  ],
};
