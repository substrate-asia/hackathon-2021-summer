import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.div`
  padding: 100px 0 120px;
  overflow: hidden;
  @media only screen and (max-width: 1440px) {
    padding: 100px 0 30px;
  }
  @media only screen and (max-width: 1024px) {
    padding: 20px 0 0;
  }
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
  @media only screen and (max-width: 480px) {
    padding: 0px 0 25px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1024px) {
    flex-wrap: wrap;
    margin-top: 30px;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 0px;
  }
  .image {
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
    img {
      min-width: 620px;
      object-fit: contain;
      width: 100%;

      @media only screen and (min-width: 1024px) and (max-width: 1366px) {
      }
      @media only screen and (max-width: 1024px) {
        min-width: 360px;
      }
    }
  }
  .content {
    padding-left: 10px;
    min-height: 670px;
    width: calc(100% - 620px);
    @media only screen and (max-width: 1024px) {
      width: 100%;
      min-height: auto;
      margin-bottom: 70px;
    }
    @media only screen and (max-width: 768px) {
      margin-bottom: 50px;
      padding-left: 0px;
    }
    @media only screen and (max-width: 480px) {
      margin-bottom: 0px;
      margin-top: 30px;
    }
    h2 {
      font-size: 36px;
      line-height: 1.52;
      font-weight: 700;
      letter-spacing: -1px;
      max-width: 440px;
      @media only screen and (max-width: 1440px) {
        margin-bottom: 15px;
        font-size: 30px;
      }
      @media only screen and (min-width: 768px) and (max-width: 1024px) {
        margin-bottom: 15px;
        font-size: 24px;
        max-width: 100%;
        text-align: center;
      }
      @media only screen and (max-width: 768px) {
        max-width: 100%;
        text-align: left;
        text-align: center;
      }
      @media only screen and (max-width: 480px) {
        font-size: 24px;
      }
    }
    p {
      font-size: 15px;
      line-height: 32px;
      max-width: 480px;
      @media only screen and (min-width: 768px) and (max-width: 1024px) {
        max-width: 100%;
        text-align: center;
      }
      @media only screen and (max-width: 768px) {
        margin: 0 auto;
        max-width: 100%;
        text-align: center;
        line-height: 32px;
        max-width: 550px;
        font-size: 15px;
      }
      @media only screen and (max-width: 480px) {
        text-align: left;
      }
    }
    .accordion__item {
      background-color: #f6f8fb;
      border: 0;
      padding: 30px 45px;
      border-radius: 10px;
      margin-top: 30px;
      @media only screen and (max-width: 1440px) {
        padding: 25px 35px;
      }
      @media only screen and (max-width: 480px) {
        padding: 25px 25px;
      }
      &.is__open {
        background-color: #fff;
        box-shadow: 0px 9px 30px rgba(69, 88, 157, 0.08);
      }

      h4 {
        font-family: DM Sans;
        font-size: 18px;
        line-height: 30px;
        margin-bottom: 0;
        font-weight: 400;
        @media only screen and (min-width: 768px) and (max-width: 1024px) {
          font-size: 16px;
          line-height: 24px;
        }
      }
      p {
        margin: 16px 0 0 0;
        font-size: 15px;
        line-height: 2.1;
        @media only screen and (min-width: 768px) and (max-width: 1024px) {
          font-size: 14px;
          margin: 12px 0 4px 0;
          text-align: left;
        }
        @media only screen (max-width: 480px) {
          text-align: left !important;
        }
      }
    }
  }
`;

export default SectionWrapper;
