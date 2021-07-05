import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import 'react-image-gallery/styles/css/image-gallery.css';
import Container from 'common/components/UI/Container';
import FeatureSliderWrapper from './featureSlider.style';
import Image1 from 'common/assets/image/app/slide-2.png';
import Image2 from 'common/assets/image/app/slide-1.png';
import Image3 from 'common/assets/image/app/slide-3.png';
import Image4 from 'common/assets/image/app/slide-4.png';
import Image5 from 'common/assets/image/app/slide-5.png';
import Thumb1 from 'common/assets/image/app/6.svg';
import Thumb2 from 'common/assets/image/app/1.svg';
import Thumb3 from 'common/assets/image/app/2.svg';
import Thumb4 from 'common/assets/image/app/3.svg';
import Thumb5 from 'common/assets/image/app/4.svg';
import Thumb6 from 'common/assets/image/app/5.svg';

// import DomainSection from '../container/Hosting/Domain';
const images = [
  {
    original: `${Image1}`,
    thumbnail: `${Thumb1}`,
    thumbnailLabel: 'Super Performance',
    originalAlt: 'slide one',
    thumbnailAlt: 'thumb one',
  },
  {
    original: `${Image2}`,
    thumbnail: `${Thumb2}`,
    thumbnailLabel: 'Search optimization',
    originalAlt: 'slide two',
    thumbnailAlt: 'thumb two',
  },
  {
    original: `${Image3}`,
    thumbnail: `${Thumb3}`,
    thumbnailLabel: 'Customer Support',
    originalAlt: 'slide three',
    thumbnailAlt: 'thumb three',
  },
  {
    original: `${Image2}`,
    thumbnail: `${Thumb4}`,
    thumbnailLabel: '100% response time',
    originalAlt: 'slide four',
    thumbnailAlt: 'thumb four',
  },
  {
    original: `${Image4}`,
    thumbnail: `${Thumb5}`,
    thumbnailLabel: 'Maintaining Milestones',
    originalAlt: 'slide five',
    thumbnailAlt: 'thumb five',
  },
  {
    original: `${Image5}`,
    thumbnail: `${Thumb6}`,
    thumbnailLabel: 'Organised Code',
    originalAlt: 'slide six',
    thumbnailAlt: 'thumb six',
  },
];

const FeatureSlider = ({ sectionSubTitle, sectionTitle, sectionHeader }) => {
  return (
    <FeatureSliderWrapper>
      <div className="FeatureSliderInner">
        <span> </span>
        <span> </span>
        <span> </span>
      </div>
      <Container>
        <Box {...sectionHeader}>
          <Text {...sectionSubTitle} />
          <Heading {...sectionTitle} />
        </Box>
        <Box className="FeatureSlider">
          <ImageGallery
            items={images}
            className="Slider-img"
            showPlayButton={false}
            showFullscreenButton={false}
            showNav={false}
            showBullets={true}
            autoPlay={true}
          />
        </Box>
      </Container>
    </FeatureSliderWrapper>
  );
};

// FeatureSlider style props
FeatureSlider.propTypes = {
  sectionSubTitle: PropTypes.object,
  sectionTitle: PropTypes.object,
  sectionHeader: PropTypes.object,
};

// FeatureSlider default style
FeatureSlider.defaultProps = {
  sectionHeader: {},
  sectionSubTitle: {
    content: 'WHY CHOOSE US',
    as: 'span',
    display: 'block',
    textAlign: 'center',
    fontSize: '14px',
    letterSpacing: '0.13em',
    fontWeight: '700',
    color: '#1a73e8',
    mb: '10px',
  },
  // section title default style
  sectionTitle: {
    content: 'Key Features of Our App',
    textAlign: 'center',
    fontSize: ['20px', '24px', '24px', '24px', '30px'],
    fontWeight: '400',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: '0',
  },
};

export default FeatureSlider;
