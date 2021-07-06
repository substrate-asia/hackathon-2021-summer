import React from 'react';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import BlogPost from 'common/components/BlogPost';
import Container from 'common/components/UI/Container';
import SectionWrapper, {
  SectionHeader,
  FeatureWrapper,
} from './workSection.style';

import { workData } from 'common/data/Charity';

const WorkSection = () => {
  const { title, slogan, features } = workData;
  return (
    <SectionWrapper id="work">
      <Container width="1260px">
        <SectionHeader>
          <Heading content={title} />
          <Text content={slogan} />
        </SectionHeader>
        <FeatureWrapper>
          {features.map((item) => (
            <BlogPost
              key={`feature_key${item.id}`}
              thumbUrl={item.icon}
              title={item.title}
              excerpt={item.description}
            />
          ))}
        </FeatureWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default WorkSection;
