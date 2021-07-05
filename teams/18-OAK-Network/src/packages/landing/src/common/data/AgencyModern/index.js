import serviceIcon1 from 'common/assets/image/agencyModern/services/1.png';
import serviceIcon2 from 'common/assets/image/agencyModern/services/2.png';
import serviceIcon3 from 'common/assets/image/agencyModern/services/3.png';
import featureIcon1 from 'common/assets/image/agencyModern/features/1.png';
import featureIcon2 from 'common/assets/image/agencyModern/features/2.png';
import featureIcon3 from 'common/assets/image/agencyModern/features/3.png';
import featureIcon4 from 'common/assets/image/agencyModern/features/4.png';
import featureIcon5 from 'common/assets/image/agencyModern/features/5.png';
import featureIcon6 from 'common/assets/image/agencyModern/features/6.png';
import news1 from 'common/assets/image/agencyModern/news/1.png';
import news2 from 'common/assets/image/agencyModern/news/2.png';
import news3 from 'common/assets/image/agencyModern/news/3.png';
import facebook from 'common/assets/image/agencyModern/icons/facebook.png';
import dribbble from 'common/assets/image/agencyModern/icons/dribbble.png';
import github from 'common/assets/image/agencyModern/icons/github.png';
import twitter from 'common/assets/image/agencyModern/icons/twitter.png';

const data = {
  leftMenuItems: [
    {
      label: 'Home',
      path: '#home',
      offset: '70',
    },
    {
      label: 'Services',
      path: '#services',
      offset: '70',
    },
    {
      label: 'Features',
      path: '#features',
      offset: '70',
    },
    {
      label: 'News',
      path: '#news',
      offset: '70',
    },
  ],
  rightMenuItems: [
    {
      label: 'Login',
      path: '#',
      offset: '70',
    },
    {
      label: 'Sign Up',
      path: '#',
      offset: '70',
    },
  ],
  mobileMenuItems: [
    {
      label: 'Home',
      path: '#home',
      offset: '70',
    },
    {
      label: 'Services',
      path: '#services',
      offset: '70',
    },
    {
      label: 'Features',
      path: '#features',
      offset: '70',
    },
    {
      label: 'News',
      path: '#news',
      offset: '70',
    },
    {
      label: 'Login',
      path: '#',
      offset: '70',
    },
    {
      label: 'Sign Up',
      path: '#',
      offset: '70',
    },
  ],
  services: [
    {
      id: 1,
      icon: serviceIcon1,
      title: 'For Individuals',
      description: `We are commited to provide proper business solutions with reasonable pricing.`,
    },
    {
      id: 2,
      icon: serviceIcon2,
      title: 'For Team',
      description: `A day to day report about your ongoing business for proper understanding.`,
    },
    {
      id: 3,
      icon: serviceIcon3,
      title: 'For Company',
      description: `Proper Content Management is important to find out the real clients for your agencies.`,
    },
  ],
  accordion: [
    {
      id: 1,
      expend: true,
      title: 'Organize your project content',
      description: `Proper Content Management is important to find out the real clients for your agencies.A day to day report about your ongoing business for proper understanding.`,
    },
    {
      id: 2,
      title: 'Collaborate your documents easily',
      description: `Some hardworking People are Working Day and Night to provide you highly scalable product that supplies best design system guidelines ever.`,
    },
    {
      id: 3,
      title: "Build your team's knowledge base",
      description: `We respect our customer opinions and deals with them with perfect wireframing.A day to day report about your ongoing business for proper understanding.`,
    },
  ],
  WorkHardList: [
    { id: 1, title: 'Medical and vision' },
    { id: 2, title: 'Life insurance' },
    { id: 3, title: '400(k) savings' },
    { id: 4, title: 'HSAs and FSAs' },
    { id: 5, title: 'Commuter benefits' },
    { id: 6, title: '529 college savings' },
  ],
  features: [
    {
      id: 1,
      icon: featureIcon1,
      title: 'ultimate Email  subscription',
      desc:
        'To successfully engage with your subscribers, your newsletter must entice readers and encourage them.',
    },
    {
      id: 2,
      icon: featureIcon2,
      title: 'Bolt Performance',
      desc:
        'LiteSpeed Web Server is a high-performance HTTP server and known for its high performance.',
    },
    {
      id: 3,
      icon: featureIcon3,
      title: 'Secure Transaction',
      desc:
        'Get your Secure Transaction delivered at home collect a sample from the your task.',
    },
    {
      id: 4,
      icon: featureIcon4,
      title: 'Multiple Options',
      desc:
        'Client Satisfaction is our first priority and We are best at it and ongoing assistance',
    },
    {
      id: 5,
      icon: featureIcon5,
      title: '5 Star Rating service',
      desc:
        'We have support team for 24/7 operation. They provide help at any time.',
    },
    {
      id: 6,
      icon: featureIcon6,
      title: 'Integrated with Shopify',
      desc:
        'You can build any kind of E-commerce Shop with payment security tools.',
    },
  ],
  posts: [
    {
      id: 1,
      icon: news1,
      title: 'How to work with prototype design with adobe xd featuring tools',
      comments_count: 22,
    },
    {
      id: 2,
      icon: news2,
      title: 'Create multiple artboard by using figma prototyping development',
      comments_count: 15,
    },
    {
      id: 3,
      icon: news3,
      title:
        'Convert your web layout theming easily with sketch zeplin extension',
      comments_count: 18,
    },
  ],
  aboutUs: [
    {
      id: 1,
      title: 'Support Center',
    },
    {
      id: 2,
      title: 'Customer Support',
    },
    {
      id: 3,
      title: 'About Us',
    },
    {
      id: 4,
      title: 'Copyright',
    },
  ],
  ourInformation: [
    {
      id: 1,
      title: 'Return Policy',
    },
    {
      id: 2,
      title: 'Privacy Policy',
    },
    {
      id: 3,
      title: 'Terms & Conditions',
    },
    {
      id: 4,
      title: 'Site Map',
    },
  ],
  myAccount: [
    {
      id: 1,
      title: 'Press inquiries',
    },
    {
      id: 2,
      title: 'Social media',
    },
    {
      id: 3,
      title: 'directories',
    },
    {
      id: 4,
      title: 'Images & B-roll',
    },
  ],
  social: [
    {
      id: 1,
      icon: facebook,
      title: 'Facebook',
    },
    {
      id: 2,
      icon: twitter,
      title: 'Twitter',
    },
    {
      id: 3,
      icon: github,
      title: 'Github',
    },
    {
      id: 4,
      icon: dribbble,
      title: 'Dribbble',
    },
  ],
};
export default data;
