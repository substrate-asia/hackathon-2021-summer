import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import Link from 'next/link';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Logo from 'common/components/UIElements/Logo';
import Container from 'common/components/UI/Container';
import FooterWrapper, { List, ListItem } from './footer.style';

import LogoImage from 'common/assets/image/agency/logo.png';

import data from 'common/data/Agency';

const Footer = ({
  row,
  col,
  colOne,
  colTwo,
  titleStyle,
  logoStyle,
  textStyle,
}) => {
  return (
    <FooterWrapper id="footerSection">
      <Container>
        <Box className="row" {...row}>
          <Box {...colOne}>
            <Logo
              href="#"
              logoSrc={LogoImage}
              title="Agency"
              logoStyle={logoStyle}
            />
          </Box>
          {/* End of footer logo column */}
          <Box {...colTwo}>
            <div style={{ width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
              <div className="social">
              {
                _.map(data.socialMedia, (item, keyName) => {
                  if (!item.link) { return null }
                  return (
                    <a className='third-link text-storm gr-hover-text-primary' target='_blank'>
                      <FontAwesomeIcon icon={item.icon}></FontAwesomeIcon>
                    </a>
                  )
                })
              }
              </div>
              <div className="menu">
                {_.map(data.footerMenu, (item) => (
                  <a href="#">{item.display}</a>
                ))}
              </div>
            </div>
          </Box>
          {/* End of footer List column */}
        </Box>
      </Container>
    </FooterWrapper>
  );
};

// Footer style props
Footer.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  colOne: PropTypes.object,
  colTwo: PropTypes.object,
  titleStyle: PropTypes.object,
  textStyle: PropTypes.object,
  logoStyle: PropTypes.object,
};

// Footer default style
Footer.defaultProps = {
  // Footer row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-4px',
    mr: '-4px',
  },
  // Footer col one style
  colOne: {
    width: ['100%', '30%', '35%', '23%'],
    mt: [0, '13px'],
    mb: ['30px', 0],
    pl: ['15px', 0],
    pr: ['15px', '15px', 0],
  },
  // Footer col two style
  colTwo: {
    width: ['100%', '70%', '65%', '77%'],
    flexBox: true,
    flexWrap: 'wrap',
  },
  // Footer col default style
  col: {
    width: ['100%', '50%', '50%', '25%'],
    pl: '15px',
    pr: '15px',
    mb: '30px',
  },
  // widget title default style
  titleStyle: {
    color: '#343d48',
    fontSize: '16px',
    fontWeight: '700',
  },
  // Default logo size
  logoStyle: {
    width: '80px',
    mb: '15px',
  },
  // widget text default style
  textStyle: {
    color: '#0f2137',
    fontSize: '16px',
    mb: '10px',
  },
};

export default Footer;
