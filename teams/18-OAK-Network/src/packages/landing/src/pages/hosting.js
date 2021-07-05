import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Sticky from 'react-stickynode';
import { hostingTheme } from 'common/theme/hosting';
import { GlobalStyle, ContentWrapper } from 'containers/Hosting/hosting.style';
import { ResetCSS } from 'common/assets/css/style';
import Navbar from 'containers/Hosting/Navbar';
import FeatureSection from 'containers/Hosting/Features';
import InfoSection from 'containers/Hosting/Info';
import DomainSection from 'containers/Hosting/Domain';
import PaymentSection from 'containers/Hosting/Payment';
import GuaranteeSection from 'containers/Hosting/Guarantee';
import ServicesSection from 'containers/Hosting/Services';
import BannerSection from 'containers/Hosting/Banner';
import PricingSection from 'containers/Hosting/Pricing';
import TestimonialSection from 'containers/Hosting/Testimonials';
import ContactSection from 'containers/Hosting/Contact';
import Footer from 'containers/Hosting/Footer';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import { ParallaxProvider } from 'react-scroll-parallax';
import FaqSection from 'containers/Hosting/Faq';

const Hosting = () => {
  return (
    <ThemeProvider theme={hostingTheme}>
      <ParallaxProvider>
        <Head>
          <title>Hosting | A react next landing page</title>
          <meta name="Description" content="React next landing page" />
          <meta name="theme-color" content="#eb4d4b" />
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
          <FeatureSection />
          <InfoSection />
          <PricingSection />
          <DomainSection />
          <ServicesSection />
          <PaymentSection />
          <TestimonialSection />
          <GuaranteeSection />
          <FaqSection />
          <ContactSection />
          <Footer />
        </ContentWrapper>
      </ParallaxProvider>
    </ThemeProvider>
  );
};
export default Hosting;
