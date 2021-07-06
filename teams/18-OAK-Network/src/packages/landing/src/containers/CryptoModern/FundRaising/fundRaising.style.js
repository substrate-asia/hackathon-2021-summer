import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.div`
  padding: 75px 0;
  position: relative;
  @media only screen and (max-width: 667px) {
    padding: 30px 0 0;
  }
  .gradientDiv {
    position: absolute;
    width: 700px;
    height: 700px;
    opacity: 0.16;
    right: -15%;
    bottom: -40%;
    border-radius: 50%;
    background: radial-gradient(
      circle closest-side,
      rgb(109, 140, 243),
      rgb(3, 16, 59)
    );
    @media only screen and (max-width: 1600px) {
      display: none;
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .image {
    width: 50%;
    padding: 70px;
    padding-right: 100px;
    @media only screen and (max-width: 991px) {
      width: 50%;
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
      padding: 100px;
      margin-bottom: 0;
      padding-top: 0;
    }
    @media only screen and (max-width: 480px) {
      padding: 25px;
      margin-bottom: 30px;
    }
    img {
      width: 100%;
      object-fit: cover;
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
      @media only screen and (max-width: 1440px) {
        font-size: 38px;
        margin-bottom: 15px;
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
    img {
      margin-top: 50px;
      object-fit: cover;
      width: 100%;
      @media only screen and (max-width: 1440px) {
        margin-top: 30px;
      }
      @media only screen and (max-width: 1099px) {
        margin-top: 50px;
      }
    }
  }
`;

export default SectionWrapper;
