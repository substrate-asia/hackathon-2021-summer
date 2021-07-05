import React from 'react';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Container from 'common/components/UI/Container';
import SectionWrapper, { ContentWrapper } from './investment.style';
import GraphImg from 'common/assets/image/cryptoModern/graph.png';
import dummyImg from 'common/assets/image/cryptoModern/pattern.png';

const InvestmentPortal = () => {
  return (
    <SectionWrapper>
      <Container>
        <ContentWrapper>
          <div className="content">
            <Heading content="Total Investment sale from last year transaction" />
            <Text content="Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu" />
          </div>
          <div className="image">
            <Image src={GraphImg} alt="Graph Image" />
          </div>
        </ContentWrapper>
      </Container>
      <Image className="patternImg" src={dummyImg} alt="pattern Image" />
    </SectionWrapper>
  );
};

export default InvestmentPortal;
