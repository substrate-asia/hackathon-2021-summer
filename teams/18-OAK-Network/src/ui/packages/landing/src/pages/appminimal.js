import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/theme/appminimal';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import { ResetCSS } from 'common/assets/css/style';
import Sticky from 'react-stickynode';
import Navbar from 'containers/AppMinimal/Navbar';
import Banner from 'containers/AppMinimal/Banner';
import KeyFeatures from 'containers/AppMinimal/KeyFeatures';
import ChooseUs from 'containers/AppMinimal/ChooseUs';
import Features from 'containers/AppMinimal/Features';
import WalletExperience from 'containers/AppMinimal/WalletExperience';
import SecureTransaction from 'containers/AppMinimal/SecureTransaction';
import WalletDashboard from 'containers/AppMinimal/WalletDashboard';
import Track from 'containers/AppMinimal/Track';
import Gallery from 'containers/AppMinimal/Gallery';
import Counter from 'containers/AppMinimal/Counter';
import Pricing from 'containers/AppMinimal/Pricing';
import Blog from 'containers/AppMinimal/Blog';
import CallToAction from 'containers/AppMinimal/CallToAction';
import Footer from 'containers/AppMinimal/Footer';
import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
  GradientWrapper,
} from 'containers/AppMinimal/app-minimal.style';

const AppMinimal = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Head>
          <title>App Minimal | A react next landing page</title>
          <meta name="theme-color" content="#FF825C" />
          <meta name="Description" content="React next landing page" />

          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,500&family=Work+Sans:wght@100;300&display=swap"
            rel="stylesheet"
          />
        </Head>
        {/* end of head */}

        <ResetCSS />
        <GlobalStyle />
        {/* end of global and reset style */}

        {/* start app minimal landing */}
        <AppWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <ContentWrapper>
            <Banner />
            <KeyFeatures />
            <ChooseUs />
            <Features />
            <WalletExperience />
            <SecureTransaction />
            <WalletDashboard />
            <Track />
          </ContentWrapper>
          <GradientWrapper>
            <Gallery />
            <Counter />
            <Pricing />
            <Blog />
            <CallToAction />
            <Footer />
          </GradientWrapper>
        </AppWrapper>
        {/* end of app minimal landing */}
      </>
    </ThemeProvider>
  );
};
export default AppMinimal;
