import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/theme/appclassic';
import { ResetCSS } from 'common/assets/css/style';
import Sticky from 'react-stickynode';
import Navbar from 'containers/AppClassic/Navbar';
import Banner from 'containers/AppClassic/Banner';
import Customer from 'containers/AppClassic/Customer';
import KeyFeatures from 'containers/AppClassic/KeyFeatures';
import AppSlider from 'containers/AppClassic/AppSlider';
import Features from 'containers/AppClassic/Features';
import DesignedAndBuilt from 'containers/AppClassic/DesignedAndBuilt';
import FeatureTab from 'containers/AppClassic/FeatureTab';
import PricingPolicy from 'containers/AppClassic/PricingPolicy';
import Testimonial from 'containers/AppClassic/Testimonial';
import Faq from 'containers/AppClassic/Faq';
import JoinTrail from 'containers/AppClassic/JoinTrail';
import Footer from 'containers/AppClassic/Footer';
import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from 'containers/AppClassic/appClassic.style';

const AppClassic = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Head>
          <title>App classic | A next js landing page</title>
          <meta name="Description" content="React next landing page" />
          <meta name="theme-color" content="#2563FF" />
          <meta
            name="keywords"
            content="React, React js, Next, Next js, Super fast next js landing, Modren landing, Next js landing"
          />
        </Head>
        {/* end of head */}

        <ResetCSS />
        <GlobalStyle />
        {/* end of global and reset style */}

        {/* start app classic landing */}
        <AppWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-active">
            <Navbar />
          </Sticky>
          <ContentWrapper>
            <Banner />
            <Customer />
            <KeyFeatures />
            <AppSlider />
            <Features />
            <DesignedAndBuilt />
            <FeatureTab />
            <PricingPolicy />
            <Testimonial />
            <Faq />
            <JoinTrail />
          </ContentWrapper>
          <Footer />
        </AppWrapper>
        {/* end of app classic landing */}
      </>
    </ThemeProvider>
  );
};
export default AppClassic;
