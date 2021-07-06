import React, { Fragment } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { rideTheme } from 'common/theme/ride';
import { ResetCSS } from 'common/assets/css/style';
import { GlobalStyle, ContentWrapper } from 'containers/Ride/ride.style';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import Navbar from 'containers/Ride/Navbar';
import Banner from 'containers/Ride/Banner';
import RideOption from 'containers/Ride/RideOption';
import LocationSection from 'containers/Ride/LocationSelection';
import FeatureSection from 'containers/Ride/Feature';
import LatestNewsSection from 'containers/Ride/LatestNews';
import HowItWorkSection from 'containers/Ride/HowItWorks';
import TestimonialSection from 'containers/Ride/TestimonialSection';
import FeatureSlider from 'containers/Ride/FeatureSlider';
import Footer from 'containers/Ride/Footer';

const Ride = () => {
  return (
    <ThemeProvider theme={rideTheme}>
      <Fragment>
        <Head>
          <title>Ride Sharing | A react next landing page</title>
          <meta name="theme-color" content="#ec5555" />
          <meta name="Description" content="React next landing page" />

          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Lato:300,400,700"
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
          <RideOption />
          <LocationSection />
          <FeatureSlider />
          <FeatureSection />
          <LatestNewsSection />
          <HowItWorkSection />
          <TestimonialSection />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
export default Ride;
