import React from 'react';
import Text from 'common/components/Text';
import Image from 'common/components/Image';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import FeatureBlock from 'common/components/FeatureBlock';
import SectionWrapper, { ThumbWrapper, TextWrapper } from './chooseUs.style';

import { chooseUs } from 'common/data/AppCreative';

const ChooseUs = () => {
  const { title, thumb, features } = chooseUs;
  return (
    <SectionWrapper>
      <Container>
        <ThumbWrapper>
          <Image src={thumb} alt="App Image" />
        </ThumbWrapper>

        <TextWrapper>
          <Heading content={title} />
          {features.map((item) => (
            <FeatureBlock
              key={`app-feature--key${item.id}`}
              iconPosition="left"
              icon={<Text as="span" content={'0' + item.id} />}
              title={<Heading as="h3" content={item.title} />}
              description={<Text content={item.description} />}
            />
          ))}
        </TextWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default ChooseUs;
