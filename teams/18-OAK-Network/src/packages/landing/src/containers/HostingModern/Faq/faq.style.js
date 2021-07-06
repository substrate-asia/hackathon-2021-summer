import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  padding: 70px 0 120px;
  @media only screen and (max-width: 1440px) {
    padding: 70px 0 90px;
  }
  @media only screen and (max-width: 480px) {
    padding: 50px 0 60px;
  }
`;

export const ContentWrapper = styled.div`
  /* column-count: 2;
  column-gap: 80px; */
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 768px) {
    margin-top: -30px;
  }

  .react-reveal {
    border-bottom: 2px solid ${themeGet('colors.textPrimary')};
    flex: 0 0 calc(50% - 40px);
    margin-top: 40px;
    &:nth-child(odd) {
      margin-right: 80px;
    }
    @media only screen and (max-width: 768px) {
      flex: 0 0 calc(50% - 25px);
      &:nth-child(odd) {
        margin-right: 50px;
      }
    }
    @media only screen and (max-width: 767px) {
      flex: 0 0 100%;
    }
  }
`;

export const FaqItem = styled.div`
  h4 {
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
    letter-spacing: -0.5px;
    color: ${themeGet('colors.textPrimary')};
  }
  p {
    font-size: 15px;
    line-height: 32px;
    color: ${themeGet('colors.text')};
  }
`;

export default SectionWrapper;
