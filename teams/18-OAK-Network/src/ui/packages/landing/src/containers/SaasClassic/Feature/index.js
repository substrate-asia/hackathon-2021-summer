import React from 'react';
import PropTypes from 'prop-types';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import FeatureBlock from 'common/components/FeatureBlock';
import Container from 'common/components/UI/Container';

import SectionWrapper from './feature.style';
import { FEATURES } from 'common/data/SaasClassic';

const FeatureSection = ({
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
    <SectionWrapper id="feature_section">
      <Container>
        <Box {...secTitleWrapper}>
          <Text {...secText} content="PRODUCT COMPARISON" />
          <Heading
            {...secHeading}
            content="Whats different from other dashboards"
          />
        </Box>

        <Box {...row}>
          {FEATURES.map((item, index) => (
            <Box {...col} key={`feature-item-${index}`} className="feature_col">
              <FeatureBlock
                icon={<i className={item.icon} />}
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
    </SectionWrapper>
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
    color: '#ff4362',
    mb: '12px',
  },
  secHeading: {
    textAlign: 'center',
    fontSize: ['20px', '24px', '36px', '36px'],
    fontWeight: '700',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: '0',
    ml: 'auto',
    mr: 'auto',
    lineHeight: '1.12',
    width: '540px',
    maxWidth: '100%',
  },
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: ['-30px', '-30px', '-30px', '-25px', '-30px'],
    mr: ['-30px', '-30px', '-30px', '-25px', '-45px'],
  },
  col: {
    width: [1, 1 / 2, 1 / 2, 1 / 3],
    pl: ['30px', '30px', '30px', '25px', '45px'],
    pr: ['30px', '30px', '30px', '25px', '45px'],
    mb: ['50px', '70px'],
  },
  FeatureItemStyle: {},
  iconStyle: {
    width: ['72px', '72px', '72px', '72px', '82px'],
    height: ['72px', '72px', '72px', '72px', '82px'],
    mr: '20px',
    borderRadius: ['20px', '20px', '20px', '20px', '28px'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bg: '#ffecef',
    color: '#ff4361',
    fontSize: ['26px', '26px', '26px', '26px', '30px'],
  },
  featureTitle: {
    fontSize: ['17px', '19px'],
    fontWeight: '500',
    color: '#0f2137',
    letterSpacing: '-0.020em',
    lineHeight: '1.5',
    mb: ['10px', '13px'],
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
