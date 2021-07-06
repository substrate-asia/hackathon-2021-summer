import React from 'react';
import Text from 'common/components/Text';
import Input from 'common/components/Input';
import Image from 'common/components/Image';
import Button from 'common/components/Button';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';

import {
  FooterWrapper,
  Subscription,
  SubscriptionForm,
  FooterBottom,
  FooterLeft,
  FooterNav,
} from './footer.style';

import { data } from 'common/data/Donation';
import logoDark from 'common/assets/image/donation/logo-dark.png';

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted.');
  };

  return (
    <FooterWrapper>
      <Container>
        <Subscription>
          <Heading content="Don’t forget to subscribe for any update about COVID-19" />
          <SubscriptionForm onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Enter Email address"
              className="input-field"
            />
            <Button title="Subscribe" type="submit" />
          </SubscriptionForm>
        </Subscription>
        <FooterBottom>
          <FooterLeft>
            <Image src={logoDark} alt="logo" />
            <Text content="Copyright 2020 by donate org." />
          </FooterLeft>
          <FooterNav>
            {data?.footerNav?.map((nav) => (
              <li key={nav.id}>
                <a href={nav.url}>{nav.title}</a>
              </li>
            ))}
          </FooterNav>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
