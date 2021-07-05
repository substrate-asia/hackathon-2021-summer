import React from 'react';
import Container from 'common/components/UI/Container';
import Image from 'common/components/Image';
import Link from 'common/components/Link';

import logo from 'common/assets/image/saasMinimal2/logo-black.png';

import { data } from 'common/data/SaasMinimal2';

import {
  Section,
  ContentWrapper,
  Copyright,
  Nav,
  SocialProfiles,
  Icons,
} from './footer.style';

const Footer = () => {
  return (
    <Section>
      <Container>
        <ContentWrapper>
          <Copyright>
            <figure>
              <Image src={logo} alt="saas minimal" />
            </figure>
            <p>
              Copyright © 2020 <Link href="#">RedQ, Inc.</Link>
            </p>
          </Copyright>
          <Nav>
            {data?.footerNav?.map((item) => (
              <li key={item.id}>
                <Link href={item.url}>{item.title}</Link>
              </li>
            ))}
          </Nav>
          <SocialProfiles>
            <span>Social</span>
            <Icons>
              {data?.socialLinks?.map((item) => (
                <Link key={item.id} href={item.url}>
                  <Image src={item.icon} alt={item.label} />
                </Link>
              ))}
            </Icons>
          </SocialProfiles>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Footer;
