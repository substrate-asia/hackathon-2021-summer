import React from 'react';
import Zoom from 'react-reveal/Zoom';

import Text from 'common/components/Text';
import Image from 'common/components/Image';
import Button from 'common/components/Button';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import Section, {
  ContentWrapper,
  BannerContent,
  Illustration,
  ButtonGroup,
  TrustedBy,
  ImageGroup,
} from './banner.style';

import paypal from 'common/assets/image/donation/banner/paypal.png';
import google from 'common/assets/image/donation/banner/google.png';
import dropbox from 'common/assets/image/donation/banner/dropbox.png';

const Banner = () => {
  return (
    <Section id="home">
      <ContentWrapper>
        <Container>
          <BannerContent>
            <Heading
              as="h1"
              content="Stay home, be safe &amp; donate helpless"
            />
            <Text
              className="banner-caption"
              content="There will be a day–in our lifetime–when we get to celebrate every person on the planet having access to clean water. We want to celebrate that day with you."
            />
            <ButtonGroup>
              <Button title="Make a Donation" />
              <Button title="Invite Others" className="button-white" />
            </ButtonGroup>
            <TrustedBy>
              <Text content="Trusted by:" />
              <ImageGroup>
                <Image src={paypal} alt="paypal" />
                <Image src={google} alt="google" />
                <Image src={dropbox} alt="dropbox" />
              </ImageGroup>
            </TrustedBy>
          </BannerContent>
        </Container>
        <Illustration />
      </ContentWrapper>
    </Section>
  );
};

export default Banner;
