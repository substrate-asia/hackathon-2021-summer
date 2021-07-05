import React, { useState } from 'react';
import ScrollSpyMenu from 'common/components/ScrollSpyMenu';
import Scrollspy from 'react-scrollspy';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Icon } from 'react-icons-kit';
import { androidMenu } from 'react-icons-kit/ionicons/androidMenu';
import { androidClose } from 'react-icons-kit/ionicons/androidClose';
// import Link from 'common/components/Link';
import Button from 'common/components/Button';
import Logo from 'common/components/UIElements/Logo';
import Container from 'common/components/UI/Container';
import Header, {
  LogoContainer,
  NavbarWrapper,
  MobileMenu,
} from './navbar.style';
import logo from 'common/assets/image/saasMinimal2/logo-black.png';
import logoWhite from 'common/assets/image/saasMinimal2/logo-white.png';

import { data } from 'common/data/SaasMinimal2';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const scrollItems = [];

  data.navItems.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleMenuClose = () => {
    setMobileMenu(false);
  };

  return (
    <Header className="navbar">
      <Container>
        <LogoContainer className="logo-container">
          <Logo
            href="/saasminimal2"
            logoSrc={logoWhite}
            title="Agency Digital"
            className="logo"
          />
          <Logo
            href="/saasminimal2"
            logoSrc={logo}
            title="Agency Digital"
            className="logo-sticky"
          />
        </LogoContainer>
        {/* end of logo */}

        <NavbarWrapper>
          <ScrollSpyMenu
            className="menu-items menu-left"
            menuItems={data.navItems}
            offset={-84}
          />
          {/* end of main menu */}

          <Button
            className="menubar"
            icon={
              mobileMenu ? (
                <Icon className="bar" size={32} icon={androidClose} />
              ) : (
                <Icon className="close" icon={androidMenu} size={32} />
              )
            }
            color="#0F2137"
            variant="textButton"
            onClick={handleMobileMenu}
          />
        </NavbarWrapper>
      </Container>

      {/* start mobile menu */}
      <MobileMenu className={`mobile-menu ${mobileMenu ? 'active' : ''}`}>
        <Container>
          <Scrollspy
            className="menu"
            items={scrollItems}
            offset={-84}
            currentClassName="active"
          >
            {data.navItems.map((menu, index) => (
              <li key={`menu_key${index}`}>
                <AnchorLink
                  href={menu.path}
                  offset={menu.offset}
                  onClick={handleMenuClose}
                >
                  {menu.label}
                </AnchorLink>
              </li>
            ))}
          </Scrollspy>
        </Container>
      </MobileMenu>
      {/* end of mobile menu */}
    </Header>
  );
};

export default Navbar;
