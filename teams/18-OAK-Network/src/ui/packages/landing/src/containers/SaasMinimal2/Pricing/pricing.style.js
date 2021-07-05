import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Section = styled.section`
  background-color: ${themeGet('colors.primary')};
  padding: 80px 0;
  @media only screen and (max-width: 768px) {
    padding: 60px 0 70px;
  }
  @media only screen and (max-width: 768px) {
    .container {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
`;

export const SectionHeading = styled.div`
  margin: 0 auto 60px;
  max-width: 545px;
  text-align: center;
  h2 {
    color: ${themeGet('colors.white')};
    font-weight: 700;
    font-size: 48px;
    line-height: 1.3;
    letter-spacing: -1px;
    @media only screen and (max-width: 1200px) {
      font-size: 44px;
    }

    @media only screen and (max-width: 480px) {
      font-size: 32px;
    }
  }
`;

export const ContentWrapper = styled.div`
  background-color: ${themeGet('colors.white')};
  border-radius: 5px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    max-width: 550px;
    margin: 0 auto;
  }

  @media only screen and (max-width: 480px) {
    max-width: 360px;
  }

  h2 {
    font-size: 40px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.02em;
    color: ${themeGet('colors.textPrimary')};
    margin-bottom: 20px;
    @media only screen and (max-width: 1200px) {
      font-size: 28px;
    }
    @media only screen and (max-width: 480px) {
      font-size: 24px;
      line-height: 1.5;
    }
  }
  p {
    color: ${themeGet('colors.text')};
    font-size: 16px;
    line-height: 2;
    margin-bottom: 27px;
  }
`;

export const TextContent = styled.div`
  padding: 70px;
  @media only screen and (max-width: 1200px) {
    padding: 27px;
  }
  @media only screen and (max-width: 768px) {
    padding: 45px;
  }
`;

export const ButtonGroup = styled.div`
  margin-bottom: 40px;
  button {
    background-color: ${themeGet('colors.primary')};
    color: ${themeGet('colors.white')};
    border-radius: 100px;
    min-height: 60px;
    padding: 0 30px;
    margin-right: 25px;
    @media only screen and (max-width: 480px) {
      margin-right: 0;
      margin-bottom: 20px;
      min-height: 50px;
    }
  }
  a {
    font-weight: 700;
  }
`;

export const Features = styled.ul`
  display: flex;
  margin: 0;
  @media only screen and (max-width: 480px) {
    display: block;
  }
  li {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.29;
    color: ${themeGet('colors.text')};
    margin-right: 18px;
    display: flex;
    align-items: center;
    &:last-child {
      margin-right: 0;
    }
    i {
      display: inline-flex !important;
      margin-right: 8px;
      color: ${themeGet('colors.secondary')};
    }
    @media only screen and (max-width: 1200px) {
      margin-right: 14px;
    }
  }
`;

export const Illustration = styled.figure`
  min-width: 550px;
  @media only screen and (max-width: 1200px) {
    min-width: 461px;
  }
  @media only screen and (max-width: 768px) {
    img {
      border-radius: 5px 5px 0 0;
    }
  }
  @media only screen and (max-width: 480px) {
    min-width: auto;
  }
`;
