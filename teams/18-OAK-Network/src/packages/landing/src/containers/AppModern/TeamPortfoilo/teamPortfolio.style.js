import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.div`
  padding: 175px 0 175px;
  overflow: hidden;
  @media only screen and (max-width: 1440px) {
    padding: 175px 0 125px;
  }
  @media only screen and (max-width: 1099px) {
    padding: 125px 0 125px;
  }
  @media only screen and (max-width: 768px) {
    padding: 75px 0;
  }
  @media only screen and (max-width: 480px) {
    padding: 75px 0 50px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media only screen and (max-width: 1099px) {
    flex-direction: column;
    justify-content: center;
  }
  .image {
    width: calc(100% - 493px);
    display: flex;
    flex-wrap: wrap;
    position: relative;
    padding-bottom: 100px;
    margin-right: 100px;
    @media only screen and (max-width: 1099px) {
      width: 100%;
      justify-content: space-around;
      margin-right: 0;
      padding-bottom: 70px;
      left: 10%;
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
      margin-bottom: 20px;
      left: 8%;
    }
    @media only screen and (max-width: 480px) {
      left: 0%;
      padding-bottom: 20px;
    }

    .item_wrapper {
      position: absolute;

      cursor: pointer;
      @media only screen and (max-width: 1099px) {
        position: relative;
        width: 33%;
        height: 200px;
      }
      @media only screen and (max-width: 480px) {
        width: 40%;
      }
      img {
        &:hover {
          box-shadow: 0px 20px 57px 0px rgba(57, 81, 111, 0.28);
          @media only screen and (max-width: 1099px) {
            box-shadow: none;
          }
        }
      }
      &:nth-child(1) {
        top: -80px;
        right: 0px;
        @media only screen and (max-width: 1099px) {
          top: auto;
          right: auto;
        }
      }
      &:nth-child(2) {
        top: 120px;
        right: 150px;
        @media only screen and (max-width: 1099px) {
          top: auto;
          right: auto;
        }
      }
      &:nth-child(3) {
        left: 190px;
        top: 140px;
        @media only screen and (max-width: 1099px) {
          top: auto;
          left: auto;
        }
      }
      &:nth-child(4) {
        right: 205px;
        top: -35px;
        @media only screen and (max-width: 1099px) {
          top: auto;
          right: auto;
        }
      }
      &:nth-child(5) {
        top: -170px;
        right: 180px;
        @media only screen and (max-width: 1099px) {
          top: auto;
          right: auto;
        }
      }
      &:nth-child(6) {
        left: 110px;
        top: -3px;
        @media only screen and (max-width: 1099px) {
          top: auto;
          left: auto;
        }
      }
      &:nth-child(7) {
        top: -180px;
        left: 155px;
        @media only screen and (max-width: 1099px) {
          top: auto;
          left: auto;
        }
      }
      .author_name {
        position: absolute;
        padding: 20px;
        top: -59px;
        left: 34px;
        background-color: rgb(209, 57, 124);
        box-shadow: 0px 16px 57px 0px rgba(57, 81, 111, 0.1);
        border-radius: 28px 28px 28px 0;
        width: 122%;
        text-align: center;
        opacity: 0;
        transition: all 0.35s ease;
        font-size: 16px;
        color: #fff;
        letter-spacing: -0.25px;
        font-weight: 500;
        @media only screen and (max-width: 1099px) {
          width: auto;
        }
        @media only screen and (max-width: 768px) {
          padding: 15px 30px;
        }

        &::before {
          content: '';
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 22px 19px 0 0;
          border-color: rgb(209, 57, 124) transparent transparent transparent;
          position: absolute;
          bottom: -22px;
          left: 0;
          @media only screen and (max-width: 1099px) {
            bottom: -18px;
          }
        }
      }
      .imageWrapper {
        border-radius: 50%;
        overflow: hidden;
        @media only screen and (max-width: 1099px) {
          border-radius: 0;
        }
      }
      &.active {
        z-index: 1;
        .author_name {
          opacity: 1;
        }
        .imageWrapper {
          box-shadow: 0px 20px 57px 0px rgba(57, 81, 111, 0.18);
          @media only screen and (max-width: 1099px) {
            box-shadow: none;
          }
        }
      }
      &:hover {
      }
    }
  }
  .content {
    width: 393px;
    @media only screen and (max-width: 1099px) {
      width: 100%;
    }
    @media only screen and (max-width: 991px) {
      width: 100%;
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
      margin-top: -60px;
    }
    h2 {
      color: ${themeGet('colors.headingColor', '#0F2137')};
      font-size: 36px;
      line-height: 44px;
      font-weight: 700;
      letter-spacing: -1px;
      padding-right: 42px;
      margin-bottom: 27px;
      @media only screen and (max-width: 1366px) {
        font-size: 30px;
        line-height: 42px;
        margin-bottom: 20px;
      }
      @media only screen and (max-width: 991px) {
        font-size: 26px;
        line-height: 38px;
      }
    }
    p {
      font-size: 16px;
      line-height: 28px;
      color: #6e7379;
      margin-bottom: 36px;
      @media only screen and (max-width: 1366px) {
        margin-bottom: 30px;
      }
    }
  }
  .reusecore__button {
    border-radius: 5px;

    &:hover {
      box-shadow: #d1397c 0px 12px 24px -10px;
    }
  }
`;

export default SectionWrapper;
