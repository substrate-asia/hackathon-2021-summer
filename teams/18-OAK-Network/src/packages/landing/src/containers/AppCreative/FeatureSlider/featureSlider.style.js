import styled, { keyframes } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { rgba } from 'polished';
import Mockup from 'common/assets/image/appCreative/feature/screenMockup.png';

const rotate360 = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SectionWrapper = styled.section`
  position: relative;
  padding-top: 90px;
  @media only screen and (max-width: 624px) {
    padding-top: 75px;
  }
  .container {
    @media only screen and (min-width: 1367px) {
      max-width: 1290px;
    }
  }
`;
export const FeatureContactWrapper = styled.div`
  position: relative;
  padding-bottom: 190px;
  padding-top: 60px;
  @media only screen and (max-width: 1219px) {
    padding-bottom: 90px;
    padding-top: 10px;
  }
  @media only screen and (max-width: 991px) {
    padding-top: 0px;
    padding-bottom: 85px;
  }
  @media only screen and (max-width: 624px) {
    padding-bottom: 65px;
  }
`;
export const ImageGalleryWrap = styled.div`
  position: absolute;
  height: 670px;
  width: 485px;
  bottom: 0;
  left: 52%;
  transform: translateX(-50%);
  @media only screen and (max-width: 1366px) {
    left: 50.5%;
  }
  @media only screen and (max-width: 1219px) {
    height: 510px;
    width: 370px;
  }
  @media only screen and (max-width: 991px) {
    display: none;
  }
  &::before {
    content: '';
    background-image: url(${Mockup});
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .swiper-container {
    width: 226px;
    cursor: pointer;
    position: relative;
    left: -33px;
    top: 11px;
    @media only screen and (max-width: 1219px) {
      width: 172px;
      left: -25px;
      top: 8px;
    }
    .swiper-slide img {
      width: 100%;
    }
  }
`;
export const FeatureItemWrapper = styled.div`
  .swiper-container {
    overflow: none;
    .swiper-wrapper {
      transform: none !important;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: -80px;
      @media only screen and (max-width: 1219px) {
        margin-bottom: -30px;
      }
      @media only screen and (max-width: 991px) {
        margin-bottom: -35px;
      }
      > .feature__outer {
        width: 50%;
        margin-bottom: 80px;
        @media only screen and (max-width: 1219px) {
          margin-bottom: 35px;
        }
        @media only screen and (max-width: 991px) {
          margin-bottom: 40px;
          width: calc(50% - 15px);
        }
        @media only screen and (max-width: 624px) {
          width: 100%;
        }
        &:nth-child(2n) {
          display: flex;
          justify-content: flex-end;
          @media only screen and (max-width: 991px) {
            display: block;
          }
        }
        &.swiper-slide-active .feature__block .icon__wrapper:before {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
  .feature__block {
    max-width: 350px;
    cursor: pointer;
    @media only screen and (max-width: 1219px) {
      max-width: 285px;
    }
    @media only screen and (max-width: 991px) {
      max-width: 100%;
    }
    @media only screen and (max-width: 768px) {
      text-align: center;
      flex-direction: column;
    }
    @media only screen and (max-width: 624px) {
      padding: 0 50px;
    }
    @media only screen and (max-width: 480px) {
      padding: 0 15px;
    }
    @media only screen and (max-width: 320px) {
      padding: 0;
    }
    .icon__wrapper {
      width: 40px;
      height: 40px;
      margin-right: 20px;
      flex-shrink: 0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${rgba('#6C247E', 0.1)};
      color: ${themeGet('colors.primary')};
      font-family: 'Work Sans', sans-serif;
      font-weight: 600;
      position: relative;
      @media only screen and (max-width: 1219px) {
        margin-right: 15px;
      }
      @media only screen and (max-width: 768px) {
        margin: 0 auto 15px !important;
        width: 55px;
        height: 55px;
        font-size: 20px;
      }
      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        border: 3px solid ${themeGet('colors.primary')};
        border-right-color: transparent;
        box-sizing: border-box;
        visibility: hidden;
        transition: all 0.3s;
        animation: ${rotate360} 4s linear infinite;
        opacity: 0;
      }
      @media only screen and (max-width: 768px) {
        margin-bottom: 15px;
        margin-right: 0px;
      }
      > span {
        margin-bottom: 0;
      }
    }

    h3 {
      margin: -3px 0 13px;
      font-weight: 700;
      font-size: 18px;
      line-height: 1.5;
      color: ${themeGet('colors.headingColor', '#0F2137')};
      @media only screen and (max-width: 768px) {
        line-height: 1.45;
        margin: 5px 0 15px;
      }
    }

    p {
      color: ${themeGet('colors.textColor')};
      font-size: 15px;
      line-height: 1.9;
      margin: 0;
    }
  }
`;
export default SectionWrapper;
