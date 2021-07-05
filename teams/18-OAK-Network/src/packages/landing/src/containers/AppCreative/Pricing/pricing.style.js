import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { rgba } from 'polished';

export const SectionWrapper = styled.section`
  padding: 90px 0 40px;
  position: relative;
  @media only screen and (max-width: 991px) {
    padding-bottom: 10px;
  }
  @media only screen and (max-width: 624px) {
    padding: 70px 0 0;
  }
  .container {
    @media only screen and (min-width: 1367px) {
      max-width: 1290px;
    }
  }
`;

export const SectionBgArea = styled.div`
  background-color: ${themeGet('colors.primaryLight', '#925B9F')};
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 64.7%;
  top: 0;
  left: 0;
  .shape-one {
    left: 0;
    bottom: 0;
    position: absolute;
  }
  .shape-two {
    right: 0;
    top: 0;
    position: absolute;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 4px 20px rgba(135, 150, 158, 0.1);
  padding: 105px 85px 60px;
  margin: auto 0;
  @media only screen and (max-width: 1219px) {
    padding: 100px 45px 50px;
  }
  @media only screen and (max-width: 991px) {
    padding: 100px 30px 50px;
    margin-top: 0;
  }
  @media only screen and (max-width: 624px) {
    padding: 80px 20px 60px;
  }
  @media only screen and (max-width: 480px) {
    padding-top: 60px;
  }
`;
export const ContentPricing = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 60px;
`;

export const PricingFeature = styled.ul`
  width: 183px;
  margin-top: -57px;
  text-align: left;
  @media screen and (max-width: 991px) {
    width: 160px;
    margin-top: -47px;
  }
  > li {
    justify-content: flex-start;
  }
`;
export const FeatureItem = styled.li`
  border-bottom: 1px solid ${themeGet('colors.borderColorThree', '#EDF0F4')};
  font-weight: 500;
  font-size: 15px;
  line-height: 1.5;
  color: ${themeGet('colors.textColor', '#343D48')};
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  @media screen and (max-width: 991px) {
    font-size: 14px;
  }
  &:last-child {
    border-bottom: 0;
  }
`;

export const PriceTable = styled.div`
  background: #ffffff;
  border: 1px solid ${themeGet('colors.borderColorThree', '#EDF0F4')};
  border-radius: 10px;
  margin-right: 10px;
  padding: 25px 0 65px;
  text-align: center;
  transition: 0.3s ease 0s;
  position: relative;
  margin-right: 8px;
  width: calc(33.33% - 67px);
  @media screen and (max-width: 991px) {
    width: calc(33.33% - 59px);
    padding-bottom: 35px;
  }
  @media screen and (max-width: 768px) {
    margin: 0 5px 5px;
    width: calc(50% - 10px);
  }
  @media screen and (max-width: 480px) {
    margin: 30px 0 0;
    width: 100%;
    &:first-child {
      margin-top: 0;
      margin-bottom: 30px;
    }
  }
  &:last-child {
    margin-right: 0;
  }
  &.isRecommended {
    border-radius: 0 0 10px 10px;
    box-shadow: 0px 15px 50px ${rgba('#5B84C1', 0.1)};
    border: 0px solid;
    @media screen and (max-width: 480px) {
      margin-top: 33px;
    }
    .choosePlan {
      color: ${themeGet('colors.white')};
      border-color: ${themeGet('colors.primary', '#6C247E')};
      background-color: ${themeGet('colors.primary')};
      &:hover {
        border-color: ${rgba('#6C247E', 0.2)};
        color: ${themeGet('colors.primary', '#6C247E')};
        background-color: ${themeGet('colors.white')};
      }
    }
  }
  .recommended {
    background-color: #52acff;
    color: ${themeGet('colors.white')};
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    position: absolute;
    top: -34px;
    left: 0;
    right: 0;
    min-height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px 7px 0 0;
    @media screen and (max-width: 991px) {
      font-size: 13px;
    }
  }
  .title {
    color: ${rgba('#0f2137', 0.5)};
    font-weight: 500;
    font-size: 15px;
    line-height: 1.4;
    margin-bottom: 25px;
    margin-top: 5px;
    @media screen and (max-width: 991px) {
      margin-bottom: 15px;
    }
  }
  .price {
    color: ${themeGet('colors.headingColor', '#0f2137')};
    font-weight: 700;
    font-size: 26px;
    line-height: 1.3;
    letter-spacing: -0.55px;
    margin-bottom: 35px;
    text-align: center;
    @media screen and (max-width: 991px) {
      margin-bottom: 25px;
    }
    span {
      font-weight: 500;
      font-size: 17px;
      display: inline-block;
      margin-left: 2px;
    }
    @media screen and (max-width: 768px) {
      font-size: 22px;
      span {
        font-size: 16px;
      }
    }
  }
  .choosePlan {
    margin-top: 41px;
    border-radius: 5px;
    border: 2px solid ${rgba('#6C247E', 0.2)};
    color: ${themeGet('colors.primary', '#6C247E')};
    letter-spacing: -0.5px;
    background-color: ${themeGet('colors.white')};
    font-weight: 700;
    padding: 13px 30px;
    @media screen and (max-width: 991px) {
      padding: 11px 12px;
    }
    @media screen and (max-width: 480px) {
      margin-top: 15px;
    }
    &:hover {
      color: ${themeGet('colors.white')};
      border-color: ${themeGet('colors.primary', '#6C247E')};
      background-color: ${themeGet('colors.primary')};
    }
  }
  .trial {
    margin-top: 25px;
    font-size: 15px;
    color: ${rgba('#0f2137', 0.5)};
    padding: 0 15px;
  }
`;

export const ContentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${themeGet('colors.borderColorThree', '#EDF0F4')};
  padding-top: 40px;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
  @media only screen and (max-width: 624px) {
    padding: 50px 20px 0;
  }
  @media only screen and (max-width: 480px) {
    padding-left: 0;
    padding-right: 0;
  }
  h3 {
    font-weight: 700;
    font-size: 30px;
    line-height: 1.55;
    letter-spacing: -0.6px;
    max-width: 50%;
    margin-bottom: 0;
    @media only screen and (max-width: 1219px) {
      max-width: 60%;
    }
    @media only screen and (max-width: 991px) {
      font-size: 24px;
    }
    @media only screen and (max-width: 768px) {
      line-height: 1.35;
      margin-bottom: 15px;
      max-width: 100%;
    }
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 15px;
  @media only screen and (max-width: 768px) {
    margin-left: 0;
  }
  button {
    color: ${themeGet('colors.white')};
    margin: 15px 0;
    font-size: 15px;
    line-height: 1.2em;
    font-weight: 700;
    border-radius: 7px;
    padding: 18px 20px;
    letter-spacing: -0.2px;
    @media only screen and (max-width: 768px) {
      margin-bottom: 0;
    }
    &:hover {
      box-shadow: 0px 9px 20px -5px rgba(108, 36, 126, 0.57);
    }
  }
`;

export default SectionWrapper;
