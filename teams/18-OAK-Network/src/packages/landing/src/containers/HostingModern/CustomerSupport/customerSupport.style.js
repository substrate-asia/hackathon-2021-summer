import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  padding: 90px 0 0;
  @media only screen and (max-width: 1440px) {
    padding: 70px 0 0;
  }
  @media only screen and (max-width: 1024px) {
    padding: 70px 0 80px;
  }
  @media only screen and (max-width: 768px) {
    padding: 60px 0 50px;
  }
  @media only screen and (max-width: 480px) {
    padding: 40px 0 30px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
`;

export const Figure = styled.figure`
  margin: 0;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const Content = styled.div`
  margin: 40px 0 0 30px;
  max-width: 45%;
  @media only screen and (max-width: 768px) {
    max-width: 100%;
  }
  @media only screen and (max-width: 768px) {
    margin: 0;
  }
  h2 {
    font-weight: 500;
    font-size: 36px;
    line-height: 55px;
    letter-spacing: -1px;
    @media only screen and (max-width: 768px) {
      font-size: 24px;
      line-height: 40px;
      max-width: 550px;
    }
    @media only screen and (max-width: 480px) {
      max-width: 100%;
    }
  }
  p {
    font-size: 16px;
    line-height: 36px;
    @media only screen and (max-width: 768px) {
      max-width: 550px;
    }
    @media only screen and (max-width: 480px) {
      max-width: 100%;
    }
  }
`;

export const IconList = styled.div`
  column-count: 2;
  @media only screen and (max-width: 768px) {
    column-count: 1;
  }
  .listItem {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 45px;
    svg {
      color: ${themeGet('colors.primary')};
      margin-right: 8px;
    }
  }
`;

export default SectionWrapper;
