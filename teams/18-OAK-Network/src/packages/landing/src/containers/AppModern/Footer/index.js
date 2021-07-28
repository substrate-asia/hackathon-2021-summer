import React from 'react';
import { Popover } from 'antd';
import { Image as CloudImage } from 'cloudinary-react';
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
import config from '../../../config';

const Footer = () => {
  const { logo, menu, widgets, socialMedia } = footer;
  const date = new Date();
  const year = date.getFullYear();

  return (
    <FooterArea>
      <Container>
        <WidgetArea>
          {widgets.map((item) => (
            <a
              className="col"
              key={`footer-widget--key${item.id}`}
              href={item.link}
            >
              <Image src={item.icon} alt={item.title} />
              <Heading as="h3" content={item.title} />
              <Text content={item.description} />
            </a>
          ))}
        </WidgetArea>
        {/* End of footer widgets area */}
        <MenuArea>
          <Logo
            className="logo"
            href="https://oak.tech/"
            logoSrc={logo}
            title="App Classic"
          />
          <Menu>
            {menu.map((item) => (
              <MenuItem key={`footer-link${item.id}`}>
                <span className="menu-link">{item.text}</span>
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
                case 'wechat':
                  return (
                    <Popover
                      key={name}
                      content={
                        <CloudImage
                          style={{ width: 160, height: 160 }}
                          className="wechat-qrcode"
                          cloudName={config.cloudName}
                          version={config.cloudVersion}
                          publicId="OAK/socialMedia/wechat"
                        />
                      }
                    >
                      <a className="third-link text-storm gr-hover-text-primary">
                        <FontAwesomeIcon
                          className="icon-gray"
                          icon={item.icon}
                        ></FontAwesomeIcon>
                      </a>
                    </Popover>
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
