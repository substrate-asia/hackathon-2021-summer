import React from 'react';
import Fade from 'react-reveal/Fade';

import Container from 'common/components/UI/ContainerTwo';
import CheckBox from 'common/components/Checkbox';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';
import Input from 'common/components/Input';
import Image from 'common/components/Image';
import Text from 'common/components/Text';

import SectionWrapper, {
  FooterInner,
  Content,
  SubscriptionForm,
} from './subscribe.style';

import bg1 from 'common/assets/image/agencyModern/cta/1.png';
import bg2 from 'common/assets/image/agencyModern/cta/2.png';
import bg3 from 'common/assets/image/agencyModern/cta/3.png';
import bg4 from 'common/assets/image/agencyModern/cta/4.png';
import bg5 from 'common/assets/image/agencyModern/cta/5.png';

const Subscribe = () => {
  return (
    <SectionWrapper>
      <Container>
        <FooterInner>
          <Content>
            <Heading as="h3" content="Like our service? Subscribe us" />
            <Text content="We have more than thousand of creative entrepreneurs and stat joining our business" />
          </Content>
          <SubscriptionForm>
            <div>
              <Input
                inputType="email"
                placeholder="Enter Email Address"
                iconPosition="left"
                aria-label="email"
              />
              <Button title="Subscribe" type="submit" />
            </div>
            <CheckBox
              id="remember"
              htmlFor="remember"
              labelText="Don’t provide any promotional message."
            />
          </SubscriptionForm>
        </FooterInner>
      </Container>
      <Image src={bg1} alt="bg1" className="illustration bg1" />
      <Image src={bg2} alt="bg2" className="illustration bg2" />
      <Image src={bg3} alt="bg3" className="illustration bg3" />
      <Image src={bg4} alt="bg4" className="illustration bg4" />
      <Image src={bg5} alt="bg5" className="illustration bg5" />
    </SectionWrapper>
  );
};

export default Subscribe;
