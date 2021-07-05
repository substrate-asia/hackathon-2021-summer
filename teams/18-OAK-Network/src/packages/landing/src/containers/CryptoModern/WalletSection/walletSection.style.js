import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.div`
  padding: 75px 0;
  overflow: hidden;
  @media only screen and (max-width: 768px) {
    padding: 75px 0 0;
  }
  @media only screen and (max-width: 480px) {
    padding: 30px 0 25px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .image {
    width: 50%;
    @media only screen and (max-width: 991px) {
      width: 50%;
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
      display: none;
    }
    @media only screen and (max-width: 480px) {
    }
    img {
      width: 100%;
      height: 900px;
      object-fit: contain;
    }
  }
  .content {
    width: 50%;
    padding-left: 100px;

    @media only screen and (max-width: 991px) {
      width: 50%;
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
      margin-bottom: 50px;
      padding-left: 0px;
    }
    @media only screen and (max-width: 480px) {
      margin-bottom: 0px;
    }
    h2 {
      color: ${themeGet('colors.white', 'fff')};
      font-size: 48px;
      line-height: 1.2;
      font-weight: 300;
      letter-spacing: -0.025em;
      margin-bottom: 27px;
      @media only screen and (max-width: 1440px) {
        margin-bottom: 15px;
        font-size: 38px;
      }
      @media only screen and (max-width: 768px) {
        font-size: 40px;
        max-width: 100%;
        text-align: left;
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
        text-align: left;
      }
    }
    .walletfeatures {
      margin-top: 40px;
      img {
        height: 24px;
      }
      p {
        font-size: 16px;
        line-height: 28px;
        color: ${themeGet('colors.white', 'fff')};
        padding-left: 24px;
        max-width: 100%;
        margin-bottom: 30px;
        margin-top: -1px;
      }
    }
    .btnGroups {
      margin-top: 30px;
      margin-bottom: 20px;
      .reusecore__button {
        font-weight: 500;
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.302);
        margin-right: 17px;
        padding-left: 30px;
        padding-right: 30px;
        font-size: 14px;
        text-transform: uppercase;
        @media only screen and (max-width: 480px) {
          width: 100%;
          &:nth-child(1) {
            margin-bottom: 15px;
          }
        }
        .btn-icon {
          margin-right: 10px;
          margin-top: -2px;
          img {
            height: 18px;
          }
        }
      }
    }
    .windowsAllert {
      font-size: 14px;
    }
  }
`;

export default SectionWrapper;
