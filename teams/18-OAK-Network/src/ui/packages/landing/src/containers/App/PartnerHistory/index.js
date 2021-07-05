import React from 'react';
import PropTypes from 'prop-types';
import Box from 'common/components/Box';
import Card from 'common/components/Card';
import Image from 'common/components/Image';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';
import FeatureBlock from 'common/components/FeatureBlock';
import Container from 'common/components/UI/Container';
import PartnerHistoryWrapper, { CounterUpArea } from './partnerHistory.style';
import GoogleImg from 'common/assets/image/app/google.svg';
import AppleImg from 'common/assets/image/app/apple.svg';
import DribbleImg from 'common/assets/image/app/dribbble.svg';
import MailchimpImg from 'common/assets/image/app/mailchimp.svg';
import BackgroundImg from 'common/assets/image/app/partner-bg.png';

const PartnerHistory = ({
  row,
  col,
  cardStyle,
  title,
  description,
  btnStyle,
  sectionSubTitle,
  cardArea,
}) => {
  return (
    <PartnerHistoryWrapper id="partners">
      <Image
        src={BackgroundImg}
        className="backgroungImg"
        alt="backgroungImg"
      />
      <Container>
        <Box className="row" {...row}>
          <Box className="col" {...col} style={{ flexDirection: 'column' }}>
            <Text {...sectionSubTitle} />
            <FeatureBlock
              title={<Heading {...title} />}
              description={<Text {...description} />}
              button={<Button title="WORK HISTORY" {...btnStyle} />}
            />
          </Box>
          <Box className="col" {...col} {...cardArea}>
            <CounterUpArea>
              <Card className="card" {...cardStyle}>
                <Image src={GoogleImg} alt="Google Inc" />
                <Text content="Google Inc" />
              </Card>
              <Card className="card" {...cardStyle}>
                <Image src={AppleImg} alt="Apple Inc" />
                <Text content="Apple" />
              </Card>
              <Card className="card" {...cardStyle}>
                <Image src={DribbleImg} alt="Dribble Inc" />
                <Text content="Dribble" />
              </Card>
              <Card className="card" {...cardStyle}>
                <Image src={MailchimpImg} alt="MailChimp Inc" />
                <Text content="MailChimp" />
              </Card>
            </CounterUpArea>
          </Box>
        </Box>
      </Container>
    </PartnerHistoryWrapper>
  );
};

// Partner style props
PartnerHistory.propTypes = {
  sectionHeader: PropTypes.object,
  sectionTitle: PropTypes.object,
  sectionSubTitle: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  cardStyle: PropTypes.object,
};

// Partner default style
PartnerHistory.defaultProps = {
  // Partner section row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
  },
  // Partner section col default style
  col: {
    pr: '15px',
    pl: '15px',
    width: [1, 1 / 2, 1 / 2, 1 / 2, 1 / 2],
    flexBox: true,
    alignSelf: 'center',
  },
  // Card default style
  cardStyle: {
    p: '53px 40px 35px',
    borderRadius: '10px',
    boxShadow: '0px 8px 20px 0px rgba(16, 66, 97, 0.07)',
  },
  // Partner section title default style
  title: {
    content: 'Your Trusted Partner For Working Together',
    fontSize: ['24px', '26px', '30px', '36px', '48px'],
    fontWeight: '300',
    color: '#0f2137',
    letterSpacing: '-0.010em',
    mb: '20px',
    maxWidth: ['100%', '100%', '100%', '490px', '490px'],
    textAlign: ['center', 'left'],
  },
  // Partner section description default style
  description: {
    content:
      'You can trust us for any kind of services and some of the world class companies have also trusted us .',
    fontSize: '16px',
    color: '#343d48cc',
    lineHeight: '2.1',
    mb: '33px',
    textAlign: ['center', 'left'],
  },
  sectionSubTitle: {
    content: 'TRUSTED PARTNERS',
    as: 'span',
    textAlign: 'left',
    fontSize: '14px',
    letterSpacing: '0.13em',
    fontWeight: '700',
    color: '#1a73e8',
    mb: '10px',
    textAlign: ['center', 'left'],
  },
  // Button default style
  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
  },
  cardArea: {
    pl: [0, 0, '40px', 0, 0],
  },
};

export default PartnerHistory;
