import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { rgba } from 'polished';

const SectionWrapper = styled.section`
  padding: 60px 0 45px;
  background-color: ${themeGet('colors.primaryLight', '#925B9F')};
  @media only screen and (max-width: 991px) {
    padding: 85px 0 90px;
  }
  @media only screen and (max-width: 624px) {
    padding: 72px 0 75px;
  }
  > div.container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    @media only screen and (min-width: 1367px) {
      max-width: 1290px;
    }
  }
`;

export const ThumbWrapper = styled.div`
  width: calc(100% - 500px);
  display: flex;
  justify-content: flex-end;
  @media only screen and (max-width: 991px) {
    width: calc(100% - 380px);
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
  img {
    position: relative;
    right: -25px;
  }
`;

export const TextWrapper = styled.div`
  width: 500px;
  margin-top: -70px;
  @media only screen and (max-width: 1219px) {
    margin-top: 0;
  }
  @media only screen and (max-width: 991px) {
    width: 380px;
  }
  @media only screen and (max-width: 768px) {
    width: 550px;
  }
  @media only screen and (max-width: 624px) {
    width: 100%;
  }
  h2 {
    color: ${themeGet('colors.white')};
    font-size: 55px;
    line-height: 1.25;
    font-weight: 700;
    letter-spacing: -2px;
    margin-bottom: 20px;
    @media only screen and (max-width: 1219px) {
      font-size: 44px;
    }
    @media only screen and (max-width: 991px) {
      font-size: 32px;
    }
  }
  p {
    color: ${themeGet('colors.white')};
    font-size: 17px;
    line-height: 2;
    margin-bottom: 0;
    padding-right: 20px;
    @media only screen and (max-width: 991px) {
      font-size: 16px;
      line-height: 1.8;
    }
    @media only screen and (max-width: 480px) {
      padding-right: 0;
    }
  }
`;

export const Subscribe = styled.div`
  display: flex;
  margin-top: 40px;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
  button {
    background-color: ${themeGet('colors.white')};
    min-width: 120px;
    border-radius: 7px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 17px;
    color: #19191b;
    @media only screen and (max-width: 480px) {
      min-width: 100%;
      margin-top: 15px;
    }
    &:hover {
      color: ${themeGet('colors.primary')};
    }
  }
`;

export const SubscribeField = styled.div`
  border: 2px solid ${themeGet('colors.white')};
  border-radius: 5px;
  width: 325px;
  display: flex;
  align-items: center;
  padding-left: 22px;
  margin-right: 15px;
  @media only screen and (max-width: 991px) {
    padding-left: 12px;
    margin-right: 10px;
  }
  @media only screen and (max-width: 480px) {
    width: 100%;
    margin-right: 0;
  }
  .reusecore__input {
    width: 100%;
  }
  .select__control {
    border: 0px solid;
    background-color: transparent;
    box-shadow: 0 0 0;
    cursor: pointer;
    .select__value-container {
      width: 50px;
      padding: 0;
    }
    .select__placeholder,
    .select__single-value {
      font-size: 18px;
      font-weight: 700;
      color: ${themeGet('colors.white')};
    }
    .select__indicator-separator {
      display: none;
    }
    .select__indicators .select__indicator {
      padding: 0;
      .css-6q0nyr-Svg {
        fill: ${themeGet('colors.white')};
        height: 16px;
        margin-left: -10px;
      }
    }
  }
  .field-wrapper {
    input {
      font-size: 16px;
      min-height: 55px;
      padding: 0 25px 0 12px;
      border-radius: 8px;
      background-color: transparent;
      border: 0px solid;
      color: ${themeGet('colors.white')};
      font-family: 'DM Sans', sans-serif;
      ::placeholder {
        color: ${rgba('#ffffff', 0.8)};
        opacity: 1; /* Firefox */
      }
      &:focus {
        border-color: #ffffff;
      }

      @media only screen and (max-width: 1280px) {
        min-height: 50px;
      }
    }
  }
`;

export const BarCodeArea = styled.div`
  margin-top: 27px;
  .bar__code {
    color: ${themeGet('colors.white')};
    font-size: 17px;
    text-transform: none;
    .btn-text {
      padding-left: 20px;
    }
  }
`;

export default SectionWrapper;
