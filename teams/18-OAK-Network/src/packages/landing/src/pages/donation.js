import React, { Fragment } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/theme/donation';
import { ResetCSS } from 'common/assets/css/style';
import {
  GlobalStyle,
  ContentWrapper,
  CovidMap,
} from 'containers/Donation/donation.style';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import Navbar from 'containers/Donation/Navbar';
import Banner from 'containers/Donation/Banner';
import Service from 'containers/Donation/Service';
import DonationFormSection from 'containers/Donation/DonationForm';
import Covid19Map from 'containers/Donation/Covid19Map';
import DonationGoal from 'containers/Donation/DonationGoal';
import DoctorsSuggestions from 'containers/Donation/DoctorsSuggestions';
import ThankYou from 'containers/Donation/ThankYou';
import Footer from 'containers/Donation/Footer';

const Donation = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Donation | A react next landing page</title>
          <meta name="theme-color" content="#FF825C" />
          <meta name="Description" content="React next landing page" />

          {/* Load google fonts */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=DM+Sans:400,400i,500,500i,700,700i&display=swap"
          />
        </Head>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <Sticky top={0} innerZ={99} activeClass="is-sticky">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <Banner />
          <Service />
          <CovidMap>
            <DonationFormSection />
            <Covid19Map />
          </CovidMap>
          <DoctorsSuggestions />
          <DonationGoal />
          <ThankYou />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
export default Donation;
