import React from 'react';
import PropTypes from 'prop-types';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Button from 'common/components/Button';
import Container from 'common/components/UI/Container';

import { ButtonWrapper } from '../../Portfolio/portfolio.style';
import { ActiveStatus } from './contact.style';
import Author from 'common/assets/image/portfolio/avatar.png';

const ContactSection = ({
  sectionWrapper,
  secTitleWrapper,
  secTitle,
  secDescription,
  replyWrapper,
  replyTime,
  buttonStyle,
  buttonWrapper,
}) => {
  return (
    <Box {...sectionWrapper} as="section">
      <Container noGutter mobileGutter width="1200px">
        <Box {...secTitleWrapper}>
          <Heading {...secTitle} content="Let’s Work Together" />
          <Text
            {...secDescription}
            content="If you have a website or mobile app idea in mind or you need some advice about product design, feel free to contact me. Currently my time books quickly, so the sooner you write, the better it is for both of us."
          />
        </Box>
        <Box {...replyWrapper}>
          <ActiveStatus>
            <Image src={Author} alt="Author Avatar" />
          </ActiveStatus>
          <Heading
            as="h4"
            content="Reply time: within 1-2 working days"
            {...replyTime}
          />
        </Box>
        <Box {...buttonWrapper}>
          <ButtonWrapper>
            <Button
              title="hello@redq.io"
              className="portfolio_button"
              {...buttonStyle}
            />
          </ButtonWrapper>
        </Box>
      </Container>
    </Box>
  );
};

ContactSection.propTypes = {
  sectionWrapper: PropTypes.object,
  secTitleWrapper: PropTypes.object,
  secTitle: PropTypes.object,
  secDescription: PropTypes.object,
  replyWrapper: PropTypes.object,
  replyTime: PropTypes.object,
  buttonStyle: PropTypes.object,
  buttonWrapper: PropTypes.object,
};

ContactSection.defaultProps = {
  sectionWrapper: {
    pt: ['70px', '80px', '100px', '110px', '140px'],
    pb: ['70px', '80px', '100px', '110px', '140px'],
    bg: '#f9f9f9',
  },
  secTitleWrapper: {
    mb: '30px',
  },
  secTitle: {
    fontSize: ['22px', '26px', '26px', '30px', '30px'],
    fontWeight: '600',
    color: '#302b4e',
    lineHeight: '1.34',
    mb: ['15px', '18px', '18px', '20px', '20px'],
    textAlign: 'center',
  },
  secDescription: {
    fontSize: ['15px', '16px'],
    fontWeight: '400',
    color: '#43414e',
    lineHeight: '1.5',
    textAlign: 'center',
    width: '600px',
    maxWidth: '100%',
    ml: 'auto',
    mr: 'auto',
    mb: '0',
  },
  replyWrapper: {
    flexBox: true,
    alignItems: 'center',
    justifyContent: 'center',
  },
  replyTime: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#302b4e',
    mb: 0,
  },
  buttonStyle: {
    type: 'button',
    fontSize: '16px',
    fontWeight: '500',
    color: '#fff',
    pl: '23px',
    pr: '23px',
  },
  buttonWrapper: {
    flexBox: true,
    justifyContent: 'center',
    mt: '50px',
  },
};

export default ContactSection;
