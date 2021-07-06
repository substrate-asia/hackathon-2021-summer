import styled, { keyframes } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import error from 'common/assets/image/error.svg';
import success from 'common/assets/image/success.svg';

const shake = keyframes`
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  50% {
    transform: translateX(7px);
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const BannerWrapper = styled.div`
  padding-top: 30px;
  margin-bottom: 81px;
  background-color: ${themeGet('colors.banner', '#171717')};
  @media only screen and (max-width: 1440px) {
    margin-bottom: 60px;
  }
  @media only screen and (max-width: 767px) {
    padding: 135px 0 82px;
    margin-bottom: 42px;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1580px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1600px) {
    padding: 0 81px;
  }
  @media only screen and (max-width: 1360px) {
    padding: 0 60px;
  }
  @media only screen and (max-width: 991px) {
    padding: 0 30px;
  }
  @media only screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const ContentArea = styled.div`
  width: 595px;
  padding-right: 88px;
  @media only screen and (max-width: 1600px) {
    width: 560px;
  }
  @media only screen and (max-width: 1360px) {
    width: 40%;
  }
  @media only screen and (max-width: 1200px) {
    width: 45%;
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    padding-right: 50px;
  }
  @media only screen and (max-width: 480px) {
    padding-right: 0;
  }

  h1,
  p {
    color: ${themeGet('colors.label', '#C6C6C6')};
  }

  h1 {
    margin-bottom: 30px;
    + p {
      margin: 0;
    }
  }
`;

export const HighlightedText = styled.p`
  display: flex;
  align-items: center;
  max-width: 334px;
  width: 100%;
  min-height: 28px;
  border-radius: 80px;
  padding: 3px 28px 3px 4px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${themeGet('colors.label', '#C6C6C6')};
  background-color: ${themeGet('colors.darkBg', '#0D0D0D')};
  margin: 0 0 40px;
  @media only screen and (max-width: 767px) {
    margin: 0 0 30px;
    padding: 3px 4px;
  }

  strong {
    display: inline-flex;
    align-items: center;
    min-width: 51px;
    min-height: 20px;
    padding: 3px 11px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0;
    color: ${themeGet('colors.heading', '#191919')};
    background-color: ${themeGet('colors.primary', '#FDEF00')};
    margin-right: 10px;
  }
`;

export const FormWrapper = styled.form`
  margin-top: 45px;
  @media only screen and (max-width: 767px) {
    margin-top: 40px;
  }

  .input_element {
    display: flex;
    align-items: center;
    position: relative;

    input {
      width: 100%;
      border: 0;
      font-size: 16px;
      padding: 20px 25px 20px 65px;
      border-radius: 5px;
      color: ${themeGet('colors.label', '#C6C6C6')};
      background-color: ${themeGet('colors.black', '#000000')};

      &::placeholder {
        color: ${themeGet('colors.lightText', '#7E7E7E')};
      }
    }

    .input-icon {
      position: absolute;
      left: 22px;

      i {
        color: ${themeGet('colors.lightText', '#7E7E7E')};
        svg {
          width: auto;
          height: 24px;
        }
      }
    }

    &::after {
      content: '';
      width: 16px;
      height: 16px;
      position: absolute;
      top: calc(50% - 16px / 2);
      right: 25px;
    }

    &.invalid {
      &::after {
        background-image: url(${error});
      }
    }
    &.valid {
      &::after {
        background-image: url(${success});
      }
    }
  }
`;

export const ButtonGroup = styled.div`
  margin-top: 50px;
  @media only screen and (max-width: 767px) {
    margin-top: 25px;
    margin-bottom: 54px;
  }

  .reusecore__button {
    font-size: 14px;
    font-weight: 500;
    border-radius: 5px;
    &:first-child {
      margin-right: 20px;
      &:hover {
        opacity: 0.95;
      }
    }

    &:hover {
      .btn-icon {
        animation: ${shake} 1s infinite;
      }
    }
  }
`;

export const CarouselArea = styled.div`
  width: calc(100% - 595px);
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1600px) {
    width: calc(100% - 560px);
  }
  @media only screen and (max-width: 1360px) {
    width: 60%;
  }
  @media only screen and (max-width: 1200px) {
    width: 55%;
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
  }

  #interior_carousel {
    .glide__slide {
      .item_wrapper {
        display: block;
        height: 100vh;
        max-height: 540px;
        border-radius: 20px;
        overflow: hidden;
        position: relative;
        @media only screen and (max-width: 1440px) {
          max-height: 460px;
        }
        @media only screen and (max-width: 1200px) {
          max-height: 420px;
        }
        @media only screen and (max-width: 991px) {
          max-height: 400px;
        }
        @media only screen and (max-width: 767px) {
          max-height: 380px;
        }

        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 30%;
          background: linear-gradient(
            rgba(255, 255, 255, 0),
            rgba(0, 0, 0, 0.8)
          );
          position: absolute;
          bottom: 0;
          left: 0;
          transition: height 0.3s ease;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        h4 {
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          margin: 0;
          padding: 25px 30px;
          color: ${themeGet('colors.label', '#C6C6C6')};
          font-weight: 600;
          z-index: 1;
          transition: bottom 0.3s ease;

          @media only screen and (max-width: 1440px) {
            font-size: 20px;
          }
        }
      }

      &:hover {
        .item_wrapper {
          &::after {
            height: 70%;
          }

          img {
            transform: scale(1.1);
          }

          h4 {
            color: ${themeGet('colors.white', '#ffffff')};
            bottom: 10px;
          }
        }
      }
    }

    .glide__controls {
      > div {
        > span {
          &.next_arrow {
            width: 45px;
            background-color: ${themeGet('colors.primary', '#FDEF00')};
            @media only screen and (max-width: 667px) {
              width: 30px;
            }

            &::before {
              background-color: ${themeGet('colors.primary', '#FDEF00')};
              transform: rotate(42deg);
            }

            &::after {
              background-color: ${themeGet('colors.primary', '#FDEF00')};
              transform: rotate(-42deg);
            }
          }
        }
      }
    }
  }
`;

export default BannerWrapper;
