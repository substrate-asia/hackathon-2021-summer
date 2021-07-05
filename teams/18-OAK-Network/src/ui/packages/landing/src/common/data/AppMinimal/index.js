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

export const MENU_ITEMS = [
  {
    label: 'Home',
    path: '#banner_section',
    offset: '70',
  },
  {
    label: 'Feature',
    path: '#feature_section',
    offset: '70',
  },
  {
    label: 'Service',
    path: '#service_section',
    offset: '70',
  },
  {
    label: 'Dashboard',
    path: '#dashboard_section',
    offset: '70',
  },
  {
    label: 'Pricing',
    path: '#pricing_section',
    offset: '70',
  },
  {
    label: 'Blog',
    path: '#blog_section',
    offset: '70',
  },
];

/* ------------------------------------ */
// Banner data section
/* ------------------------------------ */

import bannerMoc from 'common/assets/image/app-minimal/banner-moc-1-1.png';

export const BannerData = {
  image: bannerMoc,
  title: 'Only trusted wallet apps that make your day beautiful',
  text:
    'There will be a day–in our lifetime–when we get to celebrate every person on the planet having access. Moment Pro is the best software platform to collect reviews.',
  tagline: '*No Credit card required',
  button: {
    link: '#',
    label: 'Try it for free',
  },
};

/* ------------------------------------ */
// Key Features data section
/* ------------------------------------ */
import keyFeature1 from 'common/assets/image/app-minimal/key-feature/key-feature-1.svg';
import keyFeature2 from 'common/assets/image/app-minimal/key-feature/key-feature-2.svg';
import keyFeature3 from 'common/assets/image/app-minimal/key-feature/key-feature-3.svg';
import keyFeature4 from 'common/assets/image/app-minimal/key-feature/key-feature-4.svg';

export const keyFeatures = {
  title: 'Business start with great features',
  description:
    'Build an incredible workplace and grow your business with Gusto’s all-in-one platform with amazing contents.',
  features: [
    {
      id: 1,
      icon: keyFeature1,
      title: 'Analytics Report',
      description:
        'We’re driven beyond just finishing the projects. We want to find smart solutions.',
    },
    {
      id: 2,
      icon: keyFeature2,
      title: 'User Customization',
      description:
        'We’re driven beyond just finishing the projects. We want to find smart solutions.',
    },
    {
      id: 3,
      icon: keyFeature3,
      title: 'Help & Support',
      description:
        'We’re driven beyond just finishing the projects. We want to find smart solutions.',
    },
    {
      id: 4,
      icon: keyFeature4,
      title: 'Use Accessibility',
      description:
        'We’re driven beyond just finishing the projects. We want to find smart solutions.',
    },
  ],
};

/* ------------------------------------ */
// Choose us data section
/* ------------------------------------ */
import chooseThumb from 'common/assets/image/app-minimal/choose-thumbnail.jpg';

export const chooseUs = {
  title: 'Why you choose Wallet app for your daily use?',
  description:
    'Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool.',
  thumbnail: chooseThumb,
  features: [
    {
      id: 1,
      title: 'Easy to use application',
      description:
        'We’re driven beyond just finishing the projects. We want to find solutions.',
    },
    {
      id: 2,
      title: 'Transfer to touch share',
      description:
        'We’re driven beyond just finishing the projects. We want to find solutions.',
    },
    {
      id: 3,
      title: '100% Reliable with Privacy',
      description:
        'We’re driven beyond just finishing the projects. We want to find solutions.',
    },
  ],
};

/* ------------------------------------ */
// Wallet Experience data section
/* ------------------------------------ */
import walletThumb from 'common/assets/image/app-minimal/wallet-thumbnail.jpg';
import walletBubble1 from 'common/assets/image/app-minimal/wallet-thumbnail-bubble-1.png';
import walletBubble2 from 'common/assets/image/app-minimal/wallet-thumbnail-bubble-2.png';
import walletBubble3 from 'common/assets/image/app-minimal/wallet-thumbnail-bubble-3.png';

import walletExperience1 from 'common/assets/image/app-minimal/wallet-experience/experience-1.svg';
import walletExperience2 from 'common/assets/image/app-minimal/wallet-experience/experience-2.svg';

export const walletExperience = {
  title: 'Take your wallet experience to new ultimate level',
  description:
    'Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool.',
  image: {
    thumb: walletThumb,
    bubble: [
      {
        image: walletBubble1,
      },
      {
        image: walletBubble2,
      },
      {
        image: walletBubble3,
      },
    ],
  },
  features: [
    {
      id: 1,
      icon: walletExperience1,
      title: 'Fast & Instant Transfer',
      description:
        'We’re driven beyond just finishing the projects. We want to find solutions.',
    },
    {
      id: 2,
      icon: walletExperience2,
      title: 'File Management System',
      description:
        'We’re driven beyond just finishing the projects. We want to find smart solutions.',
    },
  ],
};

/* ------------------------------------ */
// Features data section
/* ------------------------------------ */
import featureIcon1 from 'common/assets/image/app-minimal/feature/feature-icon-1.svg';
import featureIcon2 from 'common/assets/image/app-minimal/feature/feature-icon-2.svg';
import featureIcon3 from 'common/assets/image/app-minimal/feature/feature-icon-3.svg';
import featureIcon4 from 'common/assets/image/app-minimal/feature/feature-icon-4.svg';
import featureIcon5 from 'common/assets/image/app-minimal/feature/feature-icon-5.svg';
import featureIcon6 from 'common/assets/image/app-minimal/feature/feature-icon-6.svg';

export const features = {
  title: 'So How Does UserPlace Work ?',
  description:
    'See some of the features below and learn why businesses trust UserPlace',
  items: [
    {
      id: 1,
      icon: featureIcon1,
      title: 'Analytics Business',
      description:
        'We’re driven beyond just finishing the projects. We want to find smart solutions.',
    },
    {
      id: 2,
      icon: featureIcon2,
      title: 'Artificial Intelligence',
      description:
        'We’re driven beyond just finishing the projects. We want to find smart solutions.',
    },
    {
      id: 3,
      icon: featureIcon3,
      title: 'Privacy & Security',
      description:
        'We’re driven beyond just finishing the projects. We want to find smart solutions.',
    },
    {
      id: 4,
      icon: featureIcon4,
      title: 'Annual Reports',
      description:
        'We’re driven beyond just finishing the projects. We want to find smart solutions.',
    },
    {
      id: 5,
      icon: featureIcon5,
      title: 'Video Tutorial',
      description:
        'We’re driven beyond just finishing the projects. We want to find smart solutions.',
    },
    {
      id: 6,
      icon: featureIcon6,
      title: 'Performance Analysis',
      description:
        'We’re driven beyond just finishing the projects. We want to find smart solutions.',
    },
  ],
};

/* ------------------------------------ */
// Secure Transaction data section
/* ------------------------------------ */
import transactionThumb from 'common/assets/image/app-minimal/secure-transaction.jpg';
import transactionThumbBubble from 'common/assets/image/app-minimal/secure-transaction-bubble-1.png';

export const secureTransaction = {
  image: {
    thumb: transactionThumb,
    bubble: transactionThumbBubble,
  },
  title: 'Most promising secure transaction with fast & Entertaining',
  description:
    'Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool. Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool.',
};

/* ------------------------------------ */
// WalletDashboard data section
/* ------------------------------------ */

import walletDashboardImage from 'common/assets/image/app-minimal/wallet-dashboard-1.png';

export const WalletDashboardData = [
  {
    step: 'Step 01',
    title: 'Create a free Account',
    image: walletDashboardImage,
  },
  {
    step: 'Step 02',
    title: 'Verified your Account',
    image: walletDashboardImage,
  },
  {
    step: 'Step 03',
    title: 'Monitor your Dashboard',
    image: walletDashboardImage,
  },
  {
    step: 'Step 04',
    title: 'Promote & Refer Account',
    image: walletDashboardImage,
  },
];

/* ------------------------------------ */
// Track data section
/* ------------------------------------ */

import trackImage1 from 'common/assets/image/app-minimal/graph-1-1.png';
import trackImage2 from 'common/assets/image/app-minimal/graph-1-2.png';

export const TrackData = {
  title:
    'The Most Effective wallet app to track your ultimate daily transaction',
  paragraph: [
    {
      text:
        'Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool. Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool. There will be a day–in our lifetime–when we get to celebrate every person on the planet having access. Moment Pro is the best software platform to collect reviews.',
    },
    {
      text:
        'There will be a day–in our lifetime–when we get to celebrate every person on the planet having access. Moment Pro is the best software platform to collect reviews. Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool. Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool.',
    },
  ],
  trackBox: [
    {
      image: trackImage1,
      count: '38',
      text: 'Avarage Convension Rate',
    },
    {
      image: trackImage2,
      count: '53',
      text: 'Avarage Growth Rate',
    },
  ],
};
/* ------------------------------------ */
// Gallery data section
/* ------------------------------------ */

import galleryImage1 from 'common/assets/image/app-minimal/gallery/gallery-1-1.png';
import galleryImage2 from 'common/assets/image/app-minimal/gallery/gallery-1-2.png';
import galleryImage3 from 'common/assets/image/app-minimal/gallery/gallery-1-3.png';
import galleryImage4 from 'common/assets/image/app-minimal/gallery/gallery-1-4.png';

export const GalleryData = [
  {
    image: galleryImage1,
  },
  {
    image: galleryImage2,
  },
  {
    image: galleryImage3,
  },
  {
    image: galleryImage4,
  },
];

/* ------------------------------------ */
// Counter data section
/* ------------------------------------ */

export const CounterData = {
  blockTitle: {
    title: 'Let’s take your wallet Experience to the next level',
    tagline:
      'Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool. Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool.',
  },
  countBox: [
    {
      number: '15',
      text: 'average increase in bookings',
      button: {
        label: 'Read story',
        link: '#',
      },
    },
    {
      number: '73',
      text: 'increase in free account conversions',
      button: {
        label: 'Read story',
        link: '#',
      },
    },
    {
      number: '28',
      text: 'increase in reservations',
      button: {
        label: 'Read story',
        link: '#',
      },
    },
  ],
};

/* ------------------------------------ */
// Pricing data section
/* ------------------------------------ */

export const MONTHLY_PRICING_DATA = [
  {
    recommended: false,
    title: 'Lite',
    price: 'Free',
    tagline: 'with restrictions',
    planLabel: 'Plan includes:',
    options: [
      {
        text: 'Manage conversations directly from your websites optimization.',
      },
      {
        text: 'Unlimited links',
      },
      {
        text: 'Chat promt supported',
      },
      {
        text: 'Optimzed hashtags',
      },
      {
        text: 'Own analytics platform',
      },
    ],
    button: {
      label: 'Start 14 days of free trial',
      link: '#',
    },
  },
  {
    recommended: true,
    title: 'Pro',
    price: '$15.93',
    tagline: 'Monthly',
    planLabel: 'Plan includes:',
    options: [
      {
        text: 'Manage conversations directly from your websites optimization.',
      },
      {
        text: 'Unlimited links',
      },
      {
        text: 'Chat promt supported',
      },
      {
        text: 'Optimzed hashtags',
      },
      {
        text: 'Own analytics platform',
      },
    ],
    button: {
      label: 'Start 14 days of free trial',
      link: '#',
    },
  },
];

export const YEARLY_PRICING_DATA = [
  {
    recommended: false,
    title: 'Lite',
    price: 'Free',
    tagline: 'with restrictions',
    planLabel: 'Plan includes:',
    options: [
      {
        text: 'Manage conversations directly from your websites optimization.',
      },
      {
        text: 'Unlimited links',
      },
      {
        text: 'Chat promt supported',
      },
      {
        text: 'Optimzed hashtags',
      },
      {
        text: 'Own analytics platform',
      },
    ],
    button: {
      label: 'Start 14 days of free trial',
      link: '#',
    },
  },
  {
    recommended: true,
    title: 'Pro',
    price: '$99.93',
    tagline: 'Yearly',
    planLabel: 'Plan includes:',
    options: [
      {
        text: 'Manage conversations directly from your websites optimization.',
      },
      {
        text: 'Unlimited links',
      },
      {
        text: 'Chat promt supported',
      },
      {
        text: 'Optimzed hashtags',
      },
      {
        text: 'Own analytics platform',
      },
    ],
    button: {
      label: 'Start 14 days of free trial',
      link: '#',
    },
  },
];

/* ------------------------------------ */
// Blog data section
/* ------------------------------------ */
import blogImage1 from 'common/assets/image/app-minimal/blog/blog-1-1.png';
import blogImage2 from 'common/assets/image/app-minimal/blog/blog-1-2.png';
import blogImage3 from 'common/assets/image/app-minimal/blog/blog-1-3.png';
export const BlogData = [
  {
    image: blogImage1,
    title: 'The 3 Fundamental Rules to Keep Your Website Goal Orientated',
    link: '#',
  },
  {
    image: blogImage2,
    title: 'Why the Best Websites Focus on Their Conversion Funnel',
    link: '#',
  },
  {
    image: blogImage3,
    title: 'Acquire More Leads Through Your Website By Switching Perspectives',
    link: '#',
  },
];

/* ------------------------------------ */
// Call To Action data section
/* ------------------------------------ */

export const CallToActionData = {
  title: 'Are you Interested? Join our waitlist',
  text: "We're launching soon - join our waitlist to get early access.",
  link: {
    label: 'Join Waitlist Today',
    path: '#',
  },
};

/* ------------------------------------ */
// Footer data section
/* ------------------------------------ */

import footerLogo from 'common/assets/image/app-minimal/footer/logo-footer.svg';
import footerDribble from 'common/assets/image/app-minimal/footer/footer-dribble.svg';
import footerFacebook from 'common/assets/image/app-minimal/footer/footer-facebook.svg';
import footerTwitter from 'common/assets/image/app-minimal/footer/footer-twitter.svg';

export const FooterData = {
  menu: [
    {
      link: '#',
      label: 'Support',
    },
    {
      link: '#',
      label: 'About Us',
    },
    {
      link: '#',
      label: 'Privacy',
    },
    {
      link: '#',
      label: 'Contact',
    },
  ],
  logo: footerLogo,
  social: [
    {
      link: '#',
      icon: footerFacebook,
    },
    {
      link: '#',
      icon: footerTwitter,
    },
    {
      link: '#',
      icon: footerDribble,
    },
  ],
};
