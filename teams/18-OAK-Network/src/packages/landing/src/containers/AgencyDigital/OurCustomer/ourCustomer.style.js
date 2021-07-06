import styled from 'styled-components';

const Section = styled.div`
  padding: 90px 0 30px;
  @media screen and (max-width: 1440px) {
    padding: 60px 0 0px;
  }
  @media screen and (max-width: 768px) {
    padding: 30px 0 0px;
  }
  @media screen and (max-width: 480px) {
    padding: 50px 0 10px;
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
    @media screen and (max-width: 480px) {
      font-size: 20px;
      line-height: 30px;
    }
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
