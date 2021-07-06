import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Button from 'common/components/Button';
import Input from 'common/components/Input';
import Fade from 'react-reveal/Fade';
import Container from 'common/components/UI/Container';
import { BannerWrapper, EmailInputWrapper } from './banner.style';
import CarImage from 'common/assets/image/ride/car.png';
import ManImage from 'common/assets/image/ride/man.png';
import bannerApp from 'common/assets/image/ride/bannerApp.png';
import bannerPlay from 'common/assets/image/ride/bannerPlay.png';

const BannerSection = ({
  row,
  contentArea,
  imageArea,
  greetingStyle,
  aboutStyle,
  greetingStyleTwo,
  button,
}) => {
  return (
    <BannerWrapper id="banner_section">
      <Container noGutter mobileGutter width="1200px" className="container">
        <Box {...row}>
          <Box {...contentArea} className="contentArea">
            <Heading
              content="Get to where you want to be."
              {...greetingStyle}
            />
            <Heading content="It's in your hand. " {...greetingStyleTwo} />
            <EmailInputWrapper>
              <Input
                inputType="email"
                placeholder="Enter Email Address"
                iconPosition="left"
                aria-label="email"
              />
              <Link href="#fare_section">
                <a>
                  <Button title="Text me a link" {...button} />
                </a>
              </Link>
            </EmailInputWrapper>
            <Text
              content="We’ll send you a text with a link to download the app."
              {...aboutStyle}
            />
            <Fade up>
              <div className="bannerImageBtn">
                <Link href="#1">
                  <a>
                    <Image
                      src={bannerApp}
                      className="app_image_area"
                      alt="App Image"
                    />
                  </a>
                </Link>
                <Link href="#1">
                  <a>
                    <Image
                      src={bannerPlay}
                      className="play_image_area"
                      alt="GooglePlay Image"
                    />
                  </a>
                </Link>
              </div>
            </Fade>
          </Box>
          <Box {...imageArea} className="image_area">
            <Image src={ManImage} className="man_image_area" alt="Man Image" />

            <Image src={CarImage} className="car_image_area" alt="Car Image" />
          </Box>
        </Box>
      </Container>
    </BannerWrapper>
  );
};

BannerSection.propTypes = {
  row: PropTypes.object,
  contentArea: PropTypes.object,
  imageArea: PropTypes.object,
  greetingStyle: PropTypes.object,
  nameStyle: PropTypes.object,
  designationStyle: PropTypes.object,
  aboutStyle: PropTypes.object,
  roleStyle: PropTypes.object,
  roleWrapper: PropTypes.object,
  greetingStyleTwo: PropTypes.object,
  button: PropTypes.object,
};

BannerSection.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
  contentArea: {
    width: ['100%', '100%', '50%', '50%'],
    p: [
      '150px 0 0px 0',
      '150px 0 0px 0',
      '150px 0 0px 0',
      '150px 0 0px 0',
      '100px 0 0px 0',
    ],
    flexBox: true,
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  imageArea: {
    width: ['100%', '100%', '50%', '50%'],
    flexBox: true,
    alignItems: 'flex-end',
    position: 'relative',
  },
  greetingStyle: {
    as: 'h1',
    color: '#15172c',
    fontSize: ['30px', '36px', '48px', '52px', '72px'],
    fontWeight: '600',
    fontFamily: 'Poppins',
    lineHeight: ['40px', '48px', '60px', '65px', '98px'],
    mb: '0px',
  },
  greetingStyleTwo: {
    as: 'h1',
    color: '#15172c',
    fontSize: ['30px', '36px', '48px', '60px', '72px'],
    fontWeight: '400',
    fontFamily: 'Poppins',
    lineHeight: ['40px', '48px', '60px', '72px', '98px'],
    mb: '8px',
  },
  roleWrapper: {
    flexBox: true,
    mb: '28px',
  },
  roleStyle: {
    as: 'h4',
    fontSize: ['18px', '18px', '18px', '18px', '20px'],
    fontWeight: '500',
    color: '#fff',
    mb: '0',
    ml: '10px',
  },
  aboutStyle: {
    fontSize: ['15px', '15px', '15px', '16px', '16px'],
    fontFamily: 'Lato',
    fontWeight: '400',
    color: '#15172c',
    lineHeight: '1.5',
    mb: '30px',
    mt: '30px',
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
    minHeight: '55px',
    pt: '0px',
    pb: '0',
  },
};

export default BannerSection;
