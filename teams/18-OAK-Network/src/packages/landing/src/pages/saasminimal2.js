import React, { Fragment } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/theme/saasMinimal2';
import { ResetCSS } from 'common/assets/css/style';
import {
  GlobalStyle,
  ContentWrapper,
} from 'containers/SaasMinimal2/saasMinimal2.style';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import Navbar from 'containers/SaasMinimal2/Navbar';
import Banner from 'containers/SaasMinimal2/Banner';
import Features from 'containers/SaasMinimal2/Features';
import TrackAudience from 'containers/SaasMinimal2/TrackAudience';
import Pricing from 'containers/SaasMinimal2/Pricing';
import Clients from 'containers/SaasMinimal2/Clients';
import Statistics from 'containers/SaasMinimal2/Statistics';
import AdvancedAnalytics from 'containers/SaasMinimal2/AdvancedAnalytics';
import Dashboard from 'containers/SaasMinimal2/Dashboard';
import Testimonial from 'containers/SaasMinimal2/Testimonial';
import Subscription from 'containers/SaasMinimal2/Subscription';
import Footer from 'containers/SaasMinimal2/Footer';

const SaasMinimal = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>SaaS Minimal 2 | A react next landing page</title>
          <meta name="theme-color" content="#0C233C" />
          <meta name="Description" content="React next landing page" />

          {/* Load google fonts */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Work+Sans:ital,wght@0,700;1,700&display=swap"
          />
        </Head>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <Sticky top={0} innerZ={100} activeClass="is-sticky">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <Banner />
          <Features />
          <TrackAudience />
          <Pricing />
          <Clients />
          <Statistics />
          <AdvancedAnalytics />
          <Dashboard />
          <Testimonial />
          <Subscription />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
export default SaasMinimal;
