import React from 'react';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Card from 'common/components/Card';
import Image from 'common/components/Image';
import FeatureBlock from 'common/components/FeatureBlock';
import Container from 'common/components/UI/Container';
import QualitySectionWrapper from './qualitySection.style';

import data from 'common/data/Agency';

import FeatureImage from 'common/assets/image/agency/surface-studio.png';

const QualitySection = ({
  row,
  col,
  title,
  featureCol,
  description,
  textArea,
  imageArea,
  imageAreaRow,
  imageWrapper,
  featureTitle,
  featureDescription,
  iconStyle,
}) => {
  return (
    <QualitySectionWrapper id="qualitySection">
      <Container>
        <Box className="row" {...row}>
          <Box className="col" {...col} {...textArea}>
            <FeatureBlock
              title={
                <Heading
                  content="Our Quality feature that customers always prefer to use on their products."
                  {...title}
                />
              }
              description={
                <Text
                  content="Customers are our first priority and we provide some exceptional features that our customer prefers . That's why our customers never leave us ."
                  {...description}
                />
              }
            />
          </Box>
        </Box>
        <Box className="row" {...row} {...textArea}>
          {data.qualityFeature.map((feature, index) => (
            <Box
              className="col"
              {...featureCol}
              key={`quality_feature-${index}`}
            >
              <FeatureBlock
                icon={<i className={feature.icon} />}
                iconPosition="left"
                iconStyle={iconStyle}
                title={<Heading content={feature.title} {...featureTitle} />}
                description={
                  <Text content={feature.description} {...featureDescription} />
                }
              />
            </Box>
          ))}
        </Box>
      </Container>
      <Container fluid noGutter className="info-sec-container">
        <Box className="row" {...row} {...imageAreaRow}>
          <Box className="col" {...col} {...imageArea}>
            <Card {...imageWrapper}>
              <Fade right delay={90}>
                <Image src={FeatureImage} alt="Feature Image" />
              </Fade>
            </Card>
          </Box>
        </Box>
      </Container>
    </QualitySectionWrapper>
  );
};

QualitySection.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  featureCol: PropTypes.object,
  title: PropTypes.object,
  description: PropTypes.object,
  button: PropTypes.object,
};

QualitySection.defaultProps = {
  // Quality section row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
  },
  // Quality section iamge row default style
  imageAreaRow: {
    flexDirection: 'row-reverse',
  },
  // Quality section col default style
  col: {
    pr: '15px',
    pl: '15px',
  },
  // Quality feature col default style
  featureCol: {
    width: [1, 1, 1 / 2],
    pr: '15px',
    pl: '15px',
  },
  // Quality section text area default style
  textArea: {
    width: [1, '100%', '100%', '70%', '64%'],
  },
  // Quality section image area default style
  imageArea: {
    width: [1, '100%', '100%', '30%', '38%'],
    flexBox: true,
    flexDirection: 'row-reverse',
  },
  // Quality section image wrapper default style
  imageWrapper: {
    boxShadow: 'none',
  },
  // Quality section title default style
  title: {
    fontSize: ['26px', '26px', '32px', '40px'],
    lineHeight: '1.5',
    fontWeight: '300',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: '20px',
  },
  // Quality section description default style
  description: {
    fontSize: '16px',
    color: '#343d48cc',
    lineHeight: '2.1',
    mb: '33px',
  },
  // feature icon default style
  iconStyle: {
    width: '54px',
    height: '54px',
    borderRadius: '50%',
    bg: '#93d26e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: '#ffffff',
    overflow: 'hidden',
    mt: '6px',
    mr: '22px',
    flexShrink: 0,
  },
  // feature title default style
  featureTitle: {
    fontSize: ['18px', '20px'],
    fontWeight: '400',
    color: '#0f2137',
    lineHeight: '1.5',
    mb: '8px',
    letterSpacing: '-0.020em',
  },
  // feature description default style
  featureDescription: {
    fontSize: '15px',
    lineHeight: '1.84',
    color: '#343d48cc',
  },
};

export default QualitySection;
