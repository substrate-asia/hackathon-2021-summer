import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Image from 'common/components/Image';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';
import FeatureBlock from 'common/components/FeatureBlock';
import Container from 'common/components/UI/Container';
import Particles from '../Particle';
import BannerWrapper, {
  DiscountLabel,
  BannerObject,
} from './bannerSection.style';

import BannerObject1 from 'common/assets/image/saas/banner/bannerObject1.png';
import BannerObject2 from 'common/assets/image/saas/banner/bannerObject2.png';

const BannerSection = ({
  row,
  col,
  title,
  btnStyle,
  description,
  discountText,
  discountAmount,
  outlineBtnStyle,
}) => {
  const ButtonGroup = () => (
    <Fragment>
      <Button title="FREE TRAIL" {...btnStyle} />
      <Button
        className="outlined"
        title="EXPLORE MORE"
        variant="outlined"
        {...outlineBtnStyle}
      />
    </Fragment>
  );
  return (
    <BannerWrapper id="banner_section">
      <Particles />
      <Container>
        <Box className="row" {...row}>
          <Box className="col" {...col}>
            <DiscountLabel>
              <Text content="25% Discount" {...discountAmount} />
              <Text content="on every first project " {...discountText} />
            </DiscountLabel>
            <FeatureBlock
              title={
                <Heading
                  content="Ultimate Platform
                    to monitor your best
                    workflow."
                  {...title}
                />
              }
              description={
                <Text
                  content="We help to create SaaS product that are innovative, differentiated with a superb User Experience, fully accessible through mobile devices. SaaS products are changing the world ."
                  {...description}
                />
              }
              button={<ButtonGroup />}
            />
          </Box>
        </Box>
      </Container>
      <BannerObject>
        <div className="objectWrapper">
          <Image src={BannerObject1} alt="BannerObject1" />
          <div className="dashboardWrapper">
            <Image src={BannerObject2} alt="BannerObject2" />
          </div>
        </div>
      </BannerObject>
    </BannerWrapper>
  );
};

BannerSection.propTypes = {
  title: PropTypes.object,
  btnStyle: PropTypes.object,
  description: PropTypes.object,
  contentStyle: PropTypes.object,
  discountText: PropTypes.object,
  discountAmount: PropTypes.object,
  outlineBtnStyle: PropTypes.object,
};

BannerSection.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
    alignItems: 'center',
  },
  col: {
    pr: '15px',
    pl: '15px',
    width: [1, '70%', '50%', '45%'],
  },
  title: {
    fontSize: ['22px', '34px', '30px', '55px'],
    fontWeight: '700',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: ['20px', '25px'],
    lineHeight: '1.5',
  },
  description: {
    fontSize: '16px',
    color: '#343d48cc',
    lineHeight: '1.75',
    mb: '0',
  },
  btnStyle: {
    minWidth: ['120px', '120px', '120px', '156px'],
    fontSize: ['13px', '14px'],
    fontWeight: '500',
    colors: 'primaryWithBg',
  },
  outlineBtnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#5167db',
    ml: '18px',
  },
  discountAmount: {
    fontSize: '14px',
    color: '#eb4d4b',
    mb: 0,
    as: 'span',
    mr: '0.4em',
    fontWeight: 700,
  },
  discountText: {
    fontSize: ['13px', '14px'],
    color: '#0f2137',
    mb: 0,
    as: 'span',
    fontWeight: 500,
  },
};

export default BannerSection;
