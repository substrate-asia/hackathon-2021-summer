import React from 'react';
import PropTypes from 'prop-types';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import FeatureBlock from 'common/components/FeatureBlock';
import Image from 'common/components/Image';
import Container from 'common/components/UI/Container';

import { FEATURES } from 'common/data/SaasModern';

const FeatureSection = ({
  sectionWrapper,
  secTitleWrapper,
  secText,
  secHeading,
  row,
  col,
  FeatureItemStyle,
  iconStyle,
  contentStyle,
  featureTitle,
  featureDescription,
}) => {
  return (
    <Box {...sectionWrapper} as="section" id="feature_section">
      <Container>
        <Box {...secTitleWrapper}>
          <Text {...secText} content="FEATURES" />
          <Heading {...secHeading} content="Why you choose Our Plugin" />
        </Box>

        <Box {...row}>
          {FEATURES.map((item, index) => (
            <Box {...col} key={`feature-item-${index}`}>
              <FeatureBlock
                icon={
                  <Image
                    src={item.icon}
                    alt={`feature-item-icon-${index + 1}`}
                  />
                }
                wrapperStyle={FeatureItemStyle}
                iconStyle={iconStyle}
                contentStyle={contentStyle}
                iconPosition="left"
                title={<Heading content={item.title} {...featureTitle} />}
                description={
                  <Text content={item.description} {...featureDescription} />
                }
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

FeatureSection.propTypes = {
  sectionHeader: PropTypes.object,
  sectionWrapper: PropTypes.object,
  secTitleWrapper: PropTypes.object,
  secText: PropTypes.object,
  secHeading: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  FeatureItemStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  featureTitle: PropTypes.object,
  featureDescription: PropTypes.object,
};

FeatureSection.defaultProps = {
  sectionWrapper: {
    pt: ['50px', '50px', '50px', '50px', '50px'],
    pb: ['20px', '50px', '60px', '70px', '100px'],
  },
  secTitleWrapper: {
    mb: ['60px', '100px'],
  },
  secText: {
    as: 'span',
    display: 'block',
    textAlign: 'center',
    fontSize: '14px',
    letterSpacing: '0.15em',
    fontWeight: '700',
    color: '#2aa275',
    mb: '5px',
  },
  secHeading: {
    textAlign: 'center',
    fontSize: ['20px', '24px'],
    fontWeight: '500',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: '0',
    lineHeight: '1.67',
  },
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: ['-30px', '-30px', '-30px', '-30px', '-30px'],
    mr: ['-30px', '-30px', '-30px', '-30px', '-45px'],
  },
  col: {
    width: [1, 1 / 2, 1 / 2, 1 / 3],
    pl: ['30px', '30px', '30px', '30px', '45px'],
    pr: ['30px', '30px', '30px', '30px', '45px'],
    mb: ['50px', '70px'],
  },
  FeatureItemStyle: {
    alignItems: 'center',
  },
  iconStyle: {
    width: ['90px', '90px', '90px', '75px', '90px'],
    pr: '20px',
  },
  featureTitle: {
    fontSize: ['18px', '20px'],
    fontWeight: '400',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    lineHeight: '1.5',
    mb: ['10px', '15px'],
  },
  featureDescription: {
    fontSize: '15px',
    fontWeight: '400',
    color: '#5d646d',
    letterSpacing: '-0.025em',
    lineHeight: '1.88',
    mb: 0,
  },
};

export default FeatureSection;
