import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { rgba } from 'polished';

export const Section = styled.section`
  background-color: ${themeGet('colors.primary')};
  position: relative;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  @media only screen and (max-width: 1440px) {
    min-height: 90vh;
  }
  @media only screen and (max-width: 1366px) {
    min-height: 100vh;
  }
  @media only screen and (max-width: 1024px) {
    min-height: 47vh;
  }
  @media only screen and (max-width: 480px) {
    min-height: 70vh;
  }
  @media only screen and (max-width: 360px) {
    min-height: 95vh;
  }
`;

export const TextContent = styled.div`
  max-width: 550px;
  @media only screen and (max-width: 1200px) {
    max-width: 377px;
  }
  @media only screen and (max-width: 768px) {
    margin: 20px auto 0;
    text-align: center;
  }
  h2 {
    color: ${themeGet('colors.white')};
    font-weight: 700;
    font-size: 62px;
    line-height: 1.13;
    letter-spacing: -2px;
    margin-bottom: 20px;
    @media only screen and (max-width: 1440px) {
      font-size: 50px;
    }
    @media only screen and (max-width: 1366px) {
      font-size: 45px;
      line-height: 1.3;
    }
    @media only screen and (max-width: 1200px) {
      font-size: 34px;
    }
    @media only screen and (max-width: 480px) {
      font-size: 28px;
    }
  }
  p {
    color: ${rgba('#fff', 0.8)};
    font-weight: 500;
    font-size: 18px;
    line-height: 1.9;
    letter-spacing: -0.3px;
    max-width: 514px;
    margin-bottom: 45px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
  button {
    background-color: ${themeGet('colors.white')};
    border-radius: 100px;
    min-height: 60px;
    padding: 0 30px;
    margin-right: 25px;
    span {
      color: ${themeGet('colors.primary')};
    }
    @media only screen and (max-width: 480px) {
      margin-right: 0;
      margin-bottom: 20px;
      min-height: 50px;
    }
  }
  span {
    font-weight: 500;
    font-size: 15px;
    line-height: 1.33;
    color: ${rgba('#fff', 0.6)};
    margin: 0;
  }
`;

export const Illustration = styled.figure`
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  @media only screen and (max-width: 768px) {
    display: none;
  }
  img {
    max-width: 93%;
    margin-left: auto;
    @media only screen and (max-width: 1600px) {
      max-width: 75%;
    }
    @media only screen and (max-width: 1440px) {
      max-width: 73%;
    }
    @media only screen and (max-width: 1366px) {
      max-width: 62%;
    }
    @media only screen and (max-width: 1200px) {
      max-width: 60%;
    }
    @media only screen and (max-width: 1024px) {
      max-width: 54%;
    }
  }
`;
