import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  padding: 90px 0 100px;
  @media only screen and (max-width: 624px) {
    padding: 72px 0 80px;
  }
  .container {
    @media only screen and (min-width: 1367px) {
      max-width: 1290px;
    }
  }
`;

export const ContentWrapper = styled.div`
  margin-top: -40px;
  .masonryGrid {
    margin-left: -30px;
    margin-right: -30px;
    @media only screen and (max-width: 768px) {
      margin-left: -15px;
      margin-right: -15px;
    }
  }
`;
export const MasonryItem = styled.div`
  width: 50%;
  margin-top: 40px;
  padding-left: 30px;
  padding-right: 30px;
  @media only screen and (max-width: 768px) {
    padding-left: 15px;
    padding-right: 15px;
  }
  @media only screen and (max-width: 624px) {
    width: 100%;
  }
`;

export const FaqItem = styled.div`
  border-bottom: 1px solid ${themeGet('colors.borderColor')};
  padding-bottom: 17px;
  h4 {
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
    letter-spacing: -0.5px;
    color: ${themeGet('colors.headingColor')};
    margin-bottom: 15px;
  }
  p {
    font-size: 15px;
    line-height: 32px;
    color: ${themeGet('colors.textColor')};
  }
`;

export default SectionWrapper;
