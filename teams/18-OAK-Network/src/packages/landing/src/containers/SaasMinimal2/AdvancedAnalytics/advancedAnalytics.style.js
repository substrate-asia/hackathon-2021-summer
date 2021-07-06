import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Section = styled.section`
  padding: 80px 0;
  @media only screen and (max-width: 768px) {
    padding-top: 50px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Illustration = styled.figure``;

export const TextContent = styled.div`
  max-width: 465px;
  margin-left: 70px;
  @media only screen and (max-width: 1200px) {
    max-width: 425px;
    margin-left: 40px;
  }
  @media only screen and (max-width: 768px) {
    max-width: 465px;
    margin-left: 0;
    margin-top: 50px;
  }
  .slogan {
    color: ${themeGet('colors.secondary')};
    display: flex;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.31;
    letter-spacing: -0.01em;
    text-transform: capitalize;
    margin-bottom: 15px;
  }
  .title {
    color: ${themeGet('colors.textPrimary')};
    font-weight: 700;
    font-size: 40px;
    line-height: 1.2;
    letter-spacing: -0.04em;
    margin-bottom: 25px;
    @media only screen and (max-width: 1200px) {
      font-size: 32px;
    }
    @media only screen and (max-width: 480px) {
      font-size: 24px;
      line-height: 1.5;
    }
  }
  .desc {
    color: ${themeGet('colors.textPrimary')};
    margin-bottom: 25px;
    font-size: 16px;
    line-height: 2;
  }
  .link {
    color: ${themeGet('colors.primary')};
    font-size: 15px;
    font-weight: 500;
    display: flex;
    align-items: center;
    i {
      display: inline-flex !important;
      transition: 0.3s ease 0s;
    }
    &:hover i {
      margin-left: 3px;
    }
  }
`;
