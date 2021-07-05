import React, { Fragment } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Sticky from 'react-stickynode';
import { sassMinimalTheme } from 'common/theme/sassMinimal';
import { ResetCSS } from 'common/assets/css/style';
import {
  GlobalStyle,
  ContentWrapper,
} from 'containers/SassMinimal/sassMinimal.style';

import BannerSection from 'containers/SassMinimal/BannerSection';
import Navbar from 'containers/SassMinimal/Navbar';
import Company from 'containers/SassMinimal/Company';
import FeatureSection from 'containers/SassMinimal/FeatureSection';
import CustomerTracking from 'containers/SassMinimal/CustomerTracking';
import ServiceSection from 'containers/SassMinimal/ServiceSection';
import FeatureTwoSection from 'containers/SassMinimal/FeatureTwoSection';
import TwitterSection from 'containers/SassMinimal/TwitterSection';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import Pricing from 'containers/SassMinimal/Pricing';
import FaqSection from 'containers/SassMinimal/Faq';
import ContactUs from 'containers/SassMinimal/ContactUs';
import Footer from 'containers/SassMinimal/Footer';

const SaasMinimal = () => {
  return (
    <ThemeProvider theme={sassMinimalTheme}>
      <Fragment>
        <Head>
          <title>SaaSMinimal | A react next landing page</title>
          <meta name="Description" content="React next landing page" />
          <meta name="theme-color" content="#ec5555" />
          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700"
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
          <BannerSection />
          <Company />
          <FeatureSection />
          <CustomerTracking />
          <ServiceSection />
          <FeatureTwoSection />
          <TwitterSection />
          <Pricing />
          <FaqSection />
          <ContactUs />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export default SaasMinimal;
