/* ------------------------------------ */
// Navbar data section
/* ------------------------------------ */
import logo from 'common/assets/image/appModern/logo.png';
import {
  faWeixin,
  faTwitter,
  faLinkedin,
  faDiscord,
  faTelegram,
  faMedium,
  faGithubSquare,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

export const navbar = {
  logo: logo,
  navMenu: [
    {
      id: 1,
      label: 'Recommended',
      path: '#Recommended',
      offset: '84',
    },
    {
      id: 2,
      label: 'Tutorial',
      path: '#Tutorial',
      offset: '81',
    },
    {
      id: 3,
      label: 'FAQ',
      path: '#FAQ',
      offset: '81',
    },
    {
      id: 4,
      label: 'Become a Matching Partner',
      path: '#Become a Matching Partner',
      offset: '81',
    },
  ],
};

/* ------------------------------------ */
// client data section
/* ------------------------------------ */
import client1 from 'common/assets/image/appModern/company1.png';
import client2 from 'common/assets/image/appModern/company2.png';
import client3 from 'common/assets/image/appModern/company3.png';
import client4 from 'common/assets/image/appModern/company4.png';

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
// Features data section
/* ------------------------------------ */
import featureIcon1 from 'common/assets/image/appModern/icon1.svg';
import featureIcon2 from 'common/assets/image/appModern/icon2.svg';
import featureIcon3 from 'common/assets/image/appModern/icon3.svg';
import featureIcon4 from 'common/assets/image/appModern/icon4.svg';

export const features = {
  slogan: 'KEY FEATURES',
  title: 'Why you choose our app',
  items: [
    {
      id: 1,
      color: '#F55767',
      icon: featureIcon1,
      title: 'App Development',
      description:
        'We are specialized at custom Saas Application Development and special features.',
    },
    {
      id: 2,
      color: '#ff4742',
      icon: featureIcon2,
      title: '10 Times Award',
      description:
        'We are globally recognised for our services and won a lot of prices around the world .',
    },
    {
      id: 3,
      color: '#fb5781',
      icon: featureIcon3,
      title: 'Cloud Storage',
      description:
        'LiteSpeed Web Server known for its high performance and low resource consumption.',
    },
    {
      id: 4,
      color: '#f18e47',
      icon: featureIcon4,
      title: 'Customization',
      description:
        'Client Satisfaction is our first priority and We are best at it. Keep In Touch for the best output. ',
    },
  ],
};

/* ------------------------------------ */
// App slider data section
/* ------------------------------------ */
import appSlide1 from 'common/assets/image/appModern/appSlider1.png';
import appSlide2 from 'common/assets/image/appModern/appSlider2.png';
import appSlide3 from 'common/assets/image/appModern/appSlider3.png';
import appIcon from 'common/assets/image/appModern/icon1.svg';

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
      icon: appIcon,
      title: 'Easy Invoicing',
      description: 'Surprice your clients with professional looking invoices.',
    },
    {
      id: 2,
      icon: appIcon,
      title: 'UX Planning',
      description:
        'UI/UX Design by following and maintaining the latest trends .',
    },
    {
      id: 3,
      icon: appIcon,
      title: 'Customer Support',
      description: 'A Dedicated support team will be always ready for you.',
    },
  ],
};

/* ------------------------------------ */
// Design and built data section
/* ------------------------------------ */
import codingImage from 'common/assets/image/appModern/code.png';

export const designAndBuilt = {
  image: codingImage,
  slogan: 'CODE INTEGRATION',
  title: 'Introducing coding features of our apps with Customization',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore features that Lorem ipsum dolor sit amet consectetur.',
};

/* ------------------------------------ */
// Product  Slide  section
/* ------------------------------------ */
import slide1 from 'common/assets/image/appModern/page1.png';
import slide2 from 'common/assets/image/appModern/page2.png';
import slide3 from 'common/assets/image/appModern/page3.png';

export const productData = {
  slogan: 'PRODUCT SHOWCASE',
  title: 'Meet Client Satisfaction by using our product',
  carousel: [
    {
      id: 1,
      thumb_url: slide1,
      link: '#1',
      title: 'slide 1',
    },
    {
      id: 2,
      thumb_url: slide2,
      link: '#1',
      title: 'slide 2',
    },
    {
      id: 3,
      thumb_url: slide3,
      link: '#1',
      title: 'slide 3',
    },

    {
      id: 4,
      thumb_url: slide1,
      link: '#1',
      title: 'slide 4',
    },

    {
      id: 5,
      thumb_url: slide3,
      link: '#1',
      title: 'slide 5',
    },
    {
      id: 6,
      thumb_url: slide2,
      link: '#1',
      title: 'slide 6',
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
// Team Portfolio data section
/* ------------------------------------ */
import member1 from 'common/assets/image/appModern/1.png';
import member2 from 'common/assets/image/appModern/2.png';
import member3 from 'common/assets/image/appModern/3.png';
import member4 from 'common/assets/image/appModern/4.png';
import member5 from 'common/assets/image/appModern/5.png';
import member6 from 'common/assets/image/appModern/6.png';
import member7 from 'common/assets/image/appModern/7.png';

export const teamportfolio = {
  title: 'Meet our awesome team members, work behind the sense',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore features that Lorem ipsum dolor sit amet consectetur.',

  teammember: [
    {
      id: 1,
      img: member1,
      text: 'Berlin Corleone',
    },
    {
      id: 2,
      img: member2,
      text: 'Jona White',
    },
    {
      id: 3,
      img: member3,
      text: 'Michael Price',
    },
    {
      id: 4,
      img: member4,
      text: 'Gullyboy Rana',
    },
    {
      id: 5,
      img: member5,
      text: 'Miss Clair',
    },
    {
      id: 6,
      img: member6,
      text: 'Bucky Ali',
    },
    {
      id: 7,
      img: member7,
      text: 'Arthus Doe',
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
// Footer data section
/* ------------------------------------ */
import chat from 'common/assets/image/appModern/chat.svg';
import group from 'common/assets/image/appModern/group.svg';
import github from 'common/assets/image/appModern/github.svg';
import footerLogo from 'common/assets/image/appModern/oak-logo.png';

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
      text: 'Recommended',
      link: '#',
    },
    {
      id: 3,
      text: 'Tutorial',
      link: '#',
    },
    {
      id: 4,
      text: 'FAQ',
      link: '#',
    },
    {
      id: 5,
      text: 'Become a Matching Partner',
      link: '#',
    },
  ],
  socialMedia: [
    {
      name: 'twitter',
      link: 'https://twitter.com/OAKSubstrate',
      icon: faTwitter,
    },
    {
      name: 'discord',
      link: 'https://discord.gg/xKKq5AXV',
      icon: faDiscord,
    },
    {
      name: 'wechat',
      link: 'wechat',
      icon: faWeixin,
    },
    {
      name: 'telegram',
      link: '',
      icon: faTelegram,
    },
    {
      name: 'medium',
      link: 'https://medium.com/oak-blockchain',
      icon: faMedium,
    },
    {
      name: 'linkedin',
      link: 'https://www.linkedin.com/company/oak-blockchain/',
      icon: faLinkedin,
    },
    {
      name: 'github',
      link: 'https://github.com/OAK-Foundation/',
      icon: faGithubSquare,
    },
    {
      name: 'email',
      link: 'https://twitter.com/OAKSubstrate',
      icon: faEnvelopeSquare,
    },
  ],
};
