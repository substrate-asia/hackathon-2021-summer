import serviceIcon1 from '../../assets/image/agencyDigital/services/1.png';
import serviceIcon2 from '../../assets/image/agencyDigital/services/2.png';
import serviceIcon3 from '../../assets/image/agencyDigital/services/3.png';
import serviceIcon4 from '../../assets/image/agencyDigital/services/4.png';
import serviceIcon5 from '../../assets/image/agencyDigital/services/5.png';
import serviceIcon6 from '../../assets/image/agencyDigital/services/6.png';
import support1 from '../../assets/image/agencyDigital/support1.png';
import support2 from '../../assets/image/agencyDigital/support2.png';
import news1 from '../../assets/image/agencyDigital/news/1.png';
import news2 from '../../assets/image/agencyDigital/news/2.png';
import news3 from '../../assets/image/agencyDigital/news/3.png';
import news4 from '../../assets/image/agencyDigital/news/4.png';

export const data = {
  navItems: [
    {
      label: 'Home',
      path: '#home',
      offset: '70',
    },
    {
      label: 'Service',
      path: '#service',
      offset: '70',
    },
    {
      label: 'Pricing',
      path: '#pricing',
      offset: '70',
    },
    {
      label: 'Our Customer',
      path: '#our-customer',
      offset: '70',
    },
    {
      label: 'Blog',
      path: '#blog',
      offset: '70',
    },
  ],
  services: [
    {
      id: 1,
      icon: serviceIcon1,
      title: 'Email Subscription',
      desc:
        'We’re driven beyond just finishing projects. We want to find smart solutions.',
      link: '#',
    },
    {
      id: 2,
      icon: serviceIcon2,
      title: 'Bolt Performance',
      desc:
        'We’re driven beyond just finishing projects. We want to find smart solutions.',
      link: '#',
    },
    {
      id: 3,
      icon: serviceIcon3,
      title: 'Secure Transaction',
      desc:
        'We’re driven beyond just finishing projects. We want to find smart solutions.',
      link: '#',
    },
    {
      id: 4,
      icon: serviceIcon4,
      title: 'Multiple Options',
      desc:
        'We’re driven beyond just finishing projects. We want to find smart solutions.',
      link: '#',
    },
    {
      id: 5,
      icon: serviceIcon5,
      title: 'Customer Support',
      desc:
        'We’re driven beyond just finishing projects. We want to find smart solutions.',
      link: '#',
    },
    {
      id: 6,
      icon: serviceIcon6,
      title: 'Integrated with Shopify',
      desc:
        'We’re driven beyond just finishing projects. We want to find smart solutions.',
      link: '#',
    },
  ],
  workHardList: [
    { id: 1, title: 'Medical and vision' },
    { id: 2, title: 'Life insurance' },
    { id: 3, title: '400(k) savings' },
    { id: 4, title: 'HSAs and FSAs' },
  ],
  pricing: [
    {
      id: 1,
      package_name: 'Starter Pack',
      price: '18.99',
      trial_day: 15,
      isRecommended: false,
      features: [
        {
          id: 1,
          name: 'Full Access Library',
          isAvailable: true,
        },
        {
          id: 2,
          name: 'Multiple user',
          isAvailable: true,
        },
        {
          id: 3,
          name: 'Refund Policy',
          isAvailable: false,
        },
        {
          id: 4,
          name: 'Google Analytics',
          isAvailable: false,
        },
        {
          id: 5,
          name: '24/7 support',
          isAvailable: false,
        },
      ],
    },
    {
      id: 2,
      package_name: 'Premium Pack',
      price: '29.99',
      trial_day: 30,
      isRecommended: true,
      features: [
        {
          id: 1,
          name: 'Full Access Library',
          isAvailable: true,
        },
        {
          id: 2,
          name: 'Multiple user',
          isAvailable: true,
        },
        {
          id: 3,
          name: 'Refund Policy',
          isAvailable: true,
        },
        {
          id: 4,
          name: 'Google Analytics',
          isAvailable: false,
        },
        {
          id: 5,
          name: '24/7 support',
          isAvailable: false,
        },
      ],
    },
    {
      id: 3,
      package_name: 'Custom Pack',
      price: '23.99',
      trial_day: 30,
      isRecommended: false,
      features: [
        {
          id: 1,
          name: 'Full Access Library',
          isAvailable: true,
        },
        {
          id: 2,
          name: 'Multiple user',
          isAvailable: true,
        },
        {
          id: 3,
          name: 'Refund Policy',
          isAvailable: true,
        },
        {
          id: 4,
          name: 'Google Analytics',
          isAvailable: true,
        },
        {
          id: 5,
          name: '24/7 support',
          isAvailable: false,
        },
      ],
    },
    {
      id: 4,
      package_name: 'Ultimate Pack',
      price: '35.99',
      trial_day: 45,
      isRecommended: false,
      features: [
        {
          id: 1,
          name: 'Full Access Library',
          isAvailable: true,
        },
        {
          id: 2,
          name: 'Multiple user',
          isAvailable: true,
        },
        {
          id: 3,
          name: 'Refund Policy',
          isAvailable: true,
        },
        {
          id: 4,
          name: 'Google Analytics',
          isAvailable: true,
        },
        {
          id: 5,
          name: '24/7 support',
          isAvailable: true,
        },
      ],
    },
  ],
  helps: [
    {
      id: 1,
      icon: support1,
      title: 'Email client support',
      desc:
        'Ultimate access to all credit popular exercises and assessments materials',
    },
    {
      id: 2,
      icon: support2,
      title: 'Live ticket support',
      desc:
        'Total assessment corrections with live support tickets download access system',
    },
  ],
  newsFeed: [
    {
      id: 1,
      image: news1,
      title: 'Introducing our newest team with great experience',
      desc:
        'Brian Halligan knows that you need more than a great product to have a great brand.',
      link: '#',
    },
    {
      id: 2,
      image: news2,
      title:
        'New banking application has  developed and we expecting good feedback',
      desc: '',
      link: '#',
    },
    {
      id: 3,
      image: news3,
      title: 'Ui/UX industry are doing great job in previous year history',
      desc: '',
      link: '',
    },
    {
      id: 4,
      image: news4,
      title: 'Develop you design experience with figma features.',
      desc: '',
      link: '',
    },
  ],
  footer: [
    {
      id: 1,
      title: 'Company',
      list: [
        {
          id: 1,
          title: 'About',
          link: '#',
        },
        {
          id: 2,
          title: 'Affiliate',
          link: '#',
        },
        {
          id: 3,
          title: 'Careers & Culture',
          link: '#',
        },
        {
          id: 4,
          title: 'Blog',
          link: '#',
        },
        {
          id: 5,
          title: 'Press',
          link: '#',
        },
      ],
    },
    {
      id: 2,
      title: 'About Us',
      list: [
        {
          id: 1,
          title: 'Support Center',
          link: '#',
        },
        {
          id: 2,
          title: 'Customer Support',
          link: '#',
        },
        {
          id: 3,
          title: 'About Us',
          link: '#',
        },
        {
          id: 4,
          title: 'Copyright',
          link: '#',
        },
        {
          id: 5,
          title: 'Popular Campaign',
          link: '#',
        },
      ],
    },
    {
      id: 3,
      title: 'Our Information',
      list: [
        {
          id: 1,
          title: 'Return Policy ',
          link: '#',
        },
        {
          id: 2,
          title: 'Privacy Policy',
          link: '#',
        },
        {
          id: 3,
          title: 'Terms & Conditions',
          link: '#',
        },
        {
          id: 4,
          title: 'Site Map',
          link: '#',
        },
        {
          id: 5,
          title: 'Store Hours',
          link: '#',
        },
      ],
    },
    {
      id: 4,
      title: 'My Account',
      list: [
        {
          id: 1,
          title: 'Press inquiries',
          link: '#',
        },
        {
          id: 2,
          title: 'Social media ',
          link: '#',
        },
        {
          id: 3,
          title: 'directories',
          link: '#',
        },
        {
          id: 4,
          title: 'Images & B-roll',
          link: '#',
        },
        {
          id: 5,
          title: 'Permissions',
          link: '#',
        },
      ],
    },
    {
      id: 5,
      title: 'Policy',
      list: [
        {
          id: 1,
          title: 'Application security',
          link: '#',
        },
        {
          id: 2,
          title: 'Software principles',
          link: '#',
        },
        {
          id: 3,
          title: 'Unwanted software policy',
          link: '#',
        },
        {
          id: 4,
          title: 'Responsible supply chain',
          link: '#',
        },
      ],
    },
  ],
  footerNav: [
    {
      id: 1,
      title: 'Home',
      link: '#',
    },
    {
      id: 2,
      title: 'Advertise',
      link: '#',
    },
    {
      id: 3,
      title: 'Supports',
      link: '#',
    },
    {
      id: 4,
      title: 'Marketing',
      link: '#',
    },
    {
      id: 5,
      title: 'FAQ',
      link: '#',
    },
  ],
};
