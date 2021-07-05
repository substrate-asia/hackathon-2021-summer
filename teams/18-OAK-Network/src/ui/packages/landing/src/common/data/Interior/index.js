/* interiro dummy data list :-
- Navbar
- Banner
- Feature
- About
- Projects
- Team
- News
- Testimonial
- Gallery
- Newsletter
- Footer
  - menu widget
  - copyright
  - social links
*/
/* ------------------------------------ */
// Menu data
/* ------------------------------------ */
export const menuData = [
  {
    label: 'Feature',
    path: '#feature',
    offset: '80',
  },
  {
    label: 'About',
    path: '#aboutUs',
    offset: '80',
  },
  {
    label: 'Project',
    path: '#project',
    offset: '80',
  },
  {
    label: 'Team',
    path: '#team',
    offset: '80',
  },
  {
    label: 'News',
    path: '#news',
    offset: '40',
  },
  {
    label: 'Testimonial',
    path: '#testimonial',
    offset: '80',
  },
];

/* ------------------------------------ */
// Banner section data
/* ------------------------------------ */
import slide1 from 'common/assets/image/interior/slider/slide-1.png';
import slide2 from 'common/assets/image/interior/slider/slide-2.png';
import slide3 from 'common/assets/image/interior/slider/slide-3.png';

export const bannerData = {
  discount: '25%',
  discountLabel: 'DISCOUNT ON YOUR FIRST DESIGN',
  title: 'We craft affordable design',
  text:
    'Your interior should still represent your style. No matter how large your space is or what your design preference is, these designer examples are designed to inspire you.',
  carousel: [
    {
      id: 1,
      thumb_url: slide1,
      title: 'Restroom',
      link: '#1',
    },
    {
      id: 2,
      thumb_url: slide2,
      title: 'Livingroom',
      link: '#1',
    },
    {
      id: 3,
      thumb_url: slide3,
      title: 'Corner',
      link: '#1',
    },
  ],
};

/* ------------------------------------ */
// Feature section data
/* ------------------------------------ */
import corporateIcon from 'common/assets/image/interior/feature/1.svg';
import landscapeIcon from 'common/assets/image/interior/feature/2.svg';
import interiorIcon from 'common/assets/image/interior/feature/3.svg';

export const featureData = {
  title: 'OUR SERVICES',
  slogan: 'Featured Service that We Provide',
  features: [
    {
      id: 1,
      icon: corporateIcon,
      title: 'Corporate Design',
      description:
        'Corporate design is a crucial part of your brand. Our approach corporate design is extraordinary.',
    },
    {
      id: 2,
      icon: landscapeIcon,
      title: 'Landscape Design',
      description:
        'Learn more about landscape plans, how to design them, what to watch out for in your layout.',
    },
    {
      id: 3,
      icon: interiorIcon,
      title: 'Interior Design',
      description:
        'Discover our design ideas, beautiful photos and how-to projects to create Interior Design.',
    },
  ],
};

/* ------------------------------------ */
// About section data
/* ------------------------------------ */
import parentImg from 'common/assets/image/interior/about_parent.png';

export const aboutData = {
  thumb_url: parentImg,
  title: 'Hi, Meet <br> Concrete Squarefeet',
  text:
    'Your interior should still represent your style and feel like a place you want to unwind in. No matter how large your space is or what your design preference is, these designer examples are designed to inspire you. No matter what your choices are, customer satisfaction is our desired goal.',
  text2:
    'When considering the design of your bedroom, it’s important to keep in mind both aesthetics and functionality. If storage is a primary concern, it is important to integrate the right cupboards and wardrobes into your design.',
};

/* ------------------------------------ */
// Projects section data
/* ------------------------------------ */
import project1 from 'common/assets/image/interior/projects/1.png';

export const projectData = {
  title: 'WORK PROCEDURE',
  slogan: 'How We Do Our Projects',
  thumb_url: project1,
  projects: [
    {
      id: 1,
      text:
        'Create a mind map to brainstorm your project to inspire new ideas. Use a simple piece of paper, poster, or whiteboard for your mind map and we write the destination of your project in the middle.We  Write down related topics, subtopics, and relevant concepts around the goal and branch from them to create and follow different tangents.',
      text2:
        'When you conduct a group project, each group member can benefit from the ideas of others and gain new insights by brainstorming together.',
    },
    {
      id: 2,
      text:
        'Schedule a brainstorming session in a quiet place with few distractions. If you are working on a project alone, you can use group discussions with friends or colleagues to gain a new perspective on the topic. When you conduct a group project, each group member can benefit from the ideas of others and gain new insights by brainstorming together.',
      text2:
        'Completing a successful project requires a significant amount of time and work, which means evaluating your priorities and planning your course of action.',
    },
    {
      id: 3,
      text:
        'Create a mind map to brainstorm your project to inspire new ideas. Use a simple piece of paper, poster, or whiteboard for your mind map and we write the destination of your project in the middle.We  Write down related topics, subtopics, and relevant concepts around the goal and branch from them to create and follow different tangents.',
      text2:
        'When you conduct a group project, each group member can benefit from the ideas of others and gain new insights by brainstorming together.',
    },
  ],
};

/* ------------------------------------ */
// Team section data
/* ------------------------------------ */
import { Icon } from 'react-icons-kit';
import { socialFacebook } from 'react-icons-kit/ionicons/socialFacebook';
import { socialDribbble } from 'react-icons-kit/ionicons/socialDribbble';
import { socialGoogleplus } from 'react-icons-kit/ionicons/socialGoogleplus';
import { socialSkype } from 'react-icons-kit/ionicons/socialSkype';
import { socialTwitter } from 'react-icons-kit/ionicons/socialTwitter';

import member1 from 'common/assets/image/interior/team/member1.jpg';
import member2 from 'common/assets/image/interior/team/member2.jpg';
import member3 from 'common/assets/image/interior/team/member3.jpg';

export const teamData = {
  title: 'OUR TEAM MEMBER',
  slogan: 'Meet Our Perfectionist',
  members: [
    {
      id: 1,
      avatar: member1,
      name: 'Roman Ul Oman',
      designation: 'Project Manager',
      social_links: [
        {
          id: 1,
          icon: <Icon icon={socialFacebook} />,
          url: '#1',
        },
        {
          id: 2,
          icon: <Icon icon={socialDribbble} />,
          url: '#1',
        },
        {
          id: 3,
          icon: <Icon icon={socialGoogleplus} />,
          url: '#1',
        },
        {
          id: 4,
          icon: <Icon icon={socialSkype} />,
          url: '#1',
        },
        {
          id: 5,
          icon: <Icon icon={socialTwitter} />,
          url: '#1',
        },
      ],
    },
    {
      id: 2,
      avatar: member2,
      name: 'Jeny Doe',
      designation: 'Lead Designer',
      social_links: [
        {
          id: 1,
          icon: <Icon icon={socialFacebook} />,
          url: '#1',
        },
        {
          id: 2,
          icon: <Icon icon={socialDribbble} />,
          url: '#1',
        },
        {
          id: 3,
          icon: <Icon icon={socialGoogleplus} />,
          url: '#1',
        },
        {
          id: 4,
          icon: <Icon icon={socialSkype} />,
          url: '#1',
        },
        {
          id: 5,
          icon: <Icon icon={socialTwitter} />,
          url: '#1',
        },
      ],
    },
    {
      id: 3,
      avatar: member3,
      name: 'Naina Cooper',
      designation: 'Marketing Manager',
      social_links: [
        {
          id: 1,
          icon: <Icon icon={socialFacebook} />,
          url: '#1',
        },
        {
          id: 2,
          icon: <Icon icon={socialDribbble} />,
          url: '#1',
        },
        {
          id: 3,
          icon: <Icon icon={socialGoogleplus} />,
          url: '#1',
        },
        {
          id: 4,
          icon: <Icon icon={socialSkype} />,
          url: '#1',
        },
        {
          id: 5,
          icon: <Icon icon={socialTwitter} />,
          url: '#1',
        },
      ],
    },
  ],
};

/* ------------------------------------ */
// News section data
/* ------------------------------------ */
export const newsData = [
  {
    id: 1,
    title: 'Corporate design is a crucial part of your brand.',
    excerpt:
      'Corporate design is a crucial part of your brand. Our approach corporate design is extraordinary. Please come and visit us',
    link_text: 'Read',
    link_url: '#',
  },
  {
    id: 2,
    title: 'Learn more about landscape plans, how to design them.',
    excerpt:
      'Learn more about landscape plans, how to design them, what to watch out for in your layout. We deign the appropriate layout for our clients to deliver best',
    link_text: 'Read',
    link_url: '#',
  },
  {
    id: 3,
    title: 'Discover our design ideas, beautiful photos for interior design.',
    excerpt:
      'Discover our design ideas, beautiful photos and how-to projects to create Interior Design. We try to reflect your personality on our design',
    link_text: 'Read',
    link_url: '#',
  },
  {
    id: 4,
    title: 'Interior design is an art and we are trying to paint monalisa.',
    excerpt:
      'With the best players in the designing sector, we explore a whole new world of interior design.Our approach corporate design is extraordinary',
    link_text: 'Read',
    link_url: '#',
  },
];

/* ------------------------------------ */
// Testimonial data
/* ------------------------------------ */
export const testimonialData = {
  title: 'TESTIMONIAL',
  slogan: 'What Our Clients Say',
  reviews: [
    {
      id: 0,
      name: 'Parker Joe',
      designation: 'Co-Founder & CEO',
      username: '@amader craft',
      account_url: '#',
      comment:
        'Get working experience to work with this amazing team & in future want to work together for bright future projects and also make deposit to freelancer.',
      avatar:
        'https://tinyfac.es/data/avatars/7D3FA6C0-83C8-4834-B432-6C65ED4FD4C3-500w.jpeg',
    },
    {
      id: 1,
      name: 'Britney havana',
      designation: 'Co-Founder & CEO',
      username: '@Light’s craft',
      account_url: '#',
      comment:
        'Impressed with master class support of the team and really look forward for the future.Really, really well made! Love that each component is handmade and customised. Great Work :)',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    },
    {
      id: 2,
      name: 'June Spears',
      designation: 'Co-Founder & CEO',
      username: '@Eagle’s craft',
      account_url: '#',
      comment:
        'Get working experience to work with this amazing team & in future want to work together for bright future projects and also make deposit to freelancer.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 3,
      name: 'Jessica Parker',
      designation: 'Co-Founder & CEO',
      username: '@Earth’s craft',
      account_url: '#',
      comment:
        'Impressed with master class support of the team and really look forward for the future.Really, really well made! Love that each component is handmade and customised. Great Work !',
      avatar:
        'https://pbs.twimg.com/profile_images/1049383024306081792/cQkGbpRO.jpg',
    },
    {
      id: 4,
      name: 'Django Dsuja',
      designation: 'Co-Founder & CEO',
      username: '@Moon’s craft',
      account_url: '#',
      comment:
        'Impressed with master class support of the team and really look forward for the future.Really, really well made! Love that each component is handmade and customised. Great Work :)',
      avatar:
        'https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg',
    },
  ],
};

/* ------------------------------------ */
// Gallery data
/* ------------------------------------ */
import galleryImg1 from 'common/assets/image/interior/gallery/1.jpg';
import galleryImg2 from 'common/assets/image/interior/gallery/2.jpg';
import galleryImg3 from 'common/assets/image/interior/gallery/3.jpg';
import galleryImg4 from 'common/assets/image/interior/gallery/4.jpg';
import galleryImg5 from 'common/assets/image/interior/gallery/5.jpg';

export const galleryData = [
  {
    id: 1,
    thumb_url: galleryImg1,
    name: 'Eco friendly',
    link: '#',
  },
  {
    id: 2,
    thumb_url: galleryImg2,
    name: 'Living',
    link: '#',
  },
  {
    id: 3,
    thumb_url: galleryImg3,
    name: 'Corner',
    link: '#',
  },
  {
    id: 4,
    thumb_url: galleryImg4,
    name: 'Wall decor',
    link: '#',
  },
  {
    id: 5,
    thumb_url: galleryImg5,
    name: 'Restroom',
    link: '#',
  },
];

/* ------------------------------------ */
// Newsletter data
/* ------------------------------------ */
export const newsletterData = {
  title: 'SUBSCRIBE NEWSLETTER',
  slogan: 'Don’t Miss Out Any Offer',
  note:
    'Note: Please call us at 12pm to 8am. otherwise our customer supporter will not available to reach your call, but you can drop mail anytime.',
};

/* ------------------------------------ */
// Footer data
/* ------------------------------------ */
import { facebook } from 'react-icons-kit/fa/facebook';
import { dribbble } from 'react-icons-kit/fa/dribbble';
import { googlePlus } from 'react-icons-kit/fa/googlePlus';
import { skype } from 'react-icons-kit/fa/skype';
import { twitter } from 'react-icons-kit/fa/twitter';
import logo from 'common/assets/image/interior/logo.svg';

export const footerData = {
  logo: logo,
  mail: 'hello@redq.io',
  phone: '123-456-7890',
  socialLinks: [
    {
      id: 1,
      icon: <Icon icon={facebook} />,
      name: 'facebook',
      link: '#',
    },
    {
      id: 2,
      icon: <Icon icon={dribbble} />,
      name: 'dribbble',
      link: '#',
    },
    {
      id: 3,
      icon: <Icon icon={googlePlus} />,
      name: 'googlePlus',
      link: '#',
    },
    {
      id: 4,
      icon: <Icon icon={skype} />,
      name: 'skype',
      link: '#',
    },
    {
      id: 5,
      icon: <Icon icon={twitter} />,
      name: 'twitter',
      link: '#',
    },
  ],
  menuWidgets: [
    {
      id: 1,
      title: 'ABOUT US',
      menu: [
        {
          id: 1,
          text: 'Support Center',
          link: '#',
        },
        {
          id: 2,
          text: 'Customer Support',
          link: '#',
        },
        {
          id: 3,
          text: 'About Us',
          link: '#',
        },
        {
          id: 4,
          text: 'Copyright',
          link: '#',
        },
        {
          id: 5,
          text: 'Popular Campaign',
          link: '#',
        },
      ],
    },
    {
      id: 2,
      title: 'OUR INFORMATION',
      menu: [
        {
          id: 1,
          text: 'Return Policy',
          link: '#',
        },
        {
          id: 2,
          text: 'Privacy Policy',
          link: '#',
        },
        {
          id: 3,
          text: 'Terms & Conditions',
          link: '#',
        },
        {
          id: 4,
          text: 'Site Map',
          link: '#',
        },
        {
          id: 5,
          text: 'Store Hours',
          link: '#',
        },
      ],
    },
    {
      id: 3,
      title: 'MY ACCOUNT',
      menu: [
        {
          id: 1,
          text: 'Press inquiries',
          link: '#',
        },
        {
          id: 2,
          text: 'Social media directories',
          link: '#',
        },
        {
          id: 3,
          text: 'Images & B-roll',
          link: '#',
        },
        {
          id: 4,
          text: 'Permissions',
          link: '#',
        },
        {
          id: 5,
          text: 'Speaker requests',
          link: '#',
        },
      ],
    },
    {
      id: 4,
      title: 'POLICY',
      menu: [
        {
          id: 1,
          text: 'Application security',
          link: '#',
        },
        {
          id: 2,
          text: 'Software principles',
          link: '#',
        },
        {
          id: 3,
          text: 'Unwanted software policy',
          link: '#',
        },
        {
          id: 4,
          text: 'Responsible supply chain',
          link: '#',
        },
      ],
    },
  ],
};

/* ------------------------------------ */
// social profile
/* ------------------------------------ */
export const socialProfile = [
  {
    id: 1,
    icon: 'flaticon-facebook-logo',
    link: '#',
  },
  {
    id: 2,
    icon: 'flaticon-twitter-logo-silhouette',
    link: '#',
  },
  {
    id: 3,
    icon: 'flaticon-instagram',
    link: '#',
  },
  {
    id: 4,
    icon: 'flaticon-tumblr-logo',
    link: '#',
  },
  {
    id: 5,
    icon: 'flaticon-dribble-logo',
    link: '#',
  },
];
