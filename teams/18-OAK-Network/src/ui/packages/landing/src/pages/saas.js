import React, { Fragment } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { saasTheme } from 'common/theme/saas';
import { ResetCSS } from 'common/assets/css/style';
import { GlobalStyle, ContentWrapper } from 'containers/Saas/saas.style';
import Navbar from 'containers/Saas/Navbar';
import BannerSection from 'containers/Saas/BannerSection';
import FeatureSection from 'containers/Saas/FeatureSection';
import VisitorSection from 'containers/Saas/VisitorSection';
import ServiceSection from 'containers/Saas/ServiceSection';
import Footer from 'containers/Saas/Footer';
import PricingSection from 'containers/Saas/PricingSection';
import TrialSection from 'containers/Saas/TrialSection';
import TimelineSection from 'containers/Saas/TimelineSection';
import TestimonialSection from 'containers/Saas/TestimonialSection';
import PartnerSection from 'containers/Saas/PartnerSection';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import FaqSection from 'containers/Saas/FaqSection';

const Saas = () => {
  return (
    <ThemeProvider theme={saasTheme}>
      <Fragment>
        <Head>
          <title>Saas | A react next landing page</title>
          <meta name="Description" content="React next landing page" />
          <meta name="theme-color" content="#ec5555" />
          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
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
          <FeatureSection />
          <VisitorSection />
          <ServiceSection />
          <PricingSection />
          <TestimonialSection />
          <PartnerSection />
          <TimelineSection />
          <FaqSection />
          <TrialSection />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
export default Saas;
