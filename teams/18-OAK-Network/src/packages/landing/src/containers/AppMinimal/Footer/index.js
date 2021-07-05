import React from 'react';
import Link from 'next/link';
import Image from 'common/components/Image';
import Logo from 'common/components/UIElements/Logo';
import Container from 'common/components/UI/Container';
import FooterArea, {
  Left,
  Menu,
  CopyText,
  Social,
  SocialText,
} from './footer.style';
import { FooterData } from 'common/data/AppMinimal';

const Footer = () => {
  const { menu, logo, social } = FooterData;
  const date = new Date();
  const year = date.getFullYear();

  return (
    <FooterArea>
      <Container className="Container">
        <Left>
          <Logo
            className="logo"
            href="/appminimal"
            logoSrc={logo}
            title="App Classic"
          />
          <CopyText>
            Copyright © {year}
            <Link href="/">
              <a>RedQ, Inc.</a>
            </Link>
          </CopyText>
        </Left>
        <Menu>
          {menu.map(({ link, label }, index) => (
            <Link href={link} key={`footer-link-key-${index}`}>
              <a>{label}</a>
            </Link>
          ))}
        </Menu>
        <Social>
          <SocialText>Social:</SocialText>
          {social.map(({ link, icon }, index) => (
            <Link href={link} key={`footer-social-key-${index}`}>
              <a>
                <Image src={icon} alt="social image" />
              </a>
            </Link>
          ))}
        </Social>
      </Container>
    </FooterArea>
  );
};

export default Footer;
