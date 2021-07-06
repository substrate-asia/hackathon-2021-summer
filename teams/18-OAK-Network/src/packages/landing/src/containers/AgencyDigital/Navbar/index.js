import React, { useState, useRef } from 'react';
import Fade from 'react-reveal/Fade';
import ScrollSpyMenu from 'common/components/ScrollSpyMenu';
import Scrollspy from 'react-scrollspy';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Icon } from 'react-icons-kit';
import { androidMenu } from 'react-icons-kit/ionicons/androidMenu';
import { androidClose } from 'react-icons-kit/ionicons/androidClose';
import Link from 'common/components/Link';
import Button from 'common/components/Button';
import Logo from 'common/components/UIElements/Logo';
import Container from 'common/components/UI/ContainerTwo';
import NavbarWrapper, {
  MenuArea,
  MobileMenu,
  NavbarRight,
} from './navbar.style';
import LogoImage from 'common/assets/image/agencyDigital/logo.png';

import { data } from 'common/data/AgencyDigital';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const scrollItems = [];

  data.navItems.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleHandleMenuClose = () => {
    setMobileMenu(false);
  };

  return (
    <NavbarWrapper className="agencyModern-navbar navbar">
      <Container>
        <Logo
          href="/agencydigital"
          logoSrc={LogoImage}
          title="Agency Digital"
          className="main-logo"
        />
        {/* end of logo */}

        <MenuArea>
          <ScrollSpyMenu
            className="menu-items menu-left"
            menuItems={data.navItems}
            offset={-84}
          />
          <NavbarRight>
            <li>
              <Link href="#">Login</Link>
            </li>
            <li>
              <Link href="#">Get Started</Link>
            </li>
          </NavbarRight>
          {/* end of main menu */}

          <Button
            className="menubar"
            icon={
              mobileMenu ? (
                <Icon
                  style={{ color: '#02073E' }}
                  className="bar"
                  size={32}
                  icon={androidClose}
                />
              ) : (
                <Fade>
                  <Icon
                    style={{ color: '#02073E' }}
                    className="close"
                    icon={androidMenu}
                    size={32}
                  />
                </Fade>
              )
            }
            color="#0F2137"
            variant="textButton"
            onClick={handleMobileMenu}
          />
        </MenuArea>
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
                  onClick={handleHandleMenuClose}
                >
                  {menu.label}
                </AnchorLink>
              </li>
            ))}
            <li>
              <Link href="#">Login</Link>
            </li>
            <li>
              <Link href="#">Get Started</Link>
            </li>
          </Scrollspy>
        </Container>
      </MobileMenu>
      {/* end of mobile menu */}
    </NavbarWrapper>
  );
};

export default Navbar;
