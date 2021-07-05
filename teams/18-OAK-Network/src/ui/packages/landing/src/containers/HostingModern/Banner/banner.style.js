import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const BannerSection = styled.section``;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 50px 0 110px;
  @media only screen and (max-width: 1440px) {
    padding: 40px 0 70px;
  }
  @media only screen and (max-width: 1024px) {
    padding: 50px 0;
  }
  @media only screen and (max-width: 480px) {
    padding: 20px 0 50px;
  }
`;
export const BannerContent = styled.div`
  margin-right: 5%;
  width: 40%;
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    margin-right: 0;
    width: 100%;
  }
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
    margin-right: 50px;
    width: 50%;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    margin-right: 2%;
    width: 40%;
  }
  @media only screen and (max-width: 768px) {
    margin-right: 0;
    width: 100%;
  }
  h1 {
    font-size: 48px;
    line-height: 55px;
    @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
      font-size: 32px;
      line-height: 45px;
    }

    @media only screen and (max-width: 768px) {
      font-size: 24px;
      line-height: 40px;
      text-align: center;
    }
    @media only screen and (max-width: 480px) {
      font-size: 24px;
      line-height: 30px;
      text-align: center;
    }
  }
  p {
    line-height: 42px;
    margin-top: 20px;
    @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
      line-height: 32px;
    }
    @media only screen and (max-width: 768px) {
      line-height: 36px;
      margin-top: 10px;
      text-align: center;
      margin-bottom: 25px;
    }
  }
`;

export const DomainChecker = styled.div`
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    width: 90%;
  }
  .reusecore__input {
    width: 100%;
  }
  .field-wrapper input {
    min-height: 60px;
    padding: 12px 28px;
    border-color: ${themeGet('colors.border')};
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
      padding-top: 0;
      padding-bottom: 0;
      min-height: 45px;
    }
  }
  .reusecore__select {
    min-width: 90px;
  }
  .select__control {
    min-height: 60px;
    border-color: ${themeGet('colors.border')};
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow: none !important;
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
      min-height: 45px;
    }
    &:hover {
      border-color: ${themeGet('colors.border')};
    }
  }
  .select__single-value {
    color: ${themeGet('colors.textPrimary')};
    font-weight: 500;
  }
  button {
    margin-top: 20px;
    min-height: 60px;
    width: 100%;
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
      min-height: 45px;
    }
  }
`;

export const DomainControl = styled.div`
  display: flex;
  align-items: center;
`;

export const BannerImage = styled.figure`
  margin: 0;
  width: 55%;
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    display: none;
  }
  @media only screen and (min-device-width: 1024px) and (max-device-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
    display: block;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    display: block;
    width: 55%;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export default BannerSection;
