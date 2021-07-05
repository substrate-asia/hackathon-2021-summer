import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  background-color: #f9fafc;
  padding: 120px 0;
  @media only screen and (max-width: 1440px) {
    padding: 80px 0;
  }
  @media only screen and (max-device-width: 1280px) {
    padding: 70px 0;
  }
  @media only screen and (max-width: 480px) {
    padding: 40px 0;
  }
`;

export const SectionTitle = styled.div`
  text-align: center;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  h2 {
    font-weight: 700;
    font-size: 26px;
    line-height: 50px;
    @media screen and (max-width: 480px) {
      line-height: 40px;
    }
  }
  p {
    font-size: 15px;
    line-height: 35px;
  }
`;

export const FeatureWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  @media screen and (max-width: 700px) {
    justify-content: space-between;
  }
  .ultimateFeature {
    text-align: center;
    margin-top: 80px;
    width: calc(33.3333% - 70px);
    @media only screen and (max-width: 1440px) {
      margin-top: 50px;
    }
    @media screen and (max-width: 991px) {
      width: calc(50% - 70px);
    }
    @media screen and (max-width: 768px) {
      width: calc(50% - 40px);
    }
    @media screen and (max-width: 624px) {
      width: 100%;
    }
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
      margin-top: 50px;
    }
    .icon__wrapper {
      margin-bottom: 28px;
    }
    h4 {
      font-size: 18px;
      line-height: 30px;
    }
    p {
      color: ${themeGet('colors.textColor')};
      font-size: 15px;
      line-height: 30px;
    }
    .learn__more {
      font-weight: 500;
      font-size: 15px;
      line-height: 42px;
      display: inline-flex;
      align-items: center;
      color: ${themeGet('colors.linkColor')};
      i {
        line-height: 1;
        margin-left: 2px;
        transition: 0.3s ease 0s;
      }
      &:hover i {
        margin-left: 7px;
      }
    }
  }
`;

export default SectionWrapper;
