import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Section = styled.section`
  padding: 80px 0;
  @media only screen and (max-width: 768px) {
    padding-bottom: 50px;
    .container {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
`;

export const SectionHeading = styled.div`
  margin: 0 auto 100px;
  max-width: 575px;
  text-align: center;
  @media only screen and (max-width: 1200px) {
    margin-bottom: 75px;
  }
  h2 {
    font-weight: 700;
    font-size: 28px;
    line-height: 1.29;
    letter-spacing: -0.5px;
    color: ${themeGet('colors.textPrimary')};
    @media only screen and (max-width: 480px) {
      font-size: 24px;
    }
  }
  p {
    font-size: 16px;
    line-height: 2.19;
    color: ${themeGet('colors.text')};
    @media only screen and (max-width: 480px) {
      line-height: 1.9;
    }
  }
`;

export const FeatureWrapper = styled.div`
  gap: 39px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media only screen and (max-width: 768px) {
    gap: 50px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 270px);
    justify-content: center;
  }
  .feature-item {
    text-align: center;
    .thumbnail {
      min-height: 90px;
      margin-bottom: 28px;
    }
    .title {
      font-weight: 700;
      font-size: 18px;
      line-height: 1.28;
      color: ${themeGet('colors.textPrimary')};
    }
    .excerpt {
      font-size: 15px;
      line-height: 1.88;
      color: ${themeGet('colors.text')};
    }
  }
`;
