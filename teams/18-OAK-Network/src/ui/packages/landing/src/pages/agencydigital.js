import React, { Fragment } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/theme/agencyDigital';
import { ResetCSS } from 'common/assets/css/style';
import {
  GlobalStyle,
  ContentWrapper,
} from 'containers/AgencyDigital/agencyDigital.style';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import Navbar from 'containers/AgencyDigital/Navbar';
import Banner from 'containers/AgencyDigital/Banner';
import Service from 'containers/AgencyDigital/Service';
import CustomerSupport from 'containers/AgencyDigital/CustomerSupport';
import Pricing from 'containers/AgencyDigital/Pricing';
import Support from 'containers/AgencyDigital/Support';
import OurCustomer from 'containers/AgencyDigital/OurCustomer';
import News from 'containers/AgencyDigital/News';
import Footer from 'containers/AgencyDigital/Footer';

const AgencyDigital = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Agency Digital | A react next landing page</title>
          <meta name="theme-color" content="#FF825C" />
          <meta name="Description" content="React next landing page" />

          {/* Load google fonts */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Arvo:400,400i,700,700i|DM+Sans:400,400i,500,500i,700,700i&display=swap"
          />
        </Head>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <Banner />
          <Service />
          <CustomerSupport />
          <Pricing />
          <Support />
          <OurCustomer />
          <News />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
export default AgencyDigital;
