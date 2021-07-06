import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import twitterIcon from 'common/assets/image/interior/twitter.svg';

const SectionWrapper = styled.section`
  padding: 162px 0 200px;

  @media only screen and (max-width: 1440px) {
    padding: 120px 0 160px;
  }

  @media only screen and (max-width: 767px) {
    padding: 82px 0 41px;
  }

  header {
    text-align: left;
    padding-bottom: 60px;
    @media only screen and (max-width: 1440px) {
      padding-bottom: 56px;
    }
    @media only screen and (max-width: 991px) {
      padding-bottom: 40px;
    }
  }
`;

export const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;

  .glide {
    display: flex;
    align-items: center;

    @media only screen and (max-width: 991px) {
      /* width:  */
      flex-direction: column;
    }

    .slide__wrapper {
      width: calc(100% - 500px);
      border-radius: 30px;
      padding: 85px 90px 90px 70px;
      background-color: ${themeGet('colors.white', '#ffffff')};
      box-shadow: 1px 2px 80px rgba(244, 244, 253, 0.83);
      position: relative;
      @media only screen and (max-width: 1440px) {
        padding: 70px 60px;
      }
      @media only screen and (max-width: 1200px) {
        width: calc(100% - 450px);
        padding: 56px 50px;
      }
      @media only screen and (max-width: 991px) {
        width: 100%;
      }
      @media only screen and (max-width: 667px) {
        margin-right: 0;
        padding: 0;
        box-shadow: none;
      }
    }

    .testimonial_card {
      width: calc(100% - 500px);
      padding-right: 140px;
      @media only screen and (max-width: 1200px) {
        padding-right: 50px;
      }
      @media only screen and (max-width: 991px) {
        width: calc(100% - 80px);
      }
      @media only screen and (max-width: 767px) {
        width: 100%;
        padding-right: 0;
      }

      .user_info {
        background-image: url(${twitterIcon});
        background-repeat: no-repeat;
        background-size: 123px auto;
        background-position: center left;
        padding-left: 60px;
        margin-bottom: 50px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        @media only screen and (max-width: 1440px) {
          background-size: 100px auto;
          margin-bottom: 30px;
        }
        @media only screen and (max-width: 991px) {
          background-size: 90px auto;
          padding-left: 55px;
        }
        @media only screen and (max-width: 767px) {
          padding-left: 50px;
          margin-bottom: 20px;
        }

        h3 {
          margin: 0 0 5px;
        }

        p {
          margin: 0;
        }
      }

      .review {
        p {
          margin: 0;
        }
      }
    }

    .glide__arrows {
      position: absolute;
      top: 141px;
      right: 90px;
      @media only screen and (max-width: 1440px) {
        top: 130px;
        right: 70px;
      }
      @media only screen and (max-width: 1200px) {
        top: 115px;
        right: 50px;
      }
      @media only screen and (max-width: 991px) {
        position: initial;
        display: none;
      }

      > button {
        background-color: transparent;
        > span {
          &.next_arrow {
            width: 45px;
            background-color: ${themeGet('colors.link', '#352FD9')};

            &::before {
              background-color: ${themeGet('colors.link', '#352FD9')};
              transform: rotate(42deg) !important;
            }

            &::after {
              transform: rotate(-42deg) !important;
              background-color: ${themeGet('colors.link', '#352FD9')};
            }
          }
        }

        &:hover {
          > span {
            background-color: ${themeGet('colors.link', '#352FD9')};

            &::before,
            &::after {
              background-color: ${themeGet('colors.link', '#352FD9')};
            }
          }
        }
      }
    }

    .glide__bullets {
      width: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      height: 450px;
      position: relative;
      margin-left: 130px;
      @media only screen and (max-width: 1440px) {
        margin-left: 80px;
        height: 420px;
      }
      @media only screen and (max-width: 1200px) {
        width: 390px;
        height: 400px;
        margin-left: 60px;
      }
      @media only screen and (max-width: 991px) {
        width: 100%;
        max-width: 400px;
        height: auto;
        margin: 50px auto 0;
        justify-content: space-evenly;
      }

      > button {
        border: 0;
        padding: 0;
        cursor: pointer;
        position: relative;
        background: transparent;

        &:nth-child(2) {
          position: absolute;
          right: 0;
          @media only screen and (max-width: 991px) {
            position: relative;
          }
        }
        &:nth-child(3) {
          position: absolute;
          bottom: 0;
          @media only screen and (max-width: 991px) {
            position: relative;
          }
        }
        &:nth-child(4) {
          position: absolute;
          left: 0;
          @media only screen and (max-width: 991px) {
            position: relative;
          }
        }
        &:nth-child(5) {
          position: absolute;
          top: 0;
          @media only screen and (max-width: 991px) {
            position: relative;
          }
        }

        img {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          overflow: hidden;
          transition: all 0.27s ease;
          @media only screen and (max-width: 991px) {
            width: 50px;
            height: 50px;
          }
          @media only screen and (max-width: 767px) {
            width: 40px;
            height: 40px;
          }
        }

        &.glide__bullet--active {
          background-color: transparent;

          img {
            width: 105px;
            height: 105px;
            box-shadow: 0 6px 30px -3px rgba(0, 0, 0, 0.3);
            @media only screen and (max-width: 1200px) {
              width: 95px;
              height: 95px;
            }
            @media only screen and (max-width: 991px) {
              width: 60px;
              height: 60px;
            }
            @media only screen and (max-width: 767px) {
              width: 50px;
              height: 50px;
              box-shadow: none;
            }
          }

          &::before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 1px solid ${themeGet('colors.border', '#dadada')};
            position: absolute;
            top: 0;
            left: 0;
            transform: scale(1.25);
          }
        }

        &:focus {
          outline: 0;
        }
      }
    }
  }
`;

export default SectionWrapper;
