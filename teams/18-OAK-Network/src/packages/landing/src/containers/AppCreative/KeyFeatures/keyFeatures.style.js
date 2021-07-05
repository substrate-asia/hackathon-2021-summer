import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const SectionWrapper = styled.section`
  padding: 90px 0 35px;
  overflow: hidden;
  @media only screen and (max-width: 991px) {
    padding-bottom: 15px;
    padding-top: 80px;
  }
  .container {
    @media only screen and (min-width: 1367px) {
      max-width: 1290px;
    }
  }
`;

export const FeatureWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto -40px;
  padding-top: 8px;
  @media only screen and (max-width: 991px) {
    padding-top: 0px;
  }

  > div {
    width: calc(100% / 4 - 30px);
    margin-bottom: 45px;
    margin-right: 40px;
    @media only screen and (max-width: 1366px) {
      width: calc(100% / 4 - 23px);
      margin-right: 30px;
    }
    @media only screen and (max-width: 991px) {
      width: calc(100% / 2);
      margin-right: 0;
      padding: 0 15px;
    }
    @media only screen and (max-width: 624px) {
      width: 100%;
      padding: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }

  .feature__block {
    text-align: center;
    .icon__wrapper {
      margin: 0 auto 22px;
      position: relative;
      height: 80px;
      @media only screen and (max-width: 1366px) {
        margin-bottom: 20px;
      }
      img {
        display: inline-block;
      }
    }
    .content__wrapper {
      margin: 0 auto;
      @media only screen and (min-width: 481px) and (max-width: 624px) {
        max-width: 375px;
      }
      h3 {
        color: ${themeGet('colors.headingColor', '#0F2137')};
        font-size: 18px;
        line-height: 28px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      p {
        color: ${themeGet('colors.textColor')};
        font-size: 15px;
        line-height: 28px;
        padding: 0 10px;
        margin: 0;
      }
    }
  }
`;
