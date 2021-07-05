import React from 'react';
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';

import Container from 'common/components/UI/ContainerTwo';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Link from 'common/components/Link';

import SectionWrapper, {
  Section,
  Content,
  Illustration,
} from './customer.style';
import illustration from 'common/assets/image/agencyModern/customer.png';

const Customer = () => {
  return (
    <SectionWrapper>
      <Container>
        <Section>
          <Illustration>
            <Image src={illustration} alt="Illustration" />
          </Illustration>
          <Content>
            <Heading
              as="h2"
              content="We have more than thousand of worldwide happy customer"
            />
            <Text content="Coworking offers beautifully crafted workspaces where people can create, connect, and grow their businesses at prime locations in multiple cities." />
            <Link className="explore" href="#">
              Explore more <Icon icon={chevronRight} />
            </Link>
          </Content>
        </Section>
      </Container>
    </SectionWrapper>
  );
};

export default Customer;
