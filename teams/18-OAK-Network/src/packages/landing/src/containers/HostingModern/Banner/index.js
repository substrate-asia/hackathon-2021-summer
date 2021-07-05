import React from 'react';
import Container from 'common/components/UI/ContainerTwo';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Image from 'common/components/Image';
import Input from 'common/components/Input';
import Select from 'common/components/Select';
import Button from 'common/components/Button';

import BannerSection, {
  ContentWrapper,
  BannerContent,
  DomainChecker,
  DomainControl,
  BannerImage,
} from './banner.style';

import illustration from 'common/assets/image/hostingModern/illustration.png';

const options = [
  { label: '.COM', value: 'dot-com' },
  { label: '.NET', value: 'dot-net' },
  { label: '.ORG', value: 'dot-org' },
];

const Banner = () => {
  return (
    <BannerSection id="home">
      <Container>
        <ContentWrapper>
          <BannerContent>
            <Heading as="h1" content="Built your business with a website" />
            <Text content="Get your tests delivered at let home collect sample from the victory of the managements that supplies best." />
            <DomainChecker>
              <DomainControl>
                <Input
                  inputType="text"
                  placeholder="Your domain name"
                  iconPosition="left"
                  aria-label="domain"
                />
                <Select
                  options={options}
                  defaultValue={options[0]}
                  id="domain"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </DomainControl>
              <Button fullWidth title="Start for free" type="submit" />
            </DomainChecker>
          </BannerContent>
          <BannerImage>
            <Image src={illustration} alt="" />
          </BannerImage>
        </ContentWrapper>
      </Container>
    </BannerSection>
  );
};

export default Banner;
