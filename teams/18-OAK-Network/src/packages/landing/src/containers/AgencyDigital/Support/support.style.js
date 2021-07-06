import styled from 'styled-components';

const Section = styled.section`
  padding: 90px 0;
  @media screen and (max-width: 1440px) {
    padding: 60px 0 30px;
  }
  @media screen and (max-width: 768px) {
    padding: 30px 0;
  }
  @media screen and (max-width: 480px) {
    padding: 0px 0 10px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    /* flex-direction: column-reverse; */
  }
`;

export const Content = styled.div`
  width: 38%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  h2 {
    font-family: Arvo;
    font-weight: bold;
    font-size: 36px;
    line-height: 55px;
    letter-spacing: -0.5px;
    color: #0f2137;
    @media screen and (max-width: 768px) {
      font-size: 24px;
      line-height: 35px;
      text-align: center;
    }
    @media screen and (max-width: 480px) {
      font-size: 20px;
      line-height: 35px;
    }
  }
  p {
    font-size: 16px;
    line-height: 36px;
    color: #02073e;
    @media screen and (max-width: 768px) {
      text-align: center;
    }
  }
`;

export const Illustration = styled.figure`
  margin: 0;
  width: 62%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const HelpBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  .icon {
    margin-right: 20px;
    min-width: 60px;
  }
  h4 {
    font-weight: bold;
    font-size: 18px;
    line-height: 30px;
    color: #0f2137;
    margin: 0;
    @media screen and (max-width: 480px) {
      text-align: left;
    }
  }
  p {
    font-size: 16px;
    line-height: 26px;
    color: #343d48;
    margin: 0;
    @media screen and (max-width: 480px) {
      text-align: left;
    }
  }
`;

export default Section;
