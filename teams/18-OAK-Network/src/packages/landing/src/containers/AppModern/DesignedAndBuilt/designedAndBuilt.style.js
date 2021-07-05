import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.div`
  padding: 75px 0 25px;
  overflow: hidden;
  @media (max-width: 1600px) {
    padding: 25px 0 0px;
  }
  @media only screen and (max-width: 1366px) {
    padding: 30px 0;
  }
  @media only screen and (max-width: 667px) {
    padding: 30px 0 0;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .image {
    width: calc(100% - 410px);
    @media only screen and (max-width: 991px) {
      width: calc(100% - 290px);
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
      margin-bottom: 40px;
    }
  }
  .content {
    width: 410px;
    @media only screen and (max-width: 991px) {
      width: 290px;
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
    h2 {
      color: ${themeGet('colors.headingColor', '#0F2137')};
      font-size: 36px;
      line-height: 44px;
      font-weight: 700;
      letter-spacing: -1px;
      margin-bottom: 27px;
      max-width: 400px;
      @media only screen and (max-width: 1366px) {
        font-size: 30px;
        line-height: 42px;
        margin-bottom: 20px;
      }
      @media only screen and (max-width: 991px) {
        font-size: 26px;
        line-height: 38px;
      }
      @media only screen and (max-width: 768px) {
        max-width: 100%;
      }
    }
    p {
      font-size: 16px;
      line-height: 28px;
      color: #6e7379;
      margin-bottom: 36px;
      @media only screen and (max-width: 1366px) {
        margin-bottom: 30px;
      }
      @media only screen and (max-width: 768px) {
        text-align: center;
      }
    }
    h5 {
      font-size: 14px;
      font-weight: 700;
      line-height: 24px;
      margin-bottom: 12px;
      letter-spacing: 1.5px;
      color: ${themeGet('colors.primary', '#0F2137')};
      text-transform: uppercase;
      @media only screen and (max-width: 768px) {
        text-align: center;
      }
    }
  }
  .reusecore__button {
    border-radius: 5px;
    &:hover {
      background-color: ${themeGet('colors.primaryHover', '#3C74FF')};
    }
  }
`;

export default SectionWrapper;
