import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';
import Input from 'common/components/Input';
import Container from 'common/components/UI/Container';
import SocialProfile from '../SocialProfile';

import {
  FooterWrapper,
  Newsletter,
  FooterNav,
  FooterNavItem,
} from './footer.style';
import { FOOTER_MENU } from 'common/data/Portfolio/data';
import { SOCIAL_PROFILES } from 'common/data/Portfolio/data';
import { heart } from 'react-icons-kit/fa/heart';

const Footer = ({
  row,
  col,
  titleStyle,
  linkStyle,
  newsletterButton,
  copyrightStyle,
  contactItem,
  flexBox,
  contactTitle,
  contactInfo,
  noMargin,
}) => {
  return (
    <FooterWrapper>
      <Container noGutter mobileGutter width="1200px">
        <Box {...row}>
          <Box {...col}>
            <Heading
              as="h3"
              content="So, do we work together?"
              {...titleStyle}
            />
            <Link href="#">
              <a>
                <Heading as="h3" content="LET'S TALK!" {...linkStyle} />
              </a>
            </Link>
          </Box>
          <Box {...col}>
            <Heading as="h3" content="A treat for your inbox" {...titleStyle} />
            <Newsletter>
              <Input
                inputType="email"
                placeholder="Email address"
                iconPosition="right"
                isMaterial={false}
                className="email_input"
                aria-label="email"
              />
              <Button {...newsletterButton} title="Subscribe" />
            </Newsletter>
          </Box>
        </Box>

        <Box {...row}>
          <Box {...col}>
            <SocialProfile
              className="footer_social"
              items={SOCIAL_PROFILES}
              iconSize={40}
            />
            <Text
              as="span"
              content="© 2018 All rights reserved. "
              {...copyrightStyle}
            />
            <Link href="#">
              <a>
                {' '}
                <Text as="span" content=" RedQ, Inc." {...copyrightStyle} />
              </a>
            </Link>
          </Box>
          <Box {...col} {...flexBox}>
            <Box {...contactItem}>
              <Text content="Need help?" {...contactTitle} />
              <Text content="redq.io" {...contactInfo} />
            </Box>
            <Box {...contactItem}>
              <Text content="Feel like talking" {...contactTitle} />
              <Text content="+479-443-9334" {...contactInfo} />
            </Box>
          </Box>
        </Box>

        <Box {...row} {...noMargin}>
          <Box {...col}>
            <Text
              as="span"
              content="Built & designed with"
              {...copyrightStyle}
            />
            <Icon icon={heart} size={14} className="heart_sign" />
          </Box>
          <Box {...col} {...flexBox}>
            <FooterNav>
              {FOOTER_MENU.map((item, index) => (
                <FooterNavItem key={`footer-nav-item-${index}`}>
                  <Link href={item.path || '#'}>
                    <a>{item.label}</a>
                  </Link>
                </FooterNavItem>
              ))}
            </FooterNav>
          </Box>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

Footer.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  titleStyle: PropTypes.object,
  linkStyle: PropTypes.object,
  newsletterButton: PropTypes.object,
  copyrightStyle: PropTypes.object,
  contactItem: PropTypes.object,
  flexBox: PropTypes.object,
  contactTitle: PropTypes.object,
  contactInfo: PropTypes.object,
  noMargin: PropTypes.object,
};

Footer.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    ml: '-15px',
    mr: '-15px',
    mb: ['0', '70px', '80px', '100px', '100px'],
  },
  col: {
    width: [1, 1 / 2, 1 / 2, 1 / 3, 1 / 3],
    pl: '15px',
    pr: '15px',
    mb: ['40px', '0', '0', '0', '0', '0'],
  },
  titleStyle: {
    fontSize: ['16px', '18px'],
    fontWeight: '600',
    mb: ['20px', '25px'],
  },
  linkStyle: {
    fontSize: ['22px', '26px', '26px', '30px'],
    color: '#3444f1',
    mb: 0,
  },
  newsletterButton: {
    type: 'button',
    fontSize: '16px',
    pl: '20px',
    pr: '20px',
    colors: 'primary',
    minHeight: 'auto',
  },
  copyrightStyle: {
    fontSize: '14px',
    color: '#fff',
  },
  flexBox: {
    flexBox: true,
    justifyContent: 'space-between',
    // flexWrap: 'wrap'
  },
  contactItem: {
    // width: 1 / 2
  },
  contactTitle: {
    fontSize: ['15x', '15px', '16px', '16px', '16px'],
    mb: '10px',
  },
  contactInfo: {
    fontSize: ['16x', '16px', '18px', '18px', '20px'],
    fontWeight: '500',
    mb: 0,
  },
  noMargin: {
    mb: '0',
  },
};

export default Footer;
