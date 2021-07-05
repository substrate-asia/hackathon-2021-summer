import React from 'react';
import PropTypes from 'prop-types';
import Tabs, { TabPane } from 'rc-tabs';
// import TabContent from 'rc-tabs/lib/TabContent';
// import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import 'rc-tabs/assets/index.css';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Container from 'common/components/UI/Container';

import SectionWrapper from './walletDashboard.style';
import { WalletDashboardData } from 'common/data/AppMinimal';

const WalletDashboard = ({ secTitleWrapper, secText, secHeading }) => {
  return (
    <SectionWrapper id="dashboard_section">
      <Container>
        <Box {...secTitleWrapper}>
          <Heading {...secHeading} content="How Wallet Dashboard Works" />
          <Text
            {...secText}
            content="Build an incredible workplace and grow your business with Gusto"
          />
        </Box>
        <Tabs
          // renderTabBar={() => <ScrollableInkTabBar />}
          // renderTabContent={() => <TabContent animated={false} />}
          className="update-screen-tab"
        >
          {WalletDashboardData.map(({ step, title, image }, index) => (
            <TabPane
              tab={
                <>
                  <Heading as="h3" content={step} />
                  {title}
                </>
              }
              key={index + 1}
            >
              <Image src={image} alt={`screenshot-${index + 1}`} />
            </TabPane>
          ))}
        </Tabs>
      </Container>
    </SectionWrapper>
  );
};

WalletDashboard.propTypes = {
  secTitleWrapper: PropTypes.object,
  secText: PropTypes.object,
  secHeading: PropTypes.object,
};

WalletDashboard.defaultProps = {
  secTitleWrapper: {
    mb: ['60px', '80px'],
  },
  secText: {
    as: 'span',
    display: 'block',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: '400',
    color: '#0F2137',
  },
  secHeading: {
    textAlign: 'center',
    fontSize: ['20px', '24px', '24px', '28px'],
    fontWeight: '500',
    color: '#0F2137',
    letterSpacing: '-0.5px',
    mb: '0',
    ml: 'auto',
    mr: 'auto',
    lineHeight: '1.12',
    maxWidth: '100%',
    mb: '15px',
  },
};

export default WalletDashboard;
