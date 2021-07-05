import React, { Fragment } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { cryptoTheme } from 'common/theme/crypto';
import { ResetCSS } from 'common/assets/css/style';
import { GlobalStyle, ContentWrapper } from 'containers/Crypto/crypto.style';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import Navbar from 'containers/Crypto/Navbar';
import Banner from 'containers/Crypto/BannerSection';
import BannerSlider from 'containers/Crypto/BannerSlider';
import Transactions from 'containers/Crypto/Transaction';
import ControlSections from 'containers/Crypto/ControlSection';
import TrustedProofSections from 'containers/Crypto/TrustedProof';
import ScalableSections from 'containers/Crypto/ScalableSection';
import SlideSections from 'containers/Crypto/CryptoSlides';
import BetaSections from 'containers/Crypto/BetaSection';
import Footer from 'containers/Crypto/Footer';

const Crypto = () => {
  return (
    <ThemeProvider theme={cryptoTheme}>
      <Fragment>
        <Head>
          <title>Cryptocurrency | A react next landing page</title>
          <meta name="Description" content="React next landing page" />
          <meta name="theme-color" content="#ec5555" />

          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Heebo:300,400,500,700"
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
          <BannerSlider />
          <Transactions />
          <ControlSections />
          <TrustedProofSections />
          <ScalableSections />
          <SlideSections />
          <BetaSections />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
export default Crypto;
