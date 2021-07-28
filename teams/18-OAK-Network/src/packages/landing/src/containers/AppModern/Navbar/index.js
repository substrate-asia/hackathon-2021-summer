import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { openModal } from '@redq/reuse-modal';
import Fade from 'react-reveal/Fade';
import Scrollspy from 'react-scrollspy';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Icon } from 'react-icons-kit';
import { menu } from 'react-icons-kit/feather/menu';
import { x } from 'react-icons-kit/feather/x';
import Logo from 'common/components/UIElements/Logo';
import Button from 'common/components/Button';
import Container from 'common/components/UI/Container';
import useOnClickOutside from 'common/hooks/useOnClickOutside';
import AccountSelectionModal from 'common/components/AccountSelectionModal';
import { navbar } from 'common/data/AppModern';
import actions from 'redux/actions';
import NavbarWrapper, { MenuArea, MobileMenu } from './navbar.style';

const truncateMiddle = require('truncate-middle');

const Navbar = ({ isLight, account, setAccount }) => {
  const { navMenu } = navbar;
  const [state, setState] = useState({
    search: '',
    searchToggle: false,
    mobileMenu: false,
  });

  const searchRef = useRef(null);
  useOnClickOutside(searchRef, () =>
    setState({ ...state, searchToggle: false })
  );

  useEffect(() => {
    if (!account) {
      showAccountSelectionModal();
    }
  }, []);

  const toggleHandler = (type) => {
    if (type === 'search') {
      setState({
        ...state,
        search: '',
        searchToggle: !state.searchToggle,
        mobileMenu: false,
      });
    }

    if (type === 'menu') {
      setState({
        ...state,
        mobileMenu: !state.mobileMenu,
      });
    }
  };

  const scrollItems = [];

  navMenu.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });

  const handleRemoveMenu = () => {
    setState({
      ...state,
      mobileMenu: false,
    });
  };

  const showAccountSelectionModal = async () => {
    const { web3Enable, web3Accounts } = await import(
      '@polkadot/extension-dapp'
    );
    await web3Enable('quadratic-funding-webapp');
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
        width: 750,
        height: 'auto',
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
      component: AccountSelectionModal,
      componentProps: {
        addresses,
        onClick: (address) => {
          setAccount(address);
        },
      },
    });
  };

  const openOutterLink = (url) => {
    window.open(url);
  };

  return (
    <NavbarWrapper className="navbar">
      <Container>
        <Logo
          href="/"
          logoSrc={
            isLight
              ? 'https://res.cloudinary.com/forgelab-io/image/upload/v1619317508/OAK/oak-logo.png'
              : 'https://res.cloudinary.com/forgelab-io/image/upload/v1618793068/OAK/logo-horizontal.png'
          }
          title="App Modern"
          className="main-logo"
        />
        <Logo
          href="/"
          logoSrc="https://res.cloudinary.com/forgelab-io/image/upload/v1618793068/OAK/logo-horizontal.png"
          title="App Modern"
          className="logo-alt"
        />
        {/* end of logo */}

        <MenuArea className={state.searchToggle ? 'active' : ''}>
          {/* <ScrollSpyMenu className="menu" menuItems={navMenu} offset={-84} /> */}
          <Button
            style={{ marginLeft: 20 }}
            title="Tutorial"
            onClick={() => openOutterLink('https://docs.oak.tech/')}
          />
          <Button
            style={{ marginLeft: 20 }}
            title="Github"
            onClick={() =>
              openOutterLink(
                'https://github.com/OAK-Foundation/quadratic-funding-webapp'
              )
            }
          />
          <Button
            style={{ marginLeft: 20 }}
            title="Create a Grant"
            onClick={() =>
              openOutterLink('https://8mu1f1dexqf.typeform.com/to/FF8ARJhs')
            }
          />
          {
            <Button
              style={{ marginLeft: 20 }}
              title={
                account
                  ? truncateMiddle(account, 4, 4, '...')
                  : 'Connect a Wallet'
              }
              onClick={showAccountSelectionModal}
            />
          }
          {/* end of main menu */}

          <Button
            className="menubar"
            icon={
              state.mobileMenu ? (
                <Icon className="bar" icon={x} />
              ) : (
                <Fade>
                  <Icon className="close" icon={menu} />
                </Fade>
              )
            }
            color="#0F2137"
            variant="textButton"
            onClick={() => toggleHandler('menu')}
          />
        </MenuArea>
      </Container>

      {/* start mobile menu */}
      <MobileMenu className={`mobile-menu ${state.mobileMenu ? 'active' : ''}`}>
        <Container>
          <Scrollspy
            className="menu"
            items={scrollItems}
            offset={-84}
            currentClassName="active"
          >
            {navMenu.map((menu, index) => (
              <li key={`menu_key${index}`}>
                <AnchorLink
                  href={menu.path}
                  offset={menu.offset}
                  onClick={handleRemoveMenu}
                >
                  {menu.label}
                </AnchorLink>
              </li>
            ))}
          </Scrollspy>
          {/* <Button title="Try for Free" /> */}
        </Container>
      </MobileMenu>
      {/* end of mobile menu */}
    </NavbarWrapper>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
});

const mapDispatchToProps = (dispatch) => ({
  setAccount: (account) => dispatch(actions.setAccount(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
