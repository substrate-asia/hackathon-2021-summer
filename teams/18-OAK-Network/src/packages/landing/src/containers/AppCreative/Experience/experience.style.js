import styled, { keyframes } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const slideShow = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const playPluse = keyframes`
  0% {
    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);
    opacity: 0;
  }
`;

const SectionWrapper = styled.section`
  width: 100%;
  padding-bottom: 70px;
  position: relative;
  @media only screen and (max-width: 991px) {
    padding-bottom: 60px;
  }
  @media only screen and (max-width: 624px) {
    padding-bottom: 45px;
  }
  &:before {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80.5%;
    background-color: ${themeGet('colors.light', '#FAF7FA')};
    content: '';
  }
  .container {
    @media only screen and (min-width: 1367px) {
      max-width: 1290px;
    }
  }
`;
export const ExperienceMainWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 30px;
  padding-top: 10px;
  position: relative;
  @media only screen and (max-width: 991px) {
    padding-top: 0px;
    padding-bottom: 15px;
  }
`;
export const VideoArea = styled.div`
  display: inline-flex;
  position: relative;
  margin: 0 auto 60px;
  img {
    max-width: 100%;
    object-fit: cover;
    cursor: pointer;
    height: 100%;
    border-radius: 10px;
  }
  .video__btn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    display: inline-block;
    z-index: 0;
    padding: 0;
    background-color: transparent;
    @media only screen and (max-width: 480px) {
      width: 60px;
      height: 60px;
      line-height: 60px;
    }
    &:before {
      content: '';
      position: absolute;
      z-index: 0;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      display: block;
      width: 80px;
      height: 80px;
      background: ${themeGet('colors.white', '#925B9F')};
      border-radius: 50%;
      animation: ${playPluse} 1.5s ease-out infinite;
    }
    > span {
      color: white;
      position: relative;
      z-index: 5;
      background-color: ${themeGet('colors.primaryLight', '#925B9F')};
      display: block;
      border-radius: inherit;
      height: 100%;
      width: 100%;
      svg {
        width: 50px;
        height: 50px;
        @media only screen and (max-width: 480px) {
          width: 35px;
          height: 35px;
        }
      }
    }
  }
`;
export const VideoWrapper = styled.div`
  max-width: 100%;
  position: relative;
  width: 900px;
  &:before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }
  iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const ClientWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  @media only screen and (max-width: 624px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media only screen and (max-width: 480px) {
    padding-left: 0px;
    padding-right: 0px;
  }
  .client__text {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      position: absolute;
      content: '';
      height: 1px;
      width: 100%;
      background-color: ${themeGet('colors.borderColorTwo', '#EAE9F2')};
      top: 50%;
      left: 0;
    }
    span {
      position: relative;
      font-size: 16px;
      background-color: ${themeGet('colors.light', '#FAF7FA')};
      margin-bottom: 0;
      z-index: 2;
      padding: 0 30px;
      line-height: 1.8;
      text-align: center;
      color: ${themeGet('colors.secondary', '#696871')};
      @media only screen and (max-width: 768px) {
        padding: 0 15px;
      }
    }
  }
`;
export const ExperienceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 15px;
  @media only screen and (max-width: 991px) {
    padding: 0;
  }
  .experience__item {
    display: flex;
    align-items: flex-start;
    padding: 0px 70px;
    width: 50%;
    margin: 0 0 40px;
    @media only screen and (max-width: 1366px) {
      padding: 0px 40px;
    }
    @media only screen and (max-width: 1219px) {
      padding: 0px 15px;
    }
    @media only screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0px 15px;
    }
    @media only screen and (max-width: 624px) {
      padding: 0px 50px;
      width: 100%;
    }
    @media only screen and (max-width: 480px) {
      padding: 0px 20px;
    }
    .icon__wrapper {
      margin-right: 20px;
      flex-shrink: 0;
      @media only screen and (max-width: 768px) {
        margin-bottom: 15px;
        margin-right: 0px;
      }
    }

    h4 {
      margin: -3px 0 18px;
      font-weight: 700;
      font-size: 18px;
      line-height: 1.6;
      color: ${themeGet('colors.headingColor', '#0F2137')};
      @media only screen and (max-width: 768px) {
        text-align: center;
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

export const ImageSlider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding: 57px 0px 25px;
  width: calc(100% - 60px);
  @media only screen and (max-width: 991px) {
    padding-top: 65px;
  }
  @media only screen and (max-width: 624px) {
    padding-top: 45px;
  }
  &::before,
  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 100%;
    position: absolute;
    top: 0;
    background: linear-gradient(to right, #faf7fa, rgba(255, 255, 255, 0));
    z-index: 1;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
    transform: rotateZ(180deg);
  }
`;

export const ImageSlide = styled.div`
  height: 40px;
  flex-shrink: 0;
  animation: ${slideShow} 20s linear infinite;
  a {
    margin: 0 35px;
    transition: all 0.3s ease;
    opacity: 0.6;
    @media only screen and (max-width: 991px) {
      margin: 0 20px;
    }
    @media only screen and (max-width: 624px) {
      margin: 0 5px;
    }
    img {
      @media only screen and (max-width: 1360px) {
        max-width: 90%;
      }
      @media only screen and (max-width: 991px) {
        max-width: 80%;
      }
    }

    &:hover {
      opacity: 1;
    }
  }
`;

export default SectionWrapper;
