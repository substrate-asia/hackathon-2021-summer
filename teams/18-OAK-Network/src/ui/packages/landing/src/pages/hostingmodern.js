import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Sticky from 'react-stickynode';
import { theme } from 'common/theme/hostingModern';
import {
  GlobalStyle,
  ContentWrapper,
} from 'containers/HostingModern/hostingModern.style';
import { ResetCSS } from 'common/assets/css/style';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import TopBar from 'containers/HostingModern/TopBar';
import Navbar from 'containers/HostingModern/Navbar';
import Banner from 'containers/HostingModern/Banner';
import Service from 'containers/HostingModern/Service';
import Feature from 'containers/HostingModern/Feature';
import UltimateFeature from 'containers/HostingModern/UltimateFeature';
import CustomerSupport from 'containers/HostingModern/CustomerSupport';
import Pricing from 'containers/HostingModern/Pricing';
import Testimonials from 'containers/HostingModern/Testimonials';
import NewsFeed from 'containers/HostingModern/NewsFeed';
import Faq from 'containers/HostingModern/Faq';
import CallToAction from 'containers/HostingModern/CallToAction';
import Footer from 'containers/HostingModern/Footer';

const HostingModern = () => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Hosting Modern | A react next landing page</title>
        <meta name="Description" content="React next landing page" />
        <meta name="theme-color" content="#362C8B" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Bree+Serif|DM+Sans:400,400i,500,500i,700,700i&display=swap"
        />
      </Head>

      <ResetCSS />
      <GlobalStyle />

      <ContentWrapper>
        <TopBar />
        <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
          <DrawerProvider>
            <Navbar />
          </DrawerProvider>
        </Sticky>
        <Banner />
        <Service />
        <Feature />
        <UltimateFeature />
        <CustomerSupport />
        <Pricing />
        <Testimonials />
        <NewsFeed />
        <Faq />
        <CallToAction />
        <Footer />
      </ContentWrapper>
    </ThemeProvider>
  );
};
export default HostingModern;
