import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { openModal, closeModal } from '@redq/reuse-modal';
import cloudbase from '@cloudbase/js-sdk';
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
import actions from '../redux/actions';



const SimpleModal = ({addresses, onClick}) => {
  console.log('SimpleModal, addresses: ', addresses);
  const addressList = _.map(addresses, (address) => {
    return (
      <div style={{ height: 20, borderWidth: 1,  borderColor: 'blue', borderStyle: 'solid', marginTop: 5, marginLeft: 5, marginRight: 5, padding: 5 }} key={address} onClick={() => {
        closeModal();
        onClick(address);
      }}>
        <span>{address}</span>
      </div>
    );
  });
  return (
    <div style={{ overflow: 'scroll' }}>
      <div style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10, marginLeft: 5 }}>Select a wallet address:</div>
      <div>{addressList}</div>
    </div>
  );
}

const AppModern = ({ setAccount }) => {
  
  useEffect(async () => {
    const app = cloudbase.init({
      env: 'quadratic-funding-1edc914e16f235',
      region: 'ap-guangzhou'
    });
    const auth = app.auth();
    await auth.anonymousAuthProvider().signIn();

    const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
    const allInjected = await web3Enable('my cool dapp');
    const allAccounts = await web3Accounts();

    const addresses = _.map(allAccounts, (account) => {
      return account.address;
    });

    openModal({
      config: {
        className: 'customModal',
        disableDragging: false,
        enableResizing: {
          bottom: true,
          bottomLeft: true,
          bottomRight: true,
          left: true,
          right: true,
          top: true,
          topLeft: true,
          topRight: true,
        },
        width: 480,
        animationFrom: { transform: 'scale(0.3)' }, // react-spring <Spring from={}> props value
        animationTo: { transform: 'scale(1)' }, //  react-spring <Spring to={}> props value
        transition: {
          mass: 1,
          tension: 130,
          friction: 26,
        }, // react-spring config props
      },
      withRnd: false,
      overlayClassName: 'customeOverlayClass',
      closeOnClickOutside: false,
      component: SimpleModal,
      componentProps: { addresses, onClick: (address) => {
        setAccount(address);
      } },
    });
  }, []);

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
              <Navbar isLight={true}/>
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	setAccount: (account) => dispatch(actions.setAccount(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppModern);
