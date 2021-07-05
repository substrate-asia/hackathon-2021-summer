import React, { Fragment } from 'react';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Container from 'common/components/UI/Container';
import FeatureBlock from 'common/components/FeatureBlock';
import { SectionHeader } from '../app-minimal.style';
import SectionWrapper, { FeatureWrapper } from './features.style';

import { features } from 'common/data/AppMinimal';

const Features = () => {
  const { title, description, items } = features;

  return (
    <SectionWrapper id="service_section">
      <Container>
        <SectionHeader className="text-white">
          <Heading content={title} />
          <Text content={description} />
        </SectionHeader>
        <FeatureWrapper>
          {items.map((item) => (
            <FeatureBlock
              key={`feature-key${item.id}`}
              icon={<Image src={item.icon} alt={item.title} />}
              title={<Heading as="h3" content={item.title} />}
              description={<Text content={item.description} />}
            />
          ))}
        </FeatureWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default Features;
