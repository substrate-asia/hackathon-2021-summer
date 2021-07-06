import React from 'react';
import styled from 'styled-components';
import Container from 'common/components/UI/Container';
import Image from 'common/components/Image';
import SectionHeading from '../SectionHeading';
import thankYou from 'common/assets/image/donation/thankyou.png';

const ThankYou = () => {
  return (
    <Section id="thank-you">
      <Container>
        <SectionHeading
          title="Say Thank you to our real heroes "
          desc="Healthcare Worker Exposure Response &amp; Outcomes, or HERO, calls on all nurses, doctors, pharmacists, EMS personnel and other employees in health care settings to sign up for the registry and share their stories."
        />
        <ThankYouDocs>
          <Image src={thankYou} alt="thank you docs" />
        </ThankYouDocs>
      </Container>
    </Section>
  );
};

export default ThankYou;

const Section = styled.section`
  padding-top: 70px;
  padding-bottom: 100px;
  @media only screen and (max-width: 768px) {
    padding-top: 50px;
    padding-bottom: 70px;
  }
`;

const ThankYouDocs = styled.figure`
  img {
    margin: 0 auto;
  }
`;
