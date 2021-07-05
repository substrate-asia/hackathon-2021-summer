import React from 'react';
import { Icon } from 'react-icons-kit';
import { check } from 'react-icons-kit/feather/check';
import { arrowRight } from 'react-icons-kit/feather/arrowRight';
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';
import Input from 'common/components/Input';
import {
  Section,
  ContentWrapper,
  SubscriptionWrapper,
  SubscriptionForm,
  Features,
} from './subscription.style';

const Subscription = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('subscribed.');
  };
  return (
    <Section>
      <Container>
        <ContentWrapper>
          <SubscriptionWrapper>
            <Heading content="Get Started today and try 30 days free!" />
            <SubscriptionForm onSubmit={handleSubmit}>
              <Input
                type="email"
                className="input-field"
                placeholder="Type your e-mail"
              />
              <Button
                type="submit"
                title="Start Subscription"
                icon={<Icon size={18} icon={arrowRight} />}
              />
            </SubscriptionForm>
            <Features>
              <li>
                <Icon size={20} icon={check} /> 30 days money back
              </li>
              <li>
                <Icon size={20} icon={check} /> Cancel anytime
              </li>
              <li>
                <Icon size={20} icon={check} /> Support &amp; help
              </li>
            </Features>
          </SubscriptionWrapper>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Subscription;
