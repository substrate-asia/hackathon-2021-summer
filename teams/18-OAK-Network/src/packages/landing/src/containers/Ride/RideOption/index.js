import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Container from 'common/components/UI/Container';
import Button from 'common/components/Button';
import { OptionWrapper } from './rideOption.style';
import DriverImage from 'common/assets/image/ride/driver-side.svg';
import RiderImage from 'common/assets/image/ride/riding-share.svg';

const SkillSection = ({
  sectionWrapper,
  secTitleWrapper,
  secTitle,
  secDescription,
  row,
  col,
  col1,
  col2,
  desTitleWrapper,
  rideTitle,
  desOnHover,
  desDetails,
  button1,
  button2,
}) => {
  const [state, setState] = useState({
    active: true,
  });
  const activeStatus = state.active;

  return (
    <OptionWrapper id="ride_section">
      <Box {...sectionWrapper} as="section">
        <Container noGutter mobileGutter width="1200px" className="container">
          <Box {...secTitleWrapper}>
            <Heading {...secTitle} content="Follow Your Own Path" />
            <Text
              {...secDescription}
              content="You will have the city at your fingertips with some simple touches!"
            />
          </Box>

          <Box {...row}>
            <Box
              {...col}
              {...col1}
              className={activeStatus ? 'riderBlock active-item' : 'riderBlock'}
              onMouseEnter={() => setState({ active: true })}
            >
              <Box
                {...desTitleWrapper}
                className="desTitleWrapper desTitleWrapperLeft"
              >
                <Heading {...rideTitle} content="Rider" className="desTitle" />
                <Box {...desOnHover} className="desOnHover desOnHoverLeft">
                  <Text
                    {...desDetails}
                    className="desDetailsFirst"
                    content="Ride at any time."
                  />
                  <Text {...desDetails} content="Find Riders around you!" />
                  <Link href="#services">
                    <a className="buttonStyle">
                      <Button title="Learn More" {...button1} />
                    </a>
                  </Link>
                  <Link href="#services">
                    <a className="buttonStyle signupBtn">
                      <Button title="Sign up for ride" {...button2} />
                    </a>
                  </Link>
                </Box>
              </Box>
              <Image
                src={RiderImage}
                className="rider_image_area"
                alt="Man Image"
              />
            </Box>
            <Box
              {...col}
              {...col2}
              className={
                activeStatus === false
                  ? 'driverBlock active-item'
                  : 'driverBlock'
              }
              onMouseEnter={() => setState({ active: false })}
            >
              <Image
                src={DriverImage}
                className="driver_image_area"
                alt="Driver Image"
              />
              <Box {...desTitleWrapper} className="desTitleWrapper">
                <Heading {...rideTitle} content="Driver" className="desTitle" />
                <Box {...desOnHover} className="desOnHover ">
                  <Text
                    {...desDetails}
                    className="desDetailsFirst"
                    content="Drive when you want."
                  />
                  <Text
                    {...desDetails}
                    content="Find opportunities around you!"
                  />
                  <Link href="#services">
                    <a className="buttonStyle">
                      <Button title="Learn More" {...button1} />
                    </a>
                  </Link>
                  <Link href="#services">
                    <a className="buttonStyle signupBtn">
                      <Button title="Sign up for ride" {...button2} />
                    </a>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </OptionWrapper>
  );
};

SkillSection.propTypes = {
  sectionWrapper: PropTypes.object,
  secTitleWrapper: PropTypes.object,
  secTitle: PropTypes.object,
  secDescription: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  skillTitle: PropTypes.object,
  skillDescription: PropTypes.object,
  skillSuccessRate: PropTypes.object,
  successRateText: PropTypes.object,
  col: PropTypes.object,
  col1: PropTypes.object,
  col2: PropTypes.object,
  desTitleWrapper: PropTypes.object,
  rideTitle: PropTypes.object,
  desOnHover: PropTypes.object,
  desDetails: PropTypes.object,
  button1: PropTypes.object,
  button2: PropTypes.object,
};

SkillSection.defaultProps = {
  sectionWrapper: {
    pt: ['60px', '80px', '100px', '110px', '180px'],
    pb: ['60px', '80px', '100px', '110px', '120px'],
  },
  secTitleWrapper: {
    mb: ['65px', '65px', '80px', '90px', '90px'],
  },
  secTitle: {
    fontSize: ['22px', '26px', '26px', '30px', '36px'],
    fontWeight: '600',
    color: '#15172C',
    lineHeight: '1.34',
    mb: ['15px', '18px', '18px', '20px', '30px'],
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  secDescription: {
    fontSize: ['15px', '16px'],
    fontWeight: '400',
    color: '#15172C',
    lineHeight: '1.5',
    mb: '0',
    textAlign: 'center',
    width: '300px',
    maxWidth: '100%',
    ml: 'auto',
    mr: 'auto',
    fontFamily: 'Lato',
  },
  rideTitle: {
    fontSize: ['22px', '26px', '26px', '30px', '36px'],
    fontWeight: '600',
    color: '#15172C',
    lineHeight: '1.34',
    mb: ['15px', '18px', '18px', '20px', '30px'],
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  row: {
    flexBox: true,
    flexWrap: 'wrap',
  },
  col: {
    width: '48%',
    bg: '#fcfcfc',
    pt: ['50px', '50px', '50px', '110px', '110px'],
    pb: ['50px', '50px', '50px', '110px', '110px'],

    flexBox: true,
  },
  col1: {
    pl: ['30px', '30px', '50px', '85px', '85px'],
  },
  col2: {
    pr: ['20px', '20px', '40px', '85px', '85px'],
  },
  desTitleWrapper: {
    flexBox: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  desOnHover: {
    textAlign: 'right',
    width: '100%',
  },
  desDetails: {
    fontSize: ['14px', '14px', '16px', '16px', '16px'],
    fontWeight: '400',
    color: '#15172C',
    lineHeight: '1.5',
    mb: '0',
    maxWidth: '100%',
    fontFamily: 'Lato',
  },
  button1: {
    type: 'button',
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: 'Lato',
    color: '#000',
    border: '0',
    minHeight: '55px',
    p: '0',
    bg: 'tarnsperant',
  },
  button2: {
    type: 'button',
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: 'Lato',
    color: '#1A73E8',
    border: '0',
    minHeight: 'auto',
    p: '0',
  },
};

export default SkillSection;
