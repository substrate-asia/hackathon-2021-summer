import React from 'react';
import { Icon } from 'react-icons-kit';
import { arrowRight } from 'react-icons-kit/feather/arrowRight';
import { check } from 'react-icons-kit/feather/check';
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';
import Image from 'common/components/Image';
import Link from 'common/components/Link';
import Text from 'common/components/Text';

import {
  Section,
  SectionHeading,
  ContentWrapper,
  Illustration,
  TextContent,
  ButtonGroup,
  Features,
} from './pricing.style';

import woman from 'common/assets/image/saasMinimal2/woman.png';

const Pricing = () => {
  return (
    <Section id="pricing">
      <Container noGutter>
        <SectionHeading>
          <Heading content="Try for 30 days free trial!" />
        </SectionHeading>
        <ContentWrapper>
          <TextContent>
            <Heading
              className="title"
              content="Start using Metro now and modernize your company's people!"
            />
            <Text
              className="desc"
              content="Build an incredible workplace and grow your business with Gusto’s all-in-one platform with amazing contents."
            />
            <ButtonGroup>
              <Button title="Try it for free" />
              <Link className="link" href="#">
                See Pricing Plan <Icon size={18} icon={arrowRight} />
              </Link>
            </ButtonGroup>
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
          </TextContent>
          <Illustration>
            <Image src={woman} alt="illustration" />
          </Illustration>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Pricing;
