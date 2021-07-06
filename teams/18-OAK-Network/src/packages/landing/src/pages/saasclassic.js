import React, { Fragment } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Sticky from 'react-stickynode';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import { saasClassicTheme } from 'common/theme/saasClassic';
import { ResetCSS } from 'common/assets/css/style';
import {
  GlobalStyle,
  ContentWrapper,
} from 'containers/SaasClassic/saasClassic.style';

import BannerSection from 'containers/SaasClassic/Banner';
import Navbar from 'containers/SaasClassic/Navbar';
import ServiceSection from 'containers/SaasClassic/Service';
import PricingSection from 'containers/SaasClassic/Pricing';
import PartnerSection from 'containers/SaasClassic/Partner';
import TrialSection from 'containers/SaasClassic/Trial';
import FeatureSection from 'containers/SaasClassic/Feature';
import UpdateScreen from 'containers/SaasClassic/UpdateScreen';
import TestimonialSection from 'containers/SaasClassic/Testimonial';
import Newsletter from 'containers/SaasClassic/Newsletter';
import Footer from 'containers/SaasClassic/Footer';

const SaasClassic = () => {
  return (
    <ThemeProvider theme={saasClassicTheme}>
      <Fragment>
        <Head>
          <title>SaaS | A react next landing page</title>
          <meta name="Description" content="React next landing page" />
          <meta name="theme-color" content="#ec5555" />
          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,500i,700,900|Open+Sans:400,400i,600,700"
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
          <ServiceSection />
          <UpdateScreen />
          <FeatureSection />
          <PartnerSection />
          <PricingSection />
          <TestimonialSection />
          <TrialSection />
          <Newsletter />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
export default SaasClassic;
