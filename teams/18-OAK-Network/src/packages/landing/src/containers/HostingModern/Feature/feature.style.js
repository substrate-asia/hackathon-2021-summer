import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const FeatureWrapper = styled.section`
  /* background: url(${iPad}) no-repeat center left / 46%; */
  position: relative;
  padding: 0 0 70px;
  @media only screen and (max-width: 480px) {
    padding: 0 0 50px;
  }
`;

export const Ipad = styled.figure`
  margin: 0;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50%;
  left: -80px;
  width: 65%;
  @media only screen and (max-width: 1800px) {
    left: -200px;
    width: 63%;
  }
  @media only screen and (max-width: 1440px) {
    left: -190px;
    width: 63%;
  }
  @media only screen and (max-width: 1300px) {
    left: -225px;
    width: 69%;
  }
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
    display: none;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const FeatureContent = styled.section`
  margin-left: 55%;
  width: 45%;
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
    width: 100%;
    margin-left: 0;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    margin-left: 0;
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
  h4 {
    @media only screen and (max-width: 1024px) {
      text-align: center;
    }
  }
  h2 {
    font-weight: 500;
    font-size: 40px;
    line-height: 60px;
    letter-spacing: -1.5px;
    @media only screen and (max-width: 1366px) and (max-height: 768px) {
      font-size: 32px;
      line-height: 45px;
    }
    @media only screen and (max-width: 1024px) {
      font-size: 30px;
      text-align: center;
    }
    @media only screen and (max-width: 768px) {
      font-size: 24px;
      line-height: 40px;
      text-align: center;
      font-weight: 700;
      margin-top: 7px;
    }
    @media only screen and (max-width: 767px) {
      font-size: 24px;
      line-height: 40px;
      margin-top: 10px;
    }
  }
`;

export const Content = styled.section`
  .caption {
    font-size: 16px;
    line-height: 35px;
    @media only screen and (max-width: 1024px) {
      text-align: center;
      margin-bottom: 50px;
      margin-top: -15px;
    }
    @media only screen and (max-width: 480px) {
      margin-top: 0px;
    }
  }

  [data-reach-accordion-item] {
    border-top: 0;
    margin-top: 20px;
    background: #f6f8fb;
    border-radius: 10px;
    padding: 25px 32px;
    @media only screen and (max-width: 1024px) {
      padding: 35px 32px;
    }
    @media only screen and (max-width: 480px) {
      padding: 25px 25px;
    }
    button {
      background: none;
      border: 0;
      cursor: pointer;
      font-weight: 500;
      font-size: 16px;
      line-height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0;
      width: 100%;
      i {
        transform: rotate(0deg);
        transition: all 0.3s ease 0s;
      }
      &[aria-expanded='true'] {
        i {
          transform: rotate(90deg);
        }
      }
      @media only screen and (max-width: 767px) {
        align-items: baseline;
        text-align: left;
      }
    }
    [data-reach-accordion-panel] {
      color: ${themeGet('colors.text')};
      font-size: 15px;
      line-height: 32px;
      margin: 1rem 0 0 0;
      transition: 0.3s ease 0s;
      animation: slideDown 0.4s ease;
    }
  }

  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default FeatureWrapper;
