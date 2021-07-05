import React from 'react';
import Container from 'common/components/UI/ContainerTwo';
import Text from 'common/components/Text';
import Image from 'common/components/Image';
import Button from 'common/components/Button';
import Heading from 'common/components/Heading';
import Input from 'common/components/Input';
import BannerWrapper, {
  BannerContent,
  Subscribe,
  SponsoredBy,
  ImageGroup,
} from './banner.style';

import paypal from 'common/assets/image/agencyModern/paypal.png';
import google from 'common/assets/image/agencyModern/google.png';
import dropbox from 'common/assets/image/agencyModern/dropbox.png';

const Banner = () => {
  return (
    <BannerWrapper id="home">
      <Container>
        <BannerContent>
          <Heading
            as="h1"
            content="Build your audience &amp; grow your business online smarter"
          />

          <Text
            className="banner-caption"
            content="Agencies around the world are moving to the digital agencies. So, It is high time to introduce your agency digitaly. We respect our customer opinions."
          />

          <Subscribe>
            <Input
              inputType="email"
              placeholder="Enter Email Address"
              iconPosition="left"
              aria-label="email"
            />
            <Button title="Subscribe" type="submit" />
          </Subscribe>

          <SponsoredBy>
            <Text className="sponsoredBy" content="Sponsored by:" />
            <ImageGroup>
              <Image src={paypal} alt="Paypal" />
              <Image src={google} alt="Google" />
              <Image src={dropbox} alt="Dropbox" />
            </ImageGroup>
          </SponsoredBy>
        </BannerContent>
      </Container>
    </BannerWrapper>
  );
};

export default Banner;
