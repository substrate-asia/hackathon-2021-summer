import React from 'react';
import Link from 'next/link';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Image from 'common/components/Image';
import Logo from 'common/components/UIElements/Logo';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import FooterArea, {
  WidgetArea,
  MenuArea,
  Menu,
  MenuItem,
  CopyrightText,
} from './footer.style';

import { footer } from 'common/data/AppModern';

const Footer = () => {
  const { logo, menu, widgets, socialMedia } = footer;
  const date = new Date();
  const year = date.getFullYear();

  return (
    <FooterArea>
      <Container>
        <WidgetArea>
          {widgets.map((item) => (
            <Box className="col" key={`footer-widget--key${item.id}`}>
              <Image src={item.icon} alt={item.title} />
              <Heading as="h3" content={item.title} />
              <Text content={item.description} />
            </Box>
          ))}
        </WidgetArea>
        {/* End of footer widgets area */}
        <MenuArea>
          <Logo
            className="logo"
            href="/appclassic"
            logoSrc={logo}
            title="App Classic"
          />
          <Menu>
            {menu.map((item) => (
              <MenuItem key={`footer-link${item.id}`}>
                <Link href={item.link}>
                  <a>{item.text}</a>
                </Link>
              </MenuItem>
            ))}
          </Menu>
          <Menu>
            {socialMedia.map((item) => {
              const { name, link, icon } = item;
              if (_.isEmpty(link)) {
                return null;
              }

              switch (name) {
                case 'email':
                  return (
                    <a
                      className="third-link text-storm gr-hover-text-primary"
                      key={name}
                      href={`mailto:${item.link}`}
                    >
                      <FontAwesomeIcon
                        className="icon-gray"
                        icon={item.icon}
                      ></FontAwesomeIcon>
                    </a>
                  );
                default:
                  return (
                    <a
                      className="third-link text-storm gr-hover-text-primary"
                      key={name}
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon
                        className="icon-gray"
                        icon={item.icon}
                      ></FontAwesomeIcon>
                    </a>
                  );
              }
            })}
          </Menu>
          <CopyrightText>Copyright {year} By OAK Network</CopyrightText>
        </MenuArea>
        {/* End of footer menu area */}
      </Container>
    </FooterArea>
  );
};

export default Footer;
