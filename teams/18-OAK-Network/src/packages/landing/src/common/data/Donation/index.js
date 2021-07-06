import serviceIcon1 from '../../assets/image/donation/our-mission/1.png';
import serviceIcon2 from '../../assets/image/donation/our-mission/2.png';
import serviceIcon3 from '../../assets/image/donation/our-mission/3.png';
import serviceIcon4 from '../../assets/image/donation/our-mission/4.png';
import serviceIcon5 from '../../assets/image/donation/our-mission/5.png';
import italy from '../../assets/image/donation/italy.png';
import china from '../../assets/image/donation/china.png';
import usa from '../../assets/image/donation/usa.png';
import suggestion1 from '../../assets/image/donation/suggestions/1.png';
import suggestion2 from '../../assets/image/donation/suggestions/2.png';
import suggestion3 from '../../assets/image/donation/suggestions/3.png';
import suggestion4 from '../../assets/image/donation/suggestions/4.png';

export const data = {
  navItems: [
    {
      label: 'Home',
      path: '#home',
      offset: '70',
    },
    {
      label: 'Our Mission',
      path: '#our-mission',
      offset: '70',
    },
    {
      label: 'Donation',
      path: '#donation',
      offset: '120',
    },
    {
      label: 'Covid-19 Map',
      path: '#covid-map',
      offset: '70',
    },
    {
      label: 'Doctors Suggestions',
      path: '#docs-suggestions',
      offset: '70',
    },
    {
      label: 'Donation Goal',
      path: '#donation-goal',
      offset: '70',
    },
    {
      label: 'Donate Now',
      path: '#donation-goal',
      offset: '70',
    },
  ],
  services: [
    {
      id: 1,
      icon: serviceIcon1,
      title: 'Healthy & Fresh Food',
      desc: `We’re driven beyond just finishing projects. We want to find smart solutions.`,
      link: '#',
    },
    {
      id: 2,
      icon: serviceIcon2,
      title: 'Medicine & other',
      desc: `We’re driven beyond just finishing projects. We want to find smart solutions.`,
      link: '#',
    },
    {
      id: 3,
      icon: serviceIcon3,
      title: 'Pure Drinking water',
      desc: `We’re driven beyond just finishing projects. We want to find smart solutions.`,
      link: '#',
    },
    {
      id: 4,
      icon: serviceIcon4,
      title: 'Personal Protection',
      desc: `We’re driven beyond just finishing projects. We want to find smart solutions.`,
      link: '#',
    },
    {
      id: 5,
      icon: serviceIcon5,
      title: 'Mask, sanitizer & other',
      desc: `We’re driven beyond just finishing projects. We want to find smart solutions.`,
      link: '#',
    },
  ],
  presetAmounts: [
    {
      id: 1,
      value: 5,
      label: '$5',
    },
    {
      id: 2,
      value: 20,
      label: '$20',
    },
    {
      id: 3,
      value: 50,
      label: '$50',
    },
    {
      id: 4,
      value: 100,
      label: '$100',
    },
  ],
  effectedCountries: [
    {
      id: 1,
      name: 'Italy',
      flag: italy,
      amount: 10023,
    },
    {
      id: 2,
      name: 'China',
      flag: china,
      amount: 3300,
    },
    {
      id: 3,
      name: 'USA',
      flag: usa,
      amount: 2277,
    },
  ],
  suggestions: [
    {
      id: 1,
      thumb: suggestion1,
      title: 'Wash your hand at least 20 sec',
    },
    {
      id: 2,
      thumb: suggestion2,
      title: 'Cover your coughs or sneeze',
    },
    {
      id: 3,
      thumb: suggestion3,
      title: 'Clean & disinfect frequently touched object & surfaces.',
    },
    {
      id: 4,
      thumb: suggestion4,
      title: 'Don’t eat raw food, thoroughly cook eggs & meat.',
    },
  ],
  footerNav: [
    {
      id: 1,
      url: '#home',
      title: 'Home',
    },
    {
      id: 2,
      url: '#',
      title: 'Privacy',
    },
    {
      id: 3,
      url: '#',
      title: 'Licence',
    },
    {
      id: 4,
      url: '#',
      title: 'Contact us',
    },
  ],
};
