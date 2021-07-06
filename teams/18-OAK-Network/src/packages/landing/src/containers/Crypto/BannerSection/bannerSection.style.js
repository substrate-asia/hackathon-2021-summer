import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import BannerBG from 'common/assets/image/crypto/main_bg.svg';

const BannerWrapper = styled.section`
  padding-top: 210px;
  padding-bottom: 400px;
  background-image: url(${BannerBG});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1440px) {
    padding-bottom: 305px;
  }
  @media (max-width: 990px) {
    padding-top: 150px;
    padding-bottom: 210px;
  }
  @media (max-width: 768px) {
    background-image: none;
    background-color: #6d4efe;
  }

  @media only screen and (max-width: 480px) {
    padding-top: 130px;
    padding-bottom: 110px;
  }
  .particle {
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    @media (max-width: 990px) {
      display: none;
    }
    @media only screen and (max-width: 480px) {
      width: 100%;
    }
  }
  .row {
    position: relative;
    z-index: 1;
  }
  .button__wrapper {
    margin-top: 40px;
    .reusecore__button {
      border-radius: 6px;
      &:first-child {
        transition: all 0.3s ease;
        margin-right: 30px;
        @media (max-width: 990px) {
          margin-right: 0;
        }
        &:hover {
          box-shadow: 0px 9px 20px -5px rgba(16, 172, 132, 0.57);
        }
      }
      &:nth-child(2) {
        padding-left: 0;
        @media (max-width: 1100px) {
          padding-left: 15px;
        }

        @media (max-width: 480px) {
          padding-left: 0;
          padding-top: 15px;
        }
        margin-top: 15px;
        .btn-text {
          font-weight: 700;
          margin-top: 7px;
        }
        .btn-icon {
          margin-top: 6px;
          margin-left: 6px;
        }
      }
      > a {
        font-weight: 700;
        color: #fff;
      }
    }
    .btnWithoutColor {
      margin-right: 15px !important;
      padding: 5px 0px !important;
      .btn-icon {
        svg {
          width: 30px;
          height: 30px;
        }
      }
      .btn-text {
        padding-left: 15px;
        font-size: 15px;
        font-weight: 500 !important;
        font-family: 'Poppins', sans-serif;
      }
      &:hover {
        box-shadow: none !important;
      }
    }
  }
`;
export const BgImageWrapper = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 0;
  img {
    width: 100%;
    height: auto;
    display: block;
    margin: -2px -1px;
    @media (max-width: 480px) {
      margin: -2px -1px;
    }
  }
`;
export default BannerWrapper;
