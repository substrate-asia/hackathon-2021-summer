import styled from 'styled-components';

const Section = styled.div`
  padding: 90px 0 60px;
  @media screen and (max-width: 480px) {
    padding: 50px 0;
  }
`;

export const ContentWrapper = styled.div`
  .illustration {
    @media screen and (max-width: 480px) {
      margin-top: 30px;
    }
  }
`;

export const SectionHeading = styled.div`
  margin: 0 auto;
  max-width: 600px;
  text-align: center;
  h2 {
    font-family: Arvo;
    font-weight: 700;
    font-size: 30px;
    line-height: 45px;
    text-align: center;
    letter-spacing: -0.5px;
    color: #0f2137;
  }
  p {
    font-size: 16px;
    line-height: 35px;
    text-align: center;
    color: #0f2137;
  }
  a {
    font-weight: 700;
    font-size: 16px;
    color: #4f96ff;
  }
`;

export default Section;
