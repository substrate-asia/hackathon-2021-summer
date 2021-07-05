import styled from 'styled-components';
import { rgba } from 'polished';
import { themeGet } from '@styled-system/theme-get';
import illustration from 'common/assets/image/donation/banner/illustration.png';

const Section = styled.section`
  background-color: #f6ebe6;
  position: relative;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  position: relative;
  z-index: 0;
  @media only screen and (max-width: 1024px) {
    min-height: 50vh;
  }
  @media only screen and (max-width: 768px) {
    min-height: 60vh;
  }
  @media only screen and (max-width: 767px) {
    min-height: 80vh;
  }
  @media only screen and (max-width: 360px) {
    min-height: 100vh;
  }
  &::before {
    background: transparent url(${illustration}) no-repeat right top / contain;
    bottom: 0;
    content: '';
    height: 92%;
    position: absolute;
    width: 100%;
    z-index: -1;
    @media only screen and (max-width: 1440px) {
      height: 88%;
    }
    @media only screen and (max-width: 1024px) {
      background: none;
    }
  }
  &::after {
    position: absolute;
    background-color: #fff;
    bottom: 0;
    content: '';
    height: 117px;
    width: 100%;
    z-index: -2;
    @media only screen and (max-width: 1440px) {
      height: 77px;
    }
    @media only screen and (max-width: 1024px) {
      content: none;
    }
  }
`;

export const BannerContent = styled.div`
  margin-bottom: 100px;
  max-width: 490px;
  width: 100%;
  @media only screen and (max-width: 1440px) {
    margin-bottom: 10px;
  }
  @media only screen and (max-width: 1024px) {
    margin: 0 auto;
    max-width: 700px;
    text-align: center;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 25px;
  }
  h1 {
    font-size: 54px;
    line-height: 1.3;
    font-weight: 700;
    color: ${themeGet('colors.textPrimary')};
    margin-bottom: 24px;
    letter-spacing: -1px;
    margin-top: 0;
    @media only screen and (max-width: 1366px) {
      font-size: 38px;
    }
    @media only screen and (max-width: 767px) {
      font-size: 28px;
      line-height: 1.5;
    }
  }
  .banner-caption {
    color: ${themeGet('colors.textPrimary')};
    font-size: 18px;
    line-height: 2.33;
    font-weight: 400;
    margin-bottom: 50px;
    @media only screen and (max-width: 1366px) {
      font-size: 16px;
      margin-bottom: 30px;
    }
  }
`;

export const Illustration = styled.div`
  position: absolute;
`;

export const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 40px;
  @media only screen and (max-width: 1024px) {
    justify-content: center;
  }
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }

  button {
    border-radius: 7px;
    font-weight: 700;
    line-height: 1.31;
    min-height: 60px;
    padding: 0 35px;
    @media only screen and (max-width: 1366px) {
      min-height: 50px;
      padding: 0 25px;
    }
    @media only screen and (max-width: 767px) {
      font-size: 15px;
      padding: 0 23px;
    }
  }
  .button-white {
    background-color: #fff;
    color: ${themeGet('colors.textPrimary')};
    margin-left: 21px;
    @media only screen and (max-width: 480px) {
      margin-left: 0px;
      margin-top: 15px;
    }
  }
`;

export const TrustedBy = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1024px) {
    justify-content: center;
  }
  @media only screen and (max-width: 767px) {
    display: block;
    text-align: left;
  }
  p {
    margin: 0 20px 0 0;
    color: ${rgba('#566272', 0.7)};
    @media only screen and (max-width: 767px) {
      margin: 0 0 15px 0;
    }
  }
`;

export const ImageGroup = styled.div`
  display: flex;
  align-items: center;
  img {
    &:not(:last-child) {
      margin-right: 23px;
    }

    @media only screen and (max-width: 480px) {
      max-width: 27%;
    }
  }
`;

export default Section;
