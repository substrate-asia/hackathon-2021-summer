import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';
import Container from 'common/components/UI/Container';
import { HowWrapper, BtnWrapper } from './how.style';

const HowItWorksSection = ({
  row,
  contentArea,
  greetingStyle,
  aboutStyle,
  button,
}) => {
  return (
    <HowWrapper>
      <Container noGutter mobileGutter width="1200px">
        <Box {...row}>
          <Box {...contentArea}>
            <Heading content="How is it Work!" {...greetingStyle} />

            <Text
              content="How much does GoDrive cost in your city? Calculate a fare estimate for your next trip. Simply enter a pickup location and destinationto get started. The new Driver app helps you earn smarter and supports you–like a partner–at every turn."
              {...aboutStyle}
            />
            <BtnWrapper>
              <Link href="#services">
                <a>
                  <Button
                    title="Explore"
                    variant="textButton"
                    icon={<i className="flaticon-next" />}
                    {...button}
                  />
                </a>
              </Link>
            </BtnWrapper>
          </Box>
        </Box>
      </Container>
    </HowWrapper>
  );
};

HowItWorksSection.propTypes = {
  row: PropTypes.object,
  contentArea: PropTypes.object,
  greetingStyle: PropTypes.object,
  aboutStyle: PropTypes.object,
  button: PropTypes.object,
};

HowItWorksSection.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  contentArea: {
    width: ['100%', '100%', '45%', '50%', '50%'],
    p: ['65px 0 80px 0', '65px 0 80px 0', '80px 0 60px 0', '0'],
    flexBox: true,
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  greetingStyle: {
    as: 'h3',
    fontSize: ['22px', '26px', '26px', '30px', '36px'],
    fontWeight: '600',
    color: '#15172C',
    lineHeight: '1.34',
    mb: ['15px', '18px', '18px', '20px', '30px'],
    textAlign: 'left',
    fontFamily: 'Poppins',
  },
  aboutStyle: {
    lineHeight: ['28px', '32px', '32px', '32px', '32px'],
    mt: ['0px', '0px', '0px', '0px', '0px'],
    mb: ['20px', '20px', '20px', '20px', '20px'],
    maxWidth: ['100%', '100%', '100%', '510px', '510px'],
    textAlign: ['left', 'left'],
    fontSize: ['15px', '16px'],
    fontWeight: '400',
    color: '#15172C',
    fontFamily: 'Lato',
  },
  button: {
    type: 'button',
    fontSize: '14px',
    fontWeight: '700',
    fontFamily: 'Lato',
    color: '#fff',
    borderRadius: '4px',
    pl: '22px',
    pr: '22px',
    colors: 'primaryWithBg',
    minHeight: '47px',
    pt: '0px',
    pb: '0',
  },
};

export default HowItWorksSection;
