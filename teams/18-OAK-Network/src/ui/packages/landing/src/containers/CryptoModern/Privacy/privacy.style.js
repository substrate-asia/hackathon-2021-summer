import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.div`
  padding: 75px 0;
  overflow: hidden;
  @media (max-width: 1440px) {
    padding: 0;
  }
  @media only screen and (max-width: 480px) {
    padding: 30px 0;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .image {
    width: 50%;
    padding-left: 50px;
    @media only screen and (max-width: 1440px) {
      padding-left: 0px;
    }
    @media only screen and (max-width: 991px) {
      width: 50%;
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
      margin-bottom: 40px;
      padding-left: 100px;
    }
    img {
      width: 100%;
      object-fit: cover;
      @media only screen and (max-width: 1440px) {
        width: 80%;
      }
    }
  }
  .content {
    width: 50%;
    @media only screen and (max-width: 991px) {
      width: 50%;
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
      margin-bottom: 50px;
    }
    h2 {
      color: ${themeGet('colors.white', 'fff')};
      font-size: 48px;
      line-height: 1.2;
      font-weight: 300;
      letter-spacing: -0.025em;
      margin-bottom: 27px;
      max-width: 370px;
      @media only screen and (max-width: 1440px) {
        font-size: 38px;
      }
      @media only screen and (max-width: 768px) {
        font-size: 40px;
        max-width: 100%;
        text-align: center;
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
        text-align: center;
      }
    }
  }
`;

export default SectionWrapper;
