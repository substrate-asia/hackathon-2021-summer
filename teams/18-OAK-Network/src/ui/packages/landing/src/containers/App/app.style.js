import styled, { createGlobalStyle } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import Substract from 'common/assets/image/app/substract.png';
import SubstractHover from 'common/assets/image/app/substract-hover.png';
import BannerPattern from 'common/assets/image/app/pattern.png';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Open Sans', sans-serif;
  }

  section{
    position: relative;
  }

    .drawer {
      .drawer-content-wrapper {
        @media only screen and (max-width: 480px) {
          width: 320px !important;
        }
        .reusecore-drawer__close {
          position: absolute;
          top: 20px;
          right: 30px;
          > button {
            box-shadow: 0px 8px 38px 0px rgba(16, 172, 132, 0.5);
            transition: all 0.3s ease;
            svg {
              width: 22px;
              height: 22px;
            }
            &:hover {
              opacity: 0.9;
            }
          }
        }
        .scrollspy__menu {
          padding: 60px 71px;

          li {
            margin: 35px 0;
            a {
              display: block;
              color: #20201d;
              font-size: 24px;
              font-weight: 400;
              transition: all 0.3s ease;
              @media only screen and (max-width: 480px) {
                font-size: 21px;
              }
              &:hover {
                color: #1a73e8;
              }
            }
            &.is-current {
              a {
                color: #1a73e8;
                position: relative;
                &:before {
                  content: '';
                  display: block;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background-color: #1a73e8;
                  position: absolute;
                  top: calc(50% - 8px / 2);
                  left: -20px;
                }
              }
            }
          }
        }
      }
    }

    /* Modal default style */

    button.modalCloseBtn {
      position: fixed !important;
      z-index: 999991 !important;
      background-color: transparent !important;
      color: ${themeGet('colors.white', '#ffffff')} !important;
      top: 10px !important;
      right: 10px !important;

      @media(max-width: 460px){
        top: 0 !important;
        right: 0 !important;
      }

      span.btn-icon {
        font-size: 24px !important;
        transform: rotate(45deg) !important;
      }

      &.alt {
        background-color: ${themeGet('colors.primary', '#1a73e8')} !important;
        border-radius: 50% !important;
        z-index: 999999 !important;
        padding: 0 !important;
        box-shadow: 0 8px 38px rgba(26, 115, 232, 0.5) !important;
        transition: all 0.3s ease !important;
        top: 25px !important;
        right: 30px !important;
        span.btn-icon {
          font-size: 20px !important;
        }
        &:hover {
          opacity: 0.88 !important;
        }
      }
    }

    .reuseModalHolder {
      border: 0 !important;
      background-color: transparent !important;

      &.search-modal,
      &.video-modal {
        background-color: rgba(255, 255, 255, 0.96) !important;
        overflow-y: auto !important;

        .innerRndComponent {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;

          iframe {
            max-width: 700px !important;
            max-height: 380px !important;
            width: 100% !important;
            height: 100% !important;
            border-radius: 5px !important;
          }
        }
      }

      &.demo_switcher_modal {
        border: 0 !important;
        background-color: rgba(16, 30, 77, 0.8) !important;
        .innerRndComponent {
          border-radius: 8px !important;
        }
      }

      &.video-modal {
        background-color: transparent !important;
      }

      .innerRndComponent {
        padding-right: 0 !important;
      }
    }

    .reuseModalCloseBtn {
      cursor: pointer !important;
    }

    .reuseModalOverlay,
    .reuseModalParentWrapper{
      z-index: 99999!important;
    }

    .reuseModalHolder.login-modal{
      @media (min-width: 768px) {
        top: 0!important;
        left: 0!important;
        max-width: 100%!important;
        max-height: 100%!important;
      }
    }

    .reuseModalHolder.search-modal{
      top: 0!important;
      left: 0!important;
      max-width: 100%!important;
      max-height: 100%!important;
      width: 100%;
      height: 100%;
    }

    .reuseModalHolder.login-modal .innerRndComponent{
      overflow-y: auto;
    }
`;

const AppWrapper = styled.div`
  position: relative;
  overflow: hidden;
  @media (max-width: 1099px) {
    overflow: hidden;
  }
  .button__wrapper {
    @media only screen and (max-width: 480px) {
      text-align: center;
    }
  }

  .reusecore__navbar {
    width: 100%;
    left: 0;
    top: 0;
    transition: all 0.3s ease;

    .reusecore__button {
      .btn-icon {
        color: ${themeGet('colors.white', '#ffffff')};
        font-size: 18px;
        @media only screen and (max-width: 1100px) {
          color: ${themeGet('colors.primary', '#1a73e8')};
        }
        @media only screen and (max-width: 420px) {
          font-size: 14px;
        }
      }
      &:hover {
        background: transparent;
        box-shadow: none;
      }
    }
    .button__wrapper {
      @media only screen and (max-width: 480px) {
        text-align: center;
      }
    }
    .hamburgMenu__bar {
      margin-left: 8px;
      @media only screen and (max-width: 420px) {
        width: 40px;
      }
      > span {
        background-color: ${themeGet('colors.white', '#ffffff')};
        @media only screen and (max-width: 990px) {
          background-color: ${themeGet('colors.primary', '#1a73e8')};
        }
      }
    }
  }
  .sticky-nav-active {
    .reusecore__navbar {
      background-color: ${themeGet('colors.white', '#ffffff')};
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      padding: 5px 15px;
      transition: all 0.2s ease;
      @media (max-width: 1100px) {
        padding: 10px 15px 10px;
      }
      @media (max-width: 991px) {
        padding: 10px 15px 10px;
      }
      @media (max-width: 767px) {
        padding: 20px 15px 10px;
      }
      @media (max-width: 480px) {
        padding: 5px 15px;
      }

      .reusecore__button {
        .btn-icon {
          color: ${themeGet('colors.primary', '#1a73e8')};
        }
      }
      .hamburgMenu__bar > span {
        background-color: ${themeGet('colors.primary', '#1a73e8')};
      }
    }
  }

  .particle {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    @media (max-width: 990px) {
      display: none;
    }
  }
  .reusecore__button {
    transition: all 0.3s ease;
    cursor: pointer;
    .btn-icon {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      color: rgb(26, 115, 232);
      width: 35px;
    }
    &:hover {
      box-shadow: 0px 9px 20px -5px rgba(26, 115, 232, 0.57);
      background-color: rgb(26, 115, 232);
      cursor: pointer;
    }
    &.withoutBg {
      @media (max-width: 460px) {
        margin-top: 20px;
        margin-left: 0;
        border: 1px solid #1a73e8;
        min-width: auto;
      }
      &:hover {
        opacity: 0.85;
        background-color: rgb(255, 255, 255) !important;
        cursor: pointer;
        box-shadow: none !important;
      }
    }
  }
  .control-sec-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;

    @media (max-width: 767px) {
      position: relative;
      top: 0%;
      left: 0%;
      transform: none;
      display: none;
    }
    .particle {
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      left: 0;
      overflow: hidden;
    }
    &.payment {
      .particle {
        z-index: -1;
      }
    }
  }

  .testimonialSlider {
    .image-gallery-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      @media (max-width: 767px) {
        flex-direction: column;
      }
      .image-gallery-slide-wrapper {
        max-width: 60%;
        width: 60%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column-reverse;
        @media screen and (max-width: 1100px) and (min-width: 992px) {
          max-width: 56%;
          width: 56%;
        }
        @media (max-width: 991px) {
          max-width: 50%;
          width: 50%;
        }
        @media (max-width: 767px) {
          max-width: 100%;
          width: 100%;
        }
        > span {
          display: flex;
          @media (max-width: 480px) {
            justify-content: center;
          }
          .image-gallery-left-nav,
          .image-gallery-right-nav {
            position: relative;
            top: 0;
            transform: none;
            margin-top: 0;
          }
          .image-gallery-left-nav {
          }
          .image-gallery-right-nav {
            margin-left: 10px;
          }
        }
        .image-gallery-swipe {
          .image-gallery-slide {
            .image-gallery-description {
              background: transparent;
              bottom: 0px;
              color: #000;
              position: relative;
              text-align: left;
              .testimonialDes {
                box-sizing: border-box;
                margin-top: -10px;
                max-width: 550px;
                font-size: 36px;
                line-height: 50px;
                color: #0f2137;
                font-weight: 300;
                -webkit-letter-spacing: -0.01em;
                -moz-letter-spacing: -0.01em;
                -ms-letter-spacing: -0.01em;
                letter-spacing: -0.01em;
                @media (max-width: 991px) {
                  font-size: 30px;
                  line-height: 40px;
                  max-width: 100%;
                }
                @media (max-width: 768px) {
                  font-size: 24px;
                  line-height: 36px;
                }
                @media (max-width: 480px) {
                  font-size: 20px;
                  text-align: center;
                }
                &::before {
                  content: 'CUSTOMER OPINIONS';
                  box-sizing: border-box;
                  margin-bottom: 10px;
                  margin-top: 0px;
                  font-size: 14px;
                  color: #1a73e8;
                  display: block;
                  font-weight: 700;
                  text-align: left;
                  -webkit-letter-spacing: 0.11em;
                  -moz-letter-spacing: 0.11em;
                  -ms-letter-spacing: 0.11em;
                  letter-spacing: 0.11em;
                  @media (max-width: 480px) {
                    text-align: center;
                  }
                }
              }
              .testimonialDetails {
                text-align: left;
                @media (max-width: 480px) {
                  text-align: center;
                }
                .testimonialName {
                  font-size: 18px;
                  line-height: 33px;
                  color: #343d48;
                  font-weight: 700;
                  margin-bottom: -3px;
                }
                .testimonialDesignation {
                  text-align: left;
                  font-size: 16px;
                  line-height: 33px;
                  color: #343d48;
                  font-weight: 400;
                  opacity: 0.8;
                }
              }
            }
          }
        }
        .image-gallery-left-nav {
          padding: 0;
          font-size: 0;
          width: 15px;
          height: 2px;
          transition: width 0.25s ease-in-out;
          background-image: url(${SubstractHover});
          width: 30px;
          height: 30px;
          background-repeat-x: repeat;
          background-position: center;
          background-size: contain;
          position: relative;
          top: -25px;
          left: 0px;
          transform: none;
          .image-gallery-svg {
            display: none;
          }
          /* &:hover {
            width: 35px;
            background-image: url(${SubstractHover});
            &::before {
              background-color: #1a73e8;
            }
            &::after {
              background-color: #1a73e8;
            }
          } */

          &::before {
            top: 11px;
            content: '';
            width: 10px;
            height: 2px;
            background-color: #1a73e8;
            display: block;
            position: absolute;
            transform: rotate(-36deg);
            transition: inherit;
            left: 0;
          }
          &::after {
            content: '';
            width: 10px;
            height: 2px;
            background-color: #1a73e8;
            display: block;
            position: absolute;
            bottom: 11px;
            transform: rotate(36deg);
            transition: inherit;
            left: 0;
          }
        }
        .image-gallery-right-nav {
          padding: 0;
          font-size: 0;
          margin-top: -15px;
          width: 15px;
          height: 2px;
          transition: all 0.25s ease-in-out;
          background-image: url(${SubstractHover});
          width: 30px;
          height: 30px;
          background-repeat-x: repeat;
          background-position: center;
          background-size: contain;
          position: relative;
          top: 5px;
          left: 40px;
          transform: none;
          .image-gallery-svg {
            display: none;
          }
          &:hover {
            &::before {
              background-color: #1a73e8;
            }
            &::after {
              background-color: #1a73e8;
            }
          }

          &::before {
            top: 11px;
            content: '';
            width: 10px;
            height: 2px;
            background-color: #1a73e8;
            display: block;
            position: absolute;
            transform: rotate(36deg);
            transition: inherit;
            left: 20px;
          }
          &::after {
            content: '';
            width: 10px;
            height: 2px;
            background-color: #1a73e8;
            display: block;
            position: absolute;
            bottom: 11px;
            transform: rotate(-36deg);
            transition: inherit;
            left: 20px;
          }
        }
      }
      .image-gallery-thumbnails-wrapper {
        max-width: 40%;
        height: 520px;
        width: 40%;

        @media screen and (max-width: 1100px) and (min-width: 992px) {
          padding-left: 25px;
          overflow: hidden;
        }
        @media (max-width: 991px) {
          padding-left: 0px;
          overflow: hidden;
          max-width: 50%;
          width: 50%;
        }
        @media (max-width: 767px) {
          max-width: 100%;
          width: 100%;
          height: auto;
          margin-top: 50px;
          overflow: hidden;
        }
        .image-gallery-thumbnails {
          overflow: initial;
          padding-left: 30px;
          @media (max-width: 991px) {
            padding-left: 0px;
          }
          @media (max-width: 767px) {
            overflow: hidden;
          }
        }
        .image-gallery-thumbnails-container {
          position: relative;
          height: 520px;
          @media screen and (max-width: 1100px) and (min-width: 992px) {
            margin-left: -20px;
            margin-top: 15px;
          }
          @media (max-width: 991px) {
            margin-left: -25px;
          }
          @media (max-width: 767px) {
            height: auto;
            margin-left: 0px;
          }
          img {
            border-radius: 50%;
            height: 100%;
            width: 100%;

            @media (max-width: 768px) {
              box-shadow: none;
            }
            @media (max-width: 991px) {
              width: 70px;
              height: 70px;
            }
            @media (max-width: 480px) {
              width: 70px;
              height: 70px;
            }
          }

          .image-gallery-thumbnail:nth-child(1) {
            position: absolute;
            top: 150px;
            left: 0;
            width: 120px;
            height: 120px;
            @media (max-width: 991px) {
              position: absolute;
              top: 220px;
              left: 80px;
              width: 120px;
              height: 120px;
              img {
                width: 80px;
                height: 80px;
              }
            }
            @media (max-width: 767px) {
              position: relative;
              top: 0;
              left: 0;
              width: calc(33.33% - 30px);
              height: auto;
              margin-right: 30px;
              margin-left: 10px;
            }
            img {
            }
          }
          .image-gallery-thumbnail:nth-child(2) {
            position: absolute;
            top: 0;
            left: 180px;
            width: 100px;
            height: 100px;
            @media (max-width: 991px) {
              position: absolute;
              top: 110px;
              left: 160px;
              width: 100px;
              height: 100px;
            }
            @media (max-width: 767px) {
              position: relative;
              top: 0;
              width: calc(33.33% - 30px);
              height: auto;
              margin-right: 30px;
              left: 0;
            }
          }
          .image-gallery-thumbnail:nth-child(3) {
            position: absolute;
            top: 160px;
            left: 250px;
            width: 70px;
            height: 70px;
            @media screen and (max-width: 1100px) and (min-width: 992px) {
              position: absolute;
              top: 180px;
              left: 220px;
              width: 70px;
              height: 70px;
            }
            @media (max-width: 991px) {
              position: absolute;
              top: 200px;
              left: 272px;
              width: 70px;
              height: 70px;
            }
            @media (max-width: 767px) {
              position: relative;
              top: 0;
              width: calc(33.33% - 30px);
              height: auto;
              margin-right: 30px;
              left: 0;
            }
          }
          .image-gallery-thumbnail:nth-child(4) {
            position: absolute;
            bottom: 100px;
            left: 200px;
            width: 90px;
            height: 90px;
            @media (max-width: 991px) {
              position: absolute;
              bottom: 100px;
              left: 240px;
              width: 90px;
              height: 90px;
            }
            @media (max-width: 767px) {
              position: relative;
              top: 0;
              width: calc(33.33% - 30px);
              height: auto;
              margin-right: 30px;
              left: 0;
            }
          }
          .image-gallery-thumbnail:nth-child(5) {
            position: absolute;
            bottom: 20px;
            left: 20px;
            width: 105px;
            height: 105px;
            @media screen and (max-width: 1100px) and (min-width: 992px) {
              position: absolute;
              bottom: 50px;
              left: 20px;
              width: 105px;
              height: 105px;
            }
            @media (max-width: 991px) {
              position: absolute;
              bottom: 40px;
              left: 115px;
              width: 105px;
              height: 105px;
            }
            @media (max-width: 767px) {
              position: relative;
              top: 0;
              width: calc(33.33% - 30px);
              height: auto;
              margin-right: 30px;
              left: 0;
            }
          }
          .image-gallery-thumbnail {
            transition: all 0.35s ease;
            border: 0;
            border-radius: 50%;
            .image-gallery-thumbnail-inner {
              width: 100%;
              height: 100%;
            }
            &.active {
              border: 0;
              transform: scale(1.3);
              box-shadow: 0px 18px 68px 0px rgba(22, 30, 54, 0.25);
              @media (max-width: 1100px) {
                box-shadow: none;
              }
              .image-gallery-thumbnail-inner {
                @keyframes pulse {
                  0% {
                    transform: translateX(-50%) translateY(-50%) translateZ(0)
                      scale(1);
                    opacity: 1;
                  }

                  100% {
                    transform: translateX(-50%) translateY(-50%) translateZ(0)
                      scale(1.5);
                    opacity: 0;
                  }
                }
                @media (max-width: 991px) {
                  @keyframes pulse {
                    0% {
                      transform: translateX(-50%) translateY(-50%) translateZ(0)
                        scale(1);
                      opacity: 0;
                    }

                    100% {
                      transform: translateX(-50%) translateY(-50%) translateZ(0)
                        scale(1.2);
                      opacity: 0;
                    }
                  }
                }
                &::before {
                  content: '';
                  position: absolute;
                  display: block;
                  width: 100%;
                  height: 100%;
                  box-shadow: 0 0 0 0.8px rgba(0, 0, 0, 0.1);
                  border-radius: 50%;
                  top: 50%;
                  left: 50%;
                  opacity: 0;
                  -webkit-transform: translate(-50%, -50%);
                  transform: translate(-50%, -50%);
                  animation: pulse 2.2s ease-out infinite;
                  backface-visibility: hidden;
                  pointer-events: none;
                }
                &::after {
                  content: '';
                  position: absolute;
                  display: block;
                  width: 100%;
                  height: 100%;
                  box-shadow: 0 0 0 0.8px rgba(0, 0, 0, 0.1);
                  border-radius: 50%;
                  top: 50%;
                  left: 50%;
                  opacity: 0;
                  -webkit-transform: translate(-50%, -50%);
                  transform: translate(-50%, -50%);
                  animation: pulse 2.2s ease-out infinite;
                  backface-visibility: hidden;
                  pointer-events: none;
                  animation-delay: 1s;
                }
              }
              img {
                position: relative;
                @media (max-width: 768px) {
                  margin: 10px 0;
                }
              }
            }
          }
        }
      }
    }
  }
  .cardExtraImage {
    @media screen and (max-width: 1440px) and (min-width: 1100px) {
      margin-left: -270px;
      margin-top: 50px;
    }
  }
`;

const BannerSquareShape = styled.div`
  width: 980px;
  height: 1110px;
  background: #1a73e8;
  border-radius: 50px;
  -webkit-transform: rotate(105deg);
  -ms-transform: rotate(105deg);
  transform: rotate(107deg);
  position: absolute;
  left: 58%;
  top: -28%;
  z-index: -1;
  pointer-events: none;
  background-image: url(${BannerPattern});
  @media (max-width: 1300px) {
    width: 870px;
    height: 1000px;
    transform: rotate(103deg);
    position: absolute;
    left: 64%;
  }
  @media (max-width: 1100px) {
    display: none;
  }
`;
const BannerCircleShape = styled.div`
  width: 500px;
  height: 500px;
  background: #ffc845;
  border-radius: 50%;
  position: absolute;
  left: 55%;
  top: 47%;
  z-index: -1;
  transform: translateY(-50%);
  pointer-events: none;
  @media (max-width: 1300px) {
    width: 400px;
    height: 400px;
    left: 63%;
  }
  @media (max-width: 1100px) {
    width: 400px;
    height: 400px;
    left: 60%;
  }
  @media (max-width: 991px) {
    width: 345px;
    height: 345px;
    left: 54%;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
const PaymentCircleShape = styled.div`
  width: 700px;
  height: 700px;
  background: #ffc845;
  border-radius: 50%;
  position: absolute;
  left: 5%;
  top: 47%;
  z-index: -1;
  transform: translateY(-50%);
  pointer-events: none;
  @media (max-width: 1440px) {
    width: 550px;
    height: 550px;
  }
  @media (max-width: 1100px) {
    width: 450px;
    height: 450px;
  }
  @media (max-width: 991px) {
    width: 350px;
    height: 350px;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
const ConditionWrapper = styled.div`
  position: relative;
`;

export {
  GlobalStyle,
  AppWrapper,
  BannerSquareShape,
  BannerCircleShape,
  PaymentCircleShape,
  ConditionWrapper,
};
