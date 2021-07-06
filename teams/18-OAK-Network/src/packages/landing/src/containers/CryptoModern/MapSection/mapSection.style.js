import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 81px 0;
  @media only screen and (max-width: 1440px) {
    padding: 70px 0;
  }
  @media only screen and (max-width: 1360px) {
    padding: 45px 0 50px;
  }
  @media only screen and (max-width: 991px) {
    padding: 40px 0;
  }
  @media only screen and (max-width: 480px) {
    padding: 40px 0 0;
  }
`;

export const SectionHeader = styled.header`
  text-align: center;
  margin-bottom: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media only screen and (max-width: 1440px) {
    margin-bottom: 70px;
  }
  @media only screen and (max-width: 991px) {
    margin-bottom: 54px;
  }
  @media only screen and (max-width: 480px) {
    margin-bottom: 0px;
  }

  h2 {
    color: ${themeGet('colors.white', 'fff')};
    font-size: 40px;
    line-height: 1.2;
    font-weight: 300;
    letter-spacing: -0.025em;
    margin-bottom: 27px;
    @media only screen and (max-width: 1440px) {
      margin-bottom: 15px;
    }
    @media only screen and (max-width: 768px) {
      font-size: 40px;
      max-width: 100%;
      text-align: center;
    }
    @media only screen and (max-width: 480px) {
      font-size: 30px;
    }
  }
  p {
    font-size: 16px;
    line-height: 28px;
    color: #496b96;
    max-width: 400px;
    @media only screen and (max-width: 768px) {
      max-width: 100%;
      text-align: center;
    }
  }
  .smallText {
    color: ${themeGet('colors.white', 'fff')};
    font-size: 18px;
    line-height: 28px;
    margin-top: 20px;
  }
  .countries {
    display: flex;
    justify-content: space-between;
    width: 430px;
    margin-top: 10px;
    @media only screen and (max-width: 480px) {
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .countriesSingle {
      display: flex;
      @media only screen and (max-width: 480px) {
        margin-bottom: 15px;
      }
      img {
        width: 24px;
        height: 24px;
      }
      p {
        font-size: 16px;
        line-height: 28px;
        color: #fff;
        margin: 0;
        padding: 0;
        margin-left: 15px;
      }
    }
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media only screen and (max-width: 480px) {
    display: none;
  }
  .countryIcon {
    position: absolute;
    height: 500px;
    width: 100%;
    .countryIconSingle {
      position: absolute;
      &::before {
        content: '';
        position: absolute;
        display: block;
        width: 40px;
        height: 40px;
        box-shadow: 0 0 0 0.8px #38c3c8;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        opacity: 0;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        animation: pulse 2.2s ease-out infinite;
        backface-visibility: hidden;
        pointer-events: none;
        z-index: 11;
      }
      &::after {
        content: '';
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        -webkit-transition: 0.25s ease-in-out;
        -webkit-transition: 0.25s ease-in-out;
        transition: 0.25s ease-in-out;
        z-index: 2;
      }
      &:nth-child(1) {
        top: 34%;
        position: absolute;
        left: 13%;
      }
      &:nth-child(2) {
        top: 20%;
        position: absolute;
        left: 19%;
      }
      &:nth-child(3) {
        position: absolute;
        bottom: 18%;
        left: 28%;
      }
      &:nth-child(4) {
        position: absolute;
        top: 2%;
        left: 38%;
        @media only screen and (max-width: 768px) {
          top: 40%;
        }
      }
      &:nth-child(5) {
        position: absolute;
        top: 30%;
        left: 60%;
      }
      &:nth-child(6) {
        position: absolute;
        top: 13%;
        right: 15%;
      }
      &:nth-child(7) {
        position: absolute;
        bottom: 20%;
        right: 11%;
      }
    }
  }
  @keyframes pulse {
    0% {
      transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
      opacity: 1;
    }

    100% {
      transform: translateX(-50%) translateY(-50%) translateZ(0) scale(2);
      opacity: 0;
    }
  }
`;

export default SectionWrapper;
