import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { rgba, lighten } from 'polished';

const Section = styled.section`
  padding: 70px 0 90px;
  @media screen and (max-width: 1440px) {
    padding: 20px 0 40px;
  }
  @media screen and (max-width: 480px) {
    padding: 50px 0;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
`;

export const PricingFeature = styled.ul`
  min-width: 183px;
  margin-top: -25px;
  @media screen and (max-width: 1024px) {
    min-width: 156px;
  }
`;
export const FeatureItem = styled.li`
  border-bottom: 1px solid ${themeGet('colors.border')};
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: ${themeGet('colors.text')};
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:last-child {
    border-bottom: 0;
  }
`;

export const PriceTable = styled.div`
  background: #ffffff;
  border: 1px solid ${themeGet('colors.border')};
  border-radius: 10px;
  margin-right: 10px;
  padding: 25px 0;
  text-align: center;
  transition: 0.3s ease 0s;
  position: relative;
  margin: 0 3px;
  width: calc(20.87% - 7.5px);
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
    border-color: #fff;
    box-shadow: 0px 15px 50px rgba(91, 132, 193, 0.1);
    @media screen and (max-width: 480px) {
      margin-top: 33px;
    }
  }
  .recommended {
    background-color: #52acff;
    color: #fff;
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
    border-radius: 5px 5px 0 0;
  }
  .title {
    color: ${rgba('#0f2137', 0.5)};
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    margin-bottom: 15px;
  }
  .price {
    color: #0f2137;
    font-weight: 700;
    font-size: 26px;
    line-height: 34px;
    letter-spacing: -0.55px;
    margin-bottom: 30px;
    text-align: center;
    span {
      font-weight: 400;
      font-size: 18px;
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
    background-color: #ffc059;
    @media screen and (max-width: 480px) {
      margin-top: 15px;
    }
  }
  .primaryOutlined {
    background-color: ${themeGet('colors.white')};
    /* border: 2px solid ${lighten(0.5, themeGet('colors.primary'))}; */
    color: #ffc059;
  }
  .trial {
    margin: 20px 0 0;
  }
`;

export default Section;
