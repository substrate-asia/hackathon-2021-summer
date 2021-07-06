import React, { Fragment } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/theme/agencyModern';
import { ResetCSS } from 'common/assets/css/style';
import {
  GlobalStyle,
  ContentWrapper,
} from 'containers/AgencyModern/agencyModern.style';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import Navbar from 'containers/AgencyModern/Navbar';
import Banner from 'containers/AgencyModern/Banner';
import Services from 'containers/AgencyModern/Services';
import Features from 'containers/AgencyModern/Features';
import WorkHard from 'containers/AgencyModern/WorkHard';
import UltimateFeature from 'containers/AgencyModern/UltimateFeature';
import Customer from 'containers/AgencyModern/Customer';
import News from 'containers/AgencyModern/News';
import Subscribe from 'containers/AgencyModern/Subscribe';
import Footer from 'containers/AgencyModern/Footer';

const AgencyModern = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Agency Modern | A react next landing page</title>
          <meta name="theme-color" content="#FF825C" />
          <meta name="Description" content="React next landing page" />

          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css?family=B612:400,400i,700,700i|DM+Sans:400,400i,500,500i,700,700i&display=swap"
            rel="stylesheet"
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
          <Services />
          <Features />
          <WorkHard />
          <UltimateFeature />
          <Customer />
          <News />
          <Subscribe />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
export default AgencyModern;
