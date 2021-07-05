import React, { Fragment } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/theme/appCreative';
import { ResetCSS } from 'common/assets/css/style';
import Sticky from 'react-stickynode';
import Navbar from 'containers/AppCreative/Navbar';
import Banner from 'containers/AppCreative/Banner';
import KeyFeatures from 'containers/AppCreative/KeyFeatures';
import Experiences from 'containers/AppCreative/Experience';
import ChooseUs from 'containers/AppCreative/ChooseUs';
import Pricing from 'containers/AppCreative/Pricing';
import Testimonials from 'containers/AppCreative/Testimonials';
import AvailableStore from 'containers/AppCreative/AvailableStore';
import Faqs from 'containers/AppCreative/Faq';
import CallToAction from 'containers/AppCreative/CallToAction';
import FeatureSlider from 'containers/AppCreative/FeatureSlider';
import Footer from 'containers/AppCreative/Footer';
import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from 'containers/AppCreative/appCreative.style';

export default function () {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>App Creative | A next js landing page</title>
          <meta name="Description" content="React next landing page" />
          <meta name="theme-color" content="#6C247E" />
          <meta
            name="keywords"
            content="React, React js, Next, Next js, Super fast next js landing, Creative landing, Next js landing"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans"
            rel="stylesheet"
          ></link>
        </Head>
        {/* end of head */}

        <ResetCSS />
        <GlobalStyle />
        {/* end of global and reset style */}

        {/* start app creative landing */}
        <AppWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-active">
            <Navbar />
          </Sticky>
          <ContentWrapper>
            <Banner />
            <KeyFeatures />
            <ChooseUs />
            <Experiences />
            <FeatureSlider />
            <Pricing />
            <Testimonials />
            <AvailableStore />
            <Faqs />
            <CallToAction />
          </ContentWrapper>
          <Footer />
        </AppWrapper>
        {/* end of app creative landing */}
      </Fragment>
    </ThemeProvider>
  );
}
