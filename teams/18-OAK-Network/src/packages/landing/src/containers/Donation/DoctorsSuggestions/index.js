import React from 'react';
import styled from 'styled-components';
import Image from 'common/components/Image';
import Container from 'common/components/UI/Container';
import SectionHeading from '../SectionHeading';

import { data } from 'common/data/Donation';

const DoctorsSuggestions = () => {
  return (
    <Section id="docs-suggestions">
      <Container>
        <SectionHeading
          title="Some Suggestion by doctors to safe"
          desc="COVID19 is an infectious disease caused by a newly discovered corona virus. Most people infected with the COVID19"
        />
        <ContentWrapper>
          {data?.suggestions?.map((item) => (
            <Figure key={item.id}>
              <Image src={item.thumb} alt={item.title} />
              <figcaption>{item.title}</figcaption>
            </Figure>
          ))}
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default DoctorsSuggestions;

const Section = styled.section`
  padding-top: 70px;
  padding-bottom: 70px;
  @media only screen and (max-width: 768px) {
    padding-top: 50px;
    padding-bottom: 50px;
  }
`;

const ContentWrapper = styled.div`
  gap: 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media only screen and (max-width: 768px) {
    gap: 50px 30px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 480px) {
    gap: 50px 30px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Figure = styled.figure`
  margin: 0;
  text-align: center;
  img {
    margin: 0 auto;
  }
  figcaption {
    font-weight: 500;
    font-size: 15px;
    line-height: 1.5;
    text-align: center;
    color: #0f2137;
    max-width: 190px;
    margin: 30px auto 0;
  }
`;
