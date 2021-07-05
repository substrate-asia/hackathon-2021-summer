import React, { useState } from 'react';
import Link from 'next/link';
import Fade from 'react-reveal/Fade';
import { Icon } from 'react-icons-kit';
import { androidMenu } from 'react-icons-kit/ionicons/androidMenu';
import { androidClose } from 'react-icons-kit/ionicons/androidClose';
import Container from 'common/components/UI/ContainerTwo';
import ScrollSpyMenu from 'common/components/ScrollSpyMenu';
import Scrollspy from 'react-scrollspy';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Image from 'common/components/Image';
import Button from 'common/components/Button';

import { MenuItems } from 'common/data/HostingModern';
import logo from 'common/assets/image/hostingModern/logo.png';
import HeaderWrapper, {
  HeaderInner,
  Logo,
  PrimaryNav,
  MobileNav,
} from './navbar.style';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleHandleMenuClose = () => {
    setMobileMenu(false);
  };

  return (
    <HeaderWrapper>
      <Container>
        <HeaderInner>
          <Logo>
            <Image src={logo} alt="Hosting Modern" />
          </Logo>
          <PrimaryNav>
            <ScrollSpyMenu
              className="primaryNav"
              menuItems={MenuItems}
              offset={-70}
            />
            <Link href="#">
              <a className="joinButton">
                <Button title="Join Community" />
              </a>
            </Link>
          </PrimaryNav>
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
        </HeaderInner>
      </Container>

      <MobileNav className={mobileMenu ? 'is-active' : ''}>
        <Scrollspy className="mobileNav" menuItems={MenuItems} offset={-70}>
          {MenuItems.map((menu, index) => (
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
        </Scrollspy>
        <Link href="#">
          <a className="joinButton">Join Community</a>
        </Link>
      </MobileNav>
    </HeaderWrapper>
  );
};

export default Navbar;
