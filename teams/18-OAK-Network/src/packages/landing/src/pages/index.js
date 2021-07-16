import React from 'react';
import _ from 'lodash';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/theme/appModern';
import 'antd/dist/antd.css';
import { ResetCSS } from 'common/assets/css/style';
import Sticky from 'react-stickynode';
import Navbar from 'containers/AppModern/Navbar';
import Banner from 'containers/AppModern/Banner';
import NewsletterSection from 'containers/Agency/NewsletterSection';
import Footer from 'containers/AppModern/Footer';
import ProjectSection from 'containers/Agency/ProjectSection';
import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from 'containers/AppModern/appModern.style';
import PolkadotProvider from 'common/contexts/PolkadotContext';

const AppModern = () => {
  return (
    <ThemeProvider theme={theme}>
      <PolkadotProvider>
        <>
          <Head>
            <title>Quadratic Funding Program</title>
            <meta name="Description" content="React next landing page" />
            <meta name="theme-color" content="#2563FF" />
            <meta
              name="keywords"
              content="React, React js, Next, Next js, Super fast next js landing, Modren landing, Next js landing"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Heebo:300,400,500,700&display=swap"
              rel="stylesheet"
            />
          </Head>
          {/* end of head */}

          <ResetCSS />
          <GlobalStyle />
          {/* end of global and reset style */}

          {/* start app classic landing */}
          <AppWrapper>
            <Sticky top={0} innerZ={9999} activeClass="sticky-active">
              <Navbar isLight={true} />
            </Sticky>
            <ContentWrapper>
              <Banner />
              <NewsletterSection />
              <ProjectSection />
            </ContentWrapper>
            <Footer />
          </AppWrapper>
          {/* end of app classic landing */}
        </>
      </PolkadotProvider>
    </ThemeProvider>
  );
};

export default AppModern;
