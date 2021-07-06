import React from 'react';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Container from 'common/components/UI/Container';
import SectionWrapper, { ContentWrapper } from './fundRaising.style';
import FundGraphImg from 'common/assets/image/cryptoModern/fund-graph.png';
import GraphFeatureImg from 'common/assets/image/cryptoModern/graph-feature.png';

const DesignedAndBuilt = () => {
  return (
    <SectionWrapper id="fund">
      <Container>
        <ContentWrapper>
          <div className="image">
            <Image src={FundGraphImg} alt="Graph Image" />
          </div>
          <div className="content">
            <Heading content="Fund raising allocation" />
            <Text content="Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu Lorem ipsum dolor sit ." />
            <Image src={GraphFeatureImg} alt="Graph Feature Image" />
          </div>
          <div className="gradientDiv"> </div>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default DesignedAndBuilt;
