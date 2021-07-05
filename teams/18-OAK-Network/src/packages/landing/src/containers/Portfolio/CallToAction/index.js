import React from 'react';
import PropTypes from 'prop-types';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';
import Container from 'common/components/UI/Container';

import { ButtonWrapper } from '../../Portfolio/portfolio.style';
import { CallToActionWrapper } from './callToAction.style';

const CallToAction = ({
  sectionWrapper,
  textArea,
  buttonArea,
  buttonStyle,
  title,
  description,
}) => {
  return (
    <Box {...sectionWrapper} as="section">
      <Container noGutter mobileGutter width="1200px">
        <CallToActionWrapper>
          <Box {...textArea}>
            <Heading content="What’s cooking in the lab?" {...title} />
            <Text
              content="The place to find the latest industry trends, new Blue Label Labs app launches and information to keep you at the top your tech game."
              {...description}
            />
          </Box>
          <Box {...buttonArea}>
            <ButtonWrapper>
              <Button
                title="READ OUR BLOG "
                className="portfolio_button"
                {...buttonStyle}
              />
            </ButtonWrapper>
          </Box>
        </CallToActionWrapper>
      </Container>
    </Box>
  );
};

CallToAction.propTypes = {
  sectionWrapper: PropTypes.object,
  textArea: PropTypes.object,
  buttonArea: PropTypes.object,
  buttonStyle: PropTypes.object,
  title: PropTypes.object,
  description: PropTypes.object,
};

CallToAction.defaultProps = {
  sectionWrapper: {},
  textArea: {
    width: ['100%', '100%', '55%'],
    mb: ['40px', '40px', '0', '0', '0'],
  },
  title: {
    fontSize: ['20px', '26px', '26px', '30px', '30px'],
    fontWeight: '700',
    color: '#302b4e',
    lineHeight: '1.34',
    mb: ['15px', '15px', '18px', '22px', '22px'],
    textAlign: ['center', 'center', 'left', 'left', 'left'],
  },
  description: {
    fontSize: ['15px', '16px'],
    fontWeight: '400',
    color: '#43414e',
    lineHeight: '1.5',
    mb: 0,
    textAlign: ['center', 'center', 'left', 'left', 'left'],
  },
  buttonArea: {
    zIndex: 1,
  },
  buttonStyle: {
    type: 'button',
    fontSize: ['14px', '14px', '15px', '16px', '16px'],
    fontWeight: '500',
    color: '#fff',
    pl: '35px',
    pr: '35px',
  },
};

export default CallToAction;
